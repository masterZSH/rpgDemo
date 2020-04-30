import mapImg from "../assets/map.jpg";

// 地图对象
const Map = {
    loadMap(p){
        p.load.image("map", mapImg);
    },
    addMap(p){
        p.add.sprite(0, 0, 'map'); 
    }
}

export default Map;
