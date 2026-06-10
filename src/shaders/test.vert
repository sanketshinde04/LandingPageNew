varying vec2 vUv;
varying float vElevation;
uniform float uTime;
uniform float uWaveSpeed;
uniform float uWaveFrequency;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Create waves based on position and time
  float elevation = sin(modelPosition.x * uWaveFrequency + uTime * uWaveSpeed) * 
                    cos(modelPosition.z * uWaveFrequency + uTime * uWaveSpeed) * 0.15;
                    
  modelPosition.y += elevation;
  vElevation = elevation;
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
}
