import Personaje from "./Personaje.js";
import inventario from "./Inventario.js";
import { Interfaz } from "./Interfaz.js";
import Enemigo from "./Enemigo.js";

const Phaser = window.Phaser;

export default class Level3 extends Phaser.Scene {
  constructor() {
    super("Level3");
  }

  init() {
    this.score = this.registry.get('score') || 0;
  }

  preload() {
    this.load.tilemapTiledJSON("map3", "public/assets/tilemap/map3.json");
    this.load.image("tileset", "public/assets/Texturetile.png");
    this.load.image("star", "public/assets/star.png");
    this.load.image("door", "public/assets/door.png");
    this.load.image("ruby", "public/assets/ruby.png");
    this.load.image("gold", "public/assets/gold.png");
    this.load.image("dude", "./public/assets/Personaje.png", {
    });
    this.load.image("enemy", "./public/assets/Enemigo.png", {
    });
  }

  create() {
    const map = this.make.tilemap({ key: "map3" });

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    const tileset = map.addTilesetImage("Texturetile", "tileset");

    const belowLayer = map.createLayer("Fondo", tileset, 0, 0);
    const platformLayer = map.createLayer("Plataformas", tileset, 0, 0);
    const objectsLayer = map.getObjectLayer("Objetos");

    // Find in the Object Layer, the name "dude" and get position
    const spawnPoint = map.findObject(
      "Objetos",
      (obj) => obj.name === "player"
    );
    console.log("spawnPoint", spawnPoint);
  
    this.player = new Personaje(this, spawnPoint.x, spawnPoint.y, "dude");
    this.player.setScale(1, 1);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.inventario = new inventario();

    Interfaz(this);

    platformLayer.setCollisionByExclusion([-1]);
    platformLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, platformLayer);

    this.ruby = this.physics.add.group();
    this.door = this.physics.add.group();
    this.gold = this.physics.add.group();
    this.stars = this.physics.add.group();
    this.enemigosGroup = this.physics.add.group();

    this.cameras.main.startFollow(this.player);

    objectsLayer.objects.forEach((objData) => {
      console.log(objData);
      const { x = 0, y = 0, name, type } = objData;
      switch (type) {
        case "star": {
          // add star to scene
          // console.log("estrella agregada: ", x, y);
          const star = this.stars.create(x, y, "star");
          break;
        }

        case "gold": {
          const gold = this.gold.create(x, y, "gold");
          break;
        }

        case "ruby" : {

          const ruby = this.ruby.create(x, y, "ruby");
          break;

        }

        case "enemy" : {

          const enemigonuevo = new Enemigo(this, x, y, "enemy");

          this.enemigosGroup.add(enemigonuevo);
          break;
        }


        case "door": {
          const door = this.door.create(x, y, "door");
          break;
        }
      }
    });

    // add collision between player and stars
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );

    // No entiendo por qué no puedo poner esto junto al otro collider pero ok

    this.physics.add.overlap(
      this.player,
      this.ruby,
      this.collectruby,
      null,
      this
    );


    this.physics.add.overlap(
      this.player,
      this.gold,
      this.collectgold,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.door,
      this.enterdoor,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.enemigosGroup,
      this.enemycollide,
      null,
      this
    );

  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      console.log("Phaser.Input.Keyboard.JustDown(this.keyR)");
      this.scene.restart();
    }
  }

  enterdoor(player, door) {
    if (this.inventario.items.length >= 5) {
      door.disableBody(true, true); 
      this.scene.start("End");
    }
  }

  collectgold(player, gold) {
    gold.disableBody(true, true);
    this.inventario.items.push("gold");
    console.log(this.inventario.items);
    this.score += 20;
    this.Interfaz.setText(`Objetos: ${this.inventario.items.length}`);
    this.Puntos.setText(`Puntos: ${this.score}`);
  }


  collectruby(player, ruby) {
    ruby.disableBody(true, true);
    this.inventario.items.push("ruby");
    console.log(this.inventario.items);
    this.Interfaz.setText(`Objetos: ${this.inventario.items.length}`);
    this.score += 30;
    this.Puntos.setText(`Puntos: ${this.score}`);
  }


  collectStar(player, star) {
    star.disableBody(true, true);
    this.inventario.items.push("star");
    console.log(this.inventario.items);
    this.Interfaz.setText(`Objetos: ${this.inventario.items.length}`);
    this.score += 10;
    this.Puntos.setText(`Puntos: ${this.score}`);

    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });
    }
  }
  enemycollide(player, enemigo) {
    this.player.vida -= 1;
    enemigo.disableBody(true, true);
  }

}
