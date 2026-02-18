const canvas = document.getElementById("three-canvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.05, 0.05, 0.05);

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 2.5,
    8,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );
  light.intensity = 1.2;

  BABYLON.SceneLoader.ImportMesh(
    "",
    "./CAMAROMODEL/",          // folder
    "CAMAROUnibody.glb",       // file
    scene,
    function (meshes) {
      console.log(" Car loaded", meshes);

      const carModel = meshes[0];

      // Adjust scale if needed
      carModel.scaling = new BABYLON.Vector3(1, 1, 1);

      // Center camera on car
      camera.setTarget(carModel);
    },
    null,
    function (scene, message) {
      console.error(" Load error:", message);
    }
  );

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});
