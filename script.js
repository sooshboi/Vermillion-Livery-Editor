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
BABYLON.MeshBuilder.CreateBox("box", {}, scene);

engine.runRenderLoop(() => {
  scene.render();
});
