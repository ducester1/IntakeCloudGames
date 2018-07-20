var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: container,
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);
var width = game.config.width;
var height = game.config.height;
var startTextStartHeight = 540;
var startText;
var up;

function preload() {
    //back- / foreground images
    this.load.image('BG', 'assets/bg.jpg');
    this.load.image('BGCOINS', 'assets/bg-coins.png');
    this.load.image('BIGWIN', 'assets/big-win.png');
    this.load.image('HUGEWIN', 'assets/huge-win.png');
    this.load.image('COINANIMATION', 'assets/coin-animation.png');
    this.load.image('DARKBG', 'assets/dark-bg-overlay.png');
    //slotmachine images
    this.load.image('SLOTMACHINE', 'assets/slotmachine.jpg');
    this.load.image('REELBG', 'assets/reel-bg.png');
    this.load.image('REELOVERLAY', 'assets/reel-overlay.png');
    this.load.image('TOPBARSGLOW', 'assets/top-bars-glow.png');
    this.load.image('TOPDIAMONDGLOW', 'assets/top-diamond-glow.png');
    //numbers images
    this.load.image('LINESNR', 'assets/lines-number.png');
    this.load.image('TOTALBETNR', 'assets/total-bet-number.png');
    this.load.image('NUMBERFIRSTSPIN', 'assets/red-numbers-sprite.png');
    this.load.image('NUMBERSECCONDSPIN', 'assets/number-buttom.png');
    //button images
    this.load.image('SPIN', 'assets/spin-btn.png');
    this.load.image('SPINGLOW', 'assets/spin-btn-glow.png');
    this.load.image('INSTALL', 'assets/install-btn.png');
    //start images
    this.load.image('START', 'assets/start-spinning.png');
    this.load.image('MOUSEHAND', 'assets/mousehand.png');
    //slot images
    this.load.image('SLOTS7', 'assets/slots-7.png');
    this.load.image('SLOTS10', 'assets/slots-10.png');
    this.load.image('SLOTSBAR', 'assets/slots-bar.png');
    this.load.image('SLOTSBARLIGHTER', 'assets/slots-bar-lighter.png');
    this.load.image('SLOTSCROWN', 'assets/slots-crown.png');
    this.load.image('SLOTSDIAMOND', 'assets/slots-diamond.png');
    this.load.image('SLOTSDIAMONDLIGHTER', 'assets/slots-diamond-lighter.png');
    this.load.image('SLOTSLEMON', 'assets/slots-lemon.png');
    this.load.image('SLOTSMELON', 'assets/slots-lemon.png');



}

function create() {
    this.add.sprite(width / 2, height / 2, 'BG');
    this.add.sprite(width / 2, height / 2, 'SLOTMACHINE');
    this.add.sprite(410, 405, 'REELBG');
    this.add.sprite(410, 405, 'REELOVERLAY');
    this.add.sprite(560, 405, 'REELBG');
    this.add.sprite(560, 405, 'REELOVERLAY');
    this.add.sprite(720, 405, 'REELBG');
    this.add.sprite(720, 405, 'REELOVERLAY');
    this.add.sprite(870, 405, 'REELBG');
    this.add.sprite(870, 405, 'REELOVERLAY');
    this.add.sprite(364, 630, 'LINESNR');
    this.add.sprite(460, 630, 'TOTALBETNR');

    var spin = this.add.sprite(870, 616, 'SPIN').setInteractive();
    startText = this.add.sprite(870, startTextStartHeight, 'START');
    this.add.sprite(970, 675, 'MOUSEHAND');

    spin.on('pointerdown', spinning);
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