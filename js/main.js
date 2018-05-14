var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var width = game.config.width;
var height = game.config.height;

function preload() {
    this.load.image('BG', 'assets/bg.jpg');
    this.load.image('SLOTMACHINE', 'assets/slotmachine.jpg');
    this.load.image('SPIN', 'assets/spin-btn.png');
    this.load.image('START', 'assets/start-spinning.png');
}

function create() {
    this.add.image(width / 2, height / 2, 'BG');
    this.add.image(width / 2, height / 2, 'SLOTMACHINE');
    this.add.image(870, 616, 'SPIN');
    this.add.image(870, 540, 'START');
}

function update() {

}