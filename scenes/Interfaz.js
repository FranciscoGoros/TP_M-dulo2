const phaser = window.Phaser;
import inventario from "./Inventario.js";

export function Interfaz(scene) {


    scene.Puntos = scene.add.text(16, 16, `Puntaje: ${scene.score}`, {
        fontSize: "24px",
        fontFamily: "sans-serif",
        fill: "#fffb00",
      });

    scene.Puntos.setScrollFactor(0);

    scene.Interfaz = scene.add.text(16, 50, `Objetos: ${scene.inventario.items.length}`, {
        fontSize: "24px",
        fontFamily: "sans-serif",
        fill: "#ffffff",
      });


      scene.Interfaz.setScrollFactor(0);
}
