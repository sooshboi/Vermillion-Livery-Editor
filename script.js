// === Load GLB car model ===
const loader = new GLTFLoader();
loader.load(
    'C7VETTEMODEL/c7unibody.glb', // your specific GLB file
    (gltf) => {
        const car = gltf.scene;
        car.scale.set(1, 1, 1);
        scene.add(car);

        // Example: set car body color
        car.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(0xff0000);
            }
        });
    },
    undefined,
    (error) => {
        console.error('Error loading GLB:', error);
    }
);

    // Import three.js and GLTFLoader as ES modules
import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';

// === Basic Scene Setup ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === Lights ===
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// === Orbit Controls (rotate/pan) ===
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

// === Load GLB Car Model ===
const loader = new GLTFLoader();
loader.load(
    'models/car.glb',  // Replace with your GLB path
    (gltf) => {
        const car = gltf.scene;
        car.scale.set(1, 1, 1);   // Adjust scale if needed
        scene.add(car);
    },
    undefined,
    (error) => {
        console.error('Error loading GLB model:', error);
    }
);

// === Handle Window Resize ===
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// === Animation Loop ===
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
