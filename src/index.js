import Phaser from "phaser";
import hearoImg from "./assets/hero.png";
import Player from './players/player';
import Map    from './map/map';
import Items    from './map/items';
import mapItemsPng from './assets/map-items.png';
import mapJson from './assets/map.json';
import itemJson from './assets/items.json';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 960,
  height: 640,
  pixelArt: true,
  physics: {
      default: 'impact',
      impact: { gravity: 200 }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};


var player;
var keyboardKeys;


const game = new Phaser.Game(config);

function preload() {
  this.load.spritesheet('sheet-hero', hearoImg, {
    frameWidth: 32,
    frameHeight: 32,
    endFrame: 12
  });

  this.load.tilemapTiledJSON('map', mapJson);
  this.load.image('map-items', mapItemsPng);

  
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
  this.impact.world.setCollisionMapFromTilemapLayer(layer, { slopeProperty: 'slope' });



  // 初始化玩家
  var sprite = this.add.sprite(32, 32, 'sheet-hero', 3);
  player = new Player(sprite,config);
  player.loadAllWalkAnim(this);
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
