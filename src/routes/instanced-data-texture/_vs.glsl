varying vec2 vUv;
varying vec3 vNormal;

uniform highp usampler2D uData;
uniform float uGridSize;
uniform float uAtlasSize;

void main() {
  vec4 modelPosition = instanceMatrix * vec4(position, 1.0f);
  vNormal = normalize(normalMatrix * normal);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  float id = float(gl_InstanceID);
  float x = mod(id, uGridSize) / uGridSize;
  float y = floor(id / uGridSize) / uGridSize;

  float atlasId = float(texture(uData, vec2(x, y)).r);

  vec2 baseUv = uv / uAtlasSize;
  float atlasX = mod(atlasId, uAtlasSize) / uAtlasSize;
  float atlasY = floor(atlasId / uAtlasSize) / uAtlasSize;

  vUv = baseUv + vec2(atlasX, atlasY);
}