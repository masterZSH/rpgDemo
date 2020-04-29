import Phaser from "phaser";
import hearoImg from "./assets/hero.png";
import Player from './players/player';
import Map    from './map/map';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 500,
  height: 400,
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
  Map.loadMap(this);
  this.load.spritesheet('sheet-hero', hearoImg, {
    frameWidth: 32,
    frameHeight: 32,
    endFrame: 12
  });
  
}

function create() {
  keyboardKeys = this.input.keyboard.createCursorKeys();
  Map.addMap(this);
  // 初始化角色位置
  var sprite = this.add.sprite(32, 32, 'sheet-hero', 3);
  player = new Player(sprite,config);
  player.loadAllWalkAnim(this);
  this.cameras;
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
