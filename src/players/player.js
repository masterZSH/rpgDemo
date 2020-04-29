class Player {
    constructor(body,config) {
        this.init();
        this.body = body;
        this.sysConfig = config;
    }

    init() {
        this.downImgArr = [0, 1, 2];
        this.leftImgArr = [3, 4, 5];
        this.rightImgArr = [6, 7, 8];
        this.upImgArr = [9, 10, 11];
        // 移动速度
        this.speed = 3;
    }

    left() {
        this.body.x > this.speed ?
            this.body.x -= this.speed : void(0)
    }

    right() {
        this.body.x + this.speed < this.sysConfig.width ?
            this.body.x += this.speed : void(0)
    }

    up() {
        this.body.y  > this.speed ?
        this.body.y -= this.speed : void(0)
    }

    down() {
        this.body.y + this.speed < this.sysConfig.height ?
            this.body.y += this.speed : void(0)
    }

    getPlayerFrams(p,mode){
        let frames = p.anims.generateFrameNumbers('sheet-hero');
        switch(mode) {
            case 'down':
                return frames.splice(0,3);
            case 'left':
                return frames.splice(3,3);
            case 'right':
                return frames.splice(6,3);
            case 'up':
                return frames.splice(9,3);
        }
    }

    getWalkActions(){
        return {
            left : 'walkLeft',
            right: 'walkRight',
            up: 'walkUp',
            down: 'walkDown'
        }
    }

    stopActions(){
        let actions = this.getWalkActions();
        this.stopAction(actions['left']);
        this.stopAction(actions['right']);
        this.stopAction(actions['up']);
        this.stopAction(actions['down']);
    }

    stopAction(keyName){
       let animationManager = this.body.anims.animationManager;
       let anim = animationManager.anims['entries'][keyName];
       this.body.anims.play(anim);
    }

    playAction(mode){
        let actions = this.getWalkActions();
        let keyName = actions[mode];
        this.body.anims.play(keyName);
    }

    loadAllWalkAnim(p){
        this.loadWalkAnim(p,'left');
        this.loadWalkAnim(p,'right');
        this.loadWalkAnim(p,'up');
        this.loadWalkAnim(p,'down',true);
    }

    loadWalkAnim(p,mode,isPlay=false){
        let actions = this.getWalkActions();
        let keyName = actions[mode];
        let frames = this.getPlayerFrams(p,mode);
        let config = {
            key: keyName,
            frames: frames,
            frameRate: 6,
            yoyo: true,
            repeat: -1
        };
        p.anims.create(config);
        this.body.anims.load(keyName);
        if(isPlay){
            this.body.anims.play(keyName);
        }
    }

    walk(mode='left'){
        this.stopActions();
        this.playAction(mode);
    }



}

export default Player