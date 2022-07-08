class Npc {
    constructor(body, config) {
        this.init();
        this.body = body;
        this.sysConfig = config;
    }

    getWalkActions() {
        return {
            left: 'walkLeft',
            right: 'walkRight',
            up: 'walkUp',
            down: 'walkDown'
        }
    }

    getPlayerFrams(p, mode) {
        let frames = p.anims.generateFrameNumbers('sheet-npc');
        switch (mode) {
            case 'down':
                return frames.splice(0, 4);
            case 'left':
                return frames.splice(4, 4);
            case 'right':
                return frames.splice(8, 4);
            case 'up':
                return frames.splice(12, 4);
        }
    }

    loadWalkAnim(p, mode, isPlay = false) {
        let actions = this.getWalkActions();
        let keyName = actions[mode];
        let frames = this.getPlayerFrams(p, mode);
        let config = {
            key: keyName,
            frames: frames,
            frameRate: 6,
            yoyo: true,
            repeat: -1
        };
        p.anims.create(config);
        this.body.anims.load(keyName);
        if (isPlay) {
            this.body.anims.play(keyName);
        }
    }

    playAction(mode) {
        let actions = this.getWalkActions();
        let keyName = actions[mode];
        this.body.anims.play(keyName);
    }

    init() {
        this.downImgArr = [0];
        this.leftImgArr = [1];
        this.upImgArr = [2];
    }




}

export default Npc