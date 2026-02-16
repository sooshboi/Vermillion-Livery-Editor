  const loader = new THREE.GLTFLoader();
  loader.load(‘C7VETTEMODEL/c7unibody.gltf’, (gltf) => {
    model = gltf.scene;
    scene.add(model);
  });
