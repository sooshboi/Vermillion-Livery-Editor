const loader = new GLTFLoader();

loader.load('./C7VETTEMODEL/c7unibody.glb', (gltf) => {
  car = gltf.scene;
  scene.add(car);
});
