<script type="module">
    import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.172.0/build/three.module.js';
    import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.172.0/examples/jsm/loaders/GLTFLoader.js';
    import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.172.0/examples/jsm/controls/OrbitControls.js';

    // Theme switcher (kept simple)
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'vermillion';
    body.setAttribute('data-theme', savedTheme);
    themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === savedTheme);
    });
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
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

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let selectedPanel = null;
    let carModel = null;

    const loader = new GLTFLoader();

    // Show loader overlay when starting load
    const loaderOverlay = document.getElementById('loader-overlay');
    loaderOverlay.classList.add('active');

  loader.load('./CAMAROMODEL/CAMAROUnibody.glb', (gltf) => {
  carModel = gltf.scene;
  scene.add(carModel);

  const box = new THREE.Box3().setFromObject(carModel);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  carModel.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z);
  camera.position.set(0, maxDim * 0.8, maxDim * 2.2);
  controls.target.set(0, 0, 0);
  controls.update();

  loaderOverlay.classList.remove('active');
});
  undefined,
  (error) => console.error('Load error:', error)
);
      (xhr) => {
        const percent = Math.round((xhr.loaded / xhr.total) * 100);
        document.getElementById('load-progress').textContent = percent + '%';
      },
      (error) => {
        console.error('Load error:', error);
        document.getElementById('load-progress').textContent = 'Failed to load model';
        document.getElementById('load-error').textContent = 'Check console for details. Try refreshing or check file path.';
        document.getElementById('load-error').style.display = 'block';
        setTimeout(() => {
          loaderOverlay.classList.remove('active');
        }, 5000); // Hide after showing error
      }
    );

    // Rest of your code (raycaster, color change, animate, resize, tabs) goes here...
    // (paste your existing Three.js logic below this point)

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
