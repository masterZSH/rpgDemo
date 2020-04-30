import itemsPng from "../assets/items.png";

// 地图对象
const Items = {
    loadItems(p) {
        p.load.spritesheet('v-items', itemsPng, {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 12
        });
    },

    addItem(p) {
        var sprite = p.add.sprite(100, 200, 'v-items', 3);
    }
}

export default Items;
