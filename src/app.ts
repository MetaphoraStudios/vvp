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

    let camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 6, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    let light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    let ground: Mesh = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    let sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
    sphere.position.y = 0.5;

    return scene;
  }

  private registerInspectorHandler(scene: Scene) {
    window.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "I") {
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