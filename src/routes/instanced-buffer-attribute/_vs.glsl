varying vec2 vUv;
varying vec3 vNormal;

attribute uint atlasId;
uniform float uAtlasSize;

void main() {
  vec4 modelPosition = instanceMatrix * vec4(position, 1.0f);
  vNormal = normalize(normalMatrix * normal);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  vec2 baseUv = uv / uAtlasSize;
  float atlasX = mod(float(atlasId), uAtlasSize) / uAtlasSize;
  float atlasY = floor(float(atlasId) / uAtlasSize) / uAtlasSize;

  vUv = baseUv + vec2(atlasX, atlasY);
}