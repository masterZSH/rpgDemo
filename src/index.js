import Phaser from "phaser";
import heroImg from "./assets/hero.png";
import npcImg from "./assets/npc2.png";
import gemPng from "./assets/gem.png";

import Player from './players/player';
import Npc from './players/npc';

import Map from './map/map';
import Items from './map/items';
import mapItemsPng from './assets/map-items.png';
import logoPng from './assets/logo.png';

import mapJson from './assets/map.json';
import itemJson from './assets/items.json';
import json from './assets/items.json';
import logoScene from "./scenes/logo"

const config = {
  type: Phaser.AUTO,
  parent: "rpg",
  width: 960,
  height: 640,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
    logoScene: logoScene
  }
};


var player, npc;
var keyboardKeys;


const game = new Phaser.Game(config);

function preload() {

  this.load.spritesheet('sheet-hero', heroImg, {
    frameWidth: 32,
    frameHeight: 32,
    endFrame: 12
  });

  this.load.spritesheet('sheet-npc', npcImg, {
    frameWidth: 32,
    frameHeight: 48,
    endFrame: 16
  });

  this.load.tilemapTiledJSON('map', mapJson);
  this.load.image('map-items', mapItemsPng);

  this.load.image('logo', logoPng);

  this.load.image('gem', gemPng);

}

function create() {
  keyboardKeys = this.input.keyboard.createCursorKeys();
  // Map.addMap(this);
  // Items.loadItems(this);

  // 初始化地图
  var map = this.make.tilemap({ key: 'map' });
  var tileset = map.addTilesetImage('map-items');

  var layer = map.createStaticLayer(0, tileset, 0, 0);
  layer.setCollisionByProperty({ collides: true });
  // // this.impact.world.setCollisionMapFromTilemapLayer(layer, { slopeProperty: 'slope' });

  

  this.physics.systems.start(Phaser.Physics.ARCADE)



  // 初始化玩家
  var sprite = this.add.sprite(32, 32, 'sheet-hero', 3);
  player = new Player(sprite,config);
  player.loadAllWalkAnim(this);

  var nsprite = this.add.sprite(128, 32, 'sheet-npc', 2);
  // npc = new Npc(nsprite,config);
  // npc.loadWalkAnim(this,"down",true);
  // var image = this.add.image(50, 50, 'logo');

  // this.add.image(0, 0, 'gem', null, game.stage);
  // this.add.image(100, 0, 'gem', null, game.stage);
  // this.add.image(200, 0, 'gem', null, game.stage);
  // this.add.image(300, 0, 'gem', null, game.stage);


  var particles = this.add.particles('red');

  var emitter = particles.createEmitter({
      speed: 50,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
  });

  var npcentity = this.add.sprite(128, 32, 'sheet-npc', 2);

  // npcentity.setVelocity(100, 200);
  // npcentity.setBounce(1, 1);
  // npcentity.setCollideWorldBounds(true);
  emitter.startFollow(npcentity);

}


function update() {

  if (keyboardKeys.up.isDown) {
    player.up();
    player.walk('up');
  }

  if (keyboardKeys.down.isDown) {
    player.down();
    player.walk('down');
  }

  if (keyboardKeys.left.isDown) {
    player.left();
    player.walk('left');
  }

  if (keyboardKeys.right.isDown) {
    player.right();
    player.walk('right');
  }


}
