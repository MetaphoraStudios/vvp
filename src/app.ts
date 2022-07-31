import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

class App {
  constructor() {
    // create the canvas html element and attach it to the webpage
    let canvas = this.createCanvas();
    document.body.appendChild(canvas);

    // initialize babylon scene and engine
    let engine = new Engine(canvas, true);
    let scene = this.createScene(engine, canvas);

    // register event handlers
    this.registerInspectorHandler(scene);

    // run the main render loop
    engine.runRenderLoop(() => {
      scene.render();
    });
  }

  // create canvas
  private createCanvas(): HTMLCanvasElement {
    let canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    return canvas;
  }

  private createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
    let scene = new Scene(engine);

    let camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 60, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    new HemisphericLight("light", new Vector3(1, 1, 0), scene);

    this.createVoxelGrid(Vector3.Zero(), scene);

    return scene;
  }

  private createVoxelGrid(anchor: Vector3, scene: Scene) {
    let width = 10;
    let height = 10;
    let spacing = 0.5;
    let size = 1.0;
    let offset = size * 0.5;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let name = `box${x}-${y}`;
        let box = MeshBuilder.CreateBox(name, { size }, scene);
        let position = new Vector3(x * (size + spacing) - offset, y * (size + spacing) - offset, 0);
        box.position = position.add(anchor);
      }
    }
  }

  private registerInspectorHandler(scene: Scene) {
    window.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === "KeyI") {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
    });
  }
}
new App();