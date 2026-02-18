const canvas = document.getElementById("three-canvas");
const engine = new BABYLON.Engine(canvas, true);

const scene = new BABYLON.Scene(engine);

const camera = new BABYLON.ArcRotateCamera(
  "camera",
  Math.PI / 2,
  Math.PI / 2.5,
  6,
  BABYLON.Vector3.Zero(),
  scene
);
camera.attachControl(canvas, true);

new BABYLON.HemisphericLight(
  "light",
  new BABYLON.Vector3(1, 1, 0),
  scene
);

// TEST OBJECT
BABYLON.SceneLoader.ImportMesh(
  "",
  "./assets/models/",
  "CAMAROUnibody.glb",
  scene,
  function (meshes) {
    console.log("Car loaded", meshes);

    // Find first visible mesh
    const car = meshes.find(m => m.getTotalVertices && m.getTotalVertices() > 0);

    if (car) {
      car.scaling = new BABYLON.Vector3(1, 1, 1);
      camera.setTarget(car);
      console.log(" Visible mesh found:", car.name);
    } else {
      console.warn(" No visible mesh found");
    }
  },
  null,
  function (scene, message) {
    console.error("Load error:", message);
  }
);
