import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';
const loader = new GLTFLoader();

loader.load('./C7VETTEMODEL/c7unibody.glb', (gltf) => {
  car = gltf.scene;
  scene.add(car);
});
