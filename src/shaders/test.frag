varying vec2 vUv;
varying float vElevation;
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;

void main() {
  // Blend colors using uv.y and the wave elevation
  vec3 finalColor = mix(uColor1, uColor2, vUv.y + vElevation * 2.0);
  
  // Create a moving wave pattern overlay
  float wave = sin(vUv.x * 8.0 + uTime * 1.5) * 0.15 + 0.85;
  finalColor *= wave;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
