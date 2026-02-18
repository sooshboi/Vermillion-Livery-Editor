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
loader.load('./models/camaro.glb',
'https://raw.githubusercontent.com/sooshboi/vermillion-livery-editor/main/CAMAROMODEL/CAMAROUnibody.glb',  
    (gltf) => {
    console.log('Model loaded');
    carModel = gltf.scene;
    scene.add(carModel);
  },
  undefined,
  (error) => console.error('Load error', error)
);

function animate() {
 requestAnimationFrame(animate);
 controls.update();
 renderer.render(scene, camera);
}
animate();
