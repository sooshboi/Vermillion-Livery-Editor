<script type="module">
  import * as THREE from 'https://unpkg.com/three@0.172.0/build/three.module.js';

  const scene = new THREE.Scene();
  console.log('Three loaded', THREE);
</script>
 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(...);
const renderer = new THREE.WebGLRenderer(...);
scene.add(new THREE.AmbientLight(...));
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-canvas').appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.8));
   const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);
camera.position.z = 5;

   const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

   const loader = new GLTFLoader();
   let carModel = null;
loader.load(
 'https://raw.githubusercontent.com/sooshboi/vermillion-livery-editor/main/CAMAROMODEL/CAMAROUnibody.glb', // ← CHANGE THIS TO YOUR RAW URL
 (gltf) => {
 carModel = gltf.scene;
 scene.add(carModel);
 carModel.position.set(0, 0, 0);
 carModel.scale.set(1, 1, 1);
 console.log('Default car loaded!');
 },
 (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
 (error) => console.error('Error loading default car:', error)
);

function animate() {
 requestAnimationFrame(animate);
 controls.update();
 renderer.render(scene, camera);
}
animate();
