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
var startText;
var startTextStartHeight = 540;
var up;

function preload() {
    this.load.image('BG', 'assets/bg.jpg');
    this.load.image('SLOTMACHINE', 'assets/slotmachine.jpg');
    this.load.image('SPIN', 'assets/spin-btn.png');
    this.load.image('START', 'assets/start-spinning.png');
    this.load.image('MOUSEHAND', 'assets/mousehand.png');
}

function create() {
    this.add.image(width / 2, height / 2, 'BG');
    this.add.image(width / 2, height / 2, 'SLOTMACHINE');
    spin = this.add.image(870, 616, 'SPIN');
    startText = this.add.image(870, startTextStartHeight, 'START');
    this.add.image(970, 675, 'MOUSEHAND');

}

function update() {
    startMovement(startText, 10);
}

function startMovement(startText, maximumMovement) {
    if (startText.y >= startTextStartHeight + maximumMovement / 2) up = false;
    if (startText.y <= startTextStartHeight - maximumMovement / 2) up = true;
    if (up) startText.y += 0.5;
    else startText.y -= 0.5;
}

function spinning() {
    console.log("clicked");

}