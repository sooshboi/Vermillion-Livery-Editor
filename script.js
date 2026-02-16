<!-- index.html -->
<script type="module">
  import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js';
  import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/loaders/GLTFLoader.js';

  // Now you can use it
  const loader = new GLTFLoader();
  loader.load('./C7VETTE_MODEL/c7unibody.glb', (gltf) => {
    const car = gltf.scene;
    scene.add(car);
  });
</script>
