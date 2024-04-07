precision highp float;
precision highp int;

#include <packing>
#include <common>

varying vec2 vUv;
uniform sampler2D uAtlas;

void main() {

  gl_FragColor = texture2D(uAtlas, vUv);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
