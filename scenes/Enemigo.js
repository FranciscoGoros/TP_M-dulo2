const Phaser = window.Phaser;

export default class Enemigo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {

        super(scene, x, y, texture);
        this.setScale(1, 1);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setMaxVelocity(600, 900);
        this.setCollideWorldBounds(true);
        
    }

    update() {
    }

}