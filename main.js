import Game from "./scenes/Game.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 480,
  scale: {
    zoom: 2,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
      render: {
      pixelArt: true,
      antialias: false, 
      roundPixels: true,
    },

  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 0},
      debug: true,
    },
  },

  scene: [Game],
};

window.game = new Phaser.Game(config);
