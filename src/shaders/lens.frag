precision highp float;

#define RIPPLE_COUNT 16

varying vec2 vUv;

uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec2 uImageRes;
uniform float uRadius;
uniform float uVelocity;
uniform float uIntensity;
uniform float uTime;
uniform vec4 uRipples[RIPPLE_COUNT]; // xy: center, z: birth time, w: strength

// object-fit: cover mapping of the image onto the canvas
vec2 coverUv(vec2 uv) {
  float canvasAspect = uResolution.x / max(uResolution.y, 1.0);
  float imageAspect = uImageRes.x / max(uImageRes.y, 1.0);
  vec2 scale = vec2(1.0);
  if (canvasAspect > imageAspect) {
    scale.y = imageAspect / canvasAspect;
  } else {
    scale.x = canvasAspect / imageAspect;
  }
  return clamp((uv - 0.5) * scale + 0.5, 0.001, 0.999);
}

vec3 sampleCover(vec2 uv) {
  return texture2D(uTexture, coverUv(uv)).rgb;
}

// expanding water rings left along the cursor's path
vec2 rippleDisplace(vec2 uv, float aspect, out float glint) {
  vec2 total = vec2(0.0);
  glint = 0.0;
  for (int i = 0; i < RIPPLE_COUNT; i++) {
    vec4 rp = uRipples[i];
    float age = uTime - rp.z;
    if (age <= 0.0 || age >= 2.4 || rp.w <= 0.001) continue;
    vec2 d = uv - rp.xy;
    d.x *= aspect;
    float dist = length(d);
    float radius = 0.02 + age * 0.16;             // ring grows outward
    float band = dist - radius;
    float wave = sin(band * 60.0) * exp(-band * band * 700.0);
    float atten = exp(-age * 2.0) * (1.0 - age / 2.4) * rp.w;
    vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
    dir.x /= aspect;
    total += dir * wave * atten * 0.014;
    glint += wave * atten;
  }
  return total;
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = vUv;

  float glint;
  vec2 rippleOffset = rippleDisplace(uv, aspect, glint) * uIntensity;

  vec2 toMouse = uv - uMouse;
  toMouse.x *= aspect;
  float dist = length(toMouse);

  vec3 color = sampleCover(uv + rippleOffset);

  float mask = (1.0 - smoothstep(uRadius * 0.96, uRadius, dist)) * uIntensity;

  if (mask > 0.001) {
    float k = clamp(dist / uRadius, 0.0, 1.0);
    float bulge = sqrt(max(1.0 - k * k, 0.0)); // hemisphere profile

    // magnification at the centre, easing back to 1:1 at the rim
    float zoom = mix(0.82, 1.0, smoothstep(0.0, 1.0, k));
    vec2 lensUv = uMouse + (uv - uMouse) * zoom + rippleOffset;

    // fluid ripple driven by cursor speed
    lensUv += (uv - uMouse) * sin(uTime * 3.0 + k * 12.0) * 0.012 * uVelocity;

    // chromatic aberration / RGB split, strongest near the rim
    float ca = (1.0 - bulge) * (0.010 + 0.014 * uVelocity);
    vec2 dir = uv - uMouse;
    vec3 refracted;
    refracted.r = sampleCover(lensUv + dir * ca).r;
    refracted.g = sampleCover(lensUv).g;
    refracted.b = sampleCover(lensUv - dir * ca).b;

    // soft droplet blur towards the edge of the glass
    float soft = (1.0 - bulge) * 0.012;
    vec3 blurAcc = refracted;
    blurAcc += sampleCover(lensUv + vec2(soft, 0.0));
    blurAcc += sampleCover(lensUv - vec2(soft, 0.0));
    blurAcc += sampleCover(lensUv + vec2(0.0, soft));
    blurAcc += sampleCover(lensUv - vec2(0.0, soft));
    refracted = mix(refracted, blurAcc / 5.0, smoothstep(0.45, 1.0, k));

    // glassy rim light and faint specular lift on the bulge
    float rim = smoothstep(0.78, 0.98, k) * (1.0 - smoothstep(0.98, 1.0, k));
    refracted += rim * 0.22;
    refracted += bulge * 0.05;

    color = mix(color, refracted, mask);
  }

  // light catching the ripple crests
  color += glint * 0.06 * uIntensity;

  // subtle halo glow just outside the lens
  float halo =
    smoothstep(uRadius * 1.35, uRadius, dist) *
    (1.0 - smoothstep(uRadius * 0.92, uRadius, dist) * 0.0) *
    step(uRadius, dist);
  color += halo * 0.05 * uIntensity;

  gl_FragColor = vec4(color, 1.0);
}
