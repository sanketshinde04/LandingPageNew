precision highp float;

varying vec2 vUv;

uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec2 uImageRes;
uniform float uRadius;
uniform float uVelocity;
uniform float uIntensity;
uniform float uTime;

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

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = vUv;

  vec2 toMouse = uv - uMouse;
  toMouse.x *= aspect;
  float dist = length(toMouse);

  vec3 color = sampleCover(uv);

  float mask = (1.0 - smoothstep(uRadius * 0.96, uRadius, dist)) * uIntensity;

  if (mask > 0.001) {
    float k = clamp(dist / uRadius, 0.0, 1.0);
    float bulge = sqrt(max(1.0 - k * k, 0.0)); // hemisphere profile

    // magnification at the centre, easing back to 1:1 at the rim
    float zoom = mix(0.82, 1.0, smoothstep(0.0, 1.0, k));
    vec2 lensUv = uMouse + (uv - uMouse) * zoom;

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

  // subtle halo glow just outside the lens
  float halo =
    smoothstep(uRadius * 1.35, uRadius, dist) *
    (1.0 - smoothstep(uRadius * 0.92, uRadius, dist) * 0.0) *
    step(uRadius, dist);
  color += halo * 0.05 * uIntensity;

  gl_FragColor = vec4(color, 1.0);
}
