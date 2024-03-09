import type { Material } from "three";

//@ts-ignore
import { createDerivedMaterial } from "troika-three-utils";

/** replace base UVs with the altered spritesheet UV.
 * Should allow for supporting of most THREE base materials
 * TODO needs improvements
 */
const replaceUVs = (text: string, replacement: string) => {
  const lines = text.split("\n");
  const matUVs = /vMapUv|vAlphaMapUv|vNormalMapUv/g;

  const modifiedLines = lines.map((line) => {
    if (!line.includes("varying") && !line.includes("uniform")) {
      return line.replace(matUVs, replacement);
    }
    return line;
  });

  return modifiedLines.join("\n");
};

export const makeAtlasMaterial = (baseMaterial: Material): Material => {
  const customMaterial = createDerivedMaterial(baseMaterial, {
    defines: {
      USE_UV: "",
    },
    uniforms: {
      atlasSize: { value: 8 },
      pickedX: { value: 0 },
      pickedY: { value: 0 },
    },

    /**
     *
     * FRAGMENT REWRITER
     *
     * */
    customRewriter: ({ vertexShader, fragmentShader }: any) => {
      // uniforms etc
      const header = /*glsl*/ `
			uniform float atlasSize;
      uniform float pickedX;
      uniform float pickedY;
			`;

      // calculate sprite UV
      const newUvs = /*glsl*/ `
			

			vec2 fSize = vec2(1./8.);
			vec2 fOffset = vec2(pickedX, pickedY)*fSize;
      
			vec2 speedrunUv = fSize  * vUv + fOffset;      

			`;
      fragmentShader = fragmentShader.replace(
        `void main() {`,
        `void main() {${newUvs}`
      );

      fragmentShader = `
			${header}			
			${fragmentShader}
			`;

      fragmentShader = replaceUVs(fragmentShader, "speedrunUv");

      return { vertexShader, fragmentShader };
    },
  });
  return customMaterial;
};
