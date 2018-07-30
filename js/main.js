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
var spin, spinGlow;
var up;
var startSpinning = false;
var reel1, reel2, reel3, reel4;
var reel1Speed = 1;
var reel2Speed = 1;
var reel3Speed = 1;
var reel4Speed = 1;
var maxReelSpeed = 20;

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
    this.load.image('SLOTSMELON', 'assets/slots-melon.png');
}

function create() {
    var shape = new Phaser.Geom.Rectangle(360, 270, 570, 268);
    var mask = this.add.graphics({ fillStyle: { color: 0x0000ff } });
    mask.fillRectShape(shape);

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

    //create slots
    reel1 = [
        this.add.sprite(410, 140 + 0, 'SLOTS7'),
        this.add.sprite(410, 140 + 88, 'SLOTS10'),
        this.add.sprite(410, 140 + 88 * 2, 'SLOTSMELON'),
        this.add.sprite(410, 140 + 88 * 3, 'SLOTSLEMON'),
        this.add.sprite(410, 140 + 88 * 4, 'SLOTSDIAMOND'),
        this.add.sprite(410, 140 + 88 * 5, 'SLOTSBAR'),
        this.add.sprite(410, 140 + 88 * 6, 'SLOTSCROWN')
    ];
    //adds the mask to the sprites so they wont show out of the reels
    reel1.forEach(sprite => {
        sprite.mask = new Phaser.Display.Masks.GeometryMask(this, mask)
    });

    reel2 = [
        this.add.sprite(560, 140 + 0, 'SLOTS7'),
        this.add.sprite(560, 140 + 88, 'SLOTS10'),
        this.add.sprite(560, 140 + 88 * 2, 'SLOTSMELON'),
        this.add.sprite(560, 140 + 88 * 3, 'SLOTSLEMON'),
        this.add.sprite(560, 140 + 88 * 4, 'SLOTSDIAMOND'),
        this.add.sprite(560, 140 + 88 * 5, 'SLOTSBAR'),
        this.add.sprite(560, 140 + 88 * 6, 'SLOTSCROWN')
    ];
    reel2.forEach(sprite => {
        sprite.mask = new Phaser.Display.Masks.GeometryMask(this, mask)
    });

    reel3 = [
        this.add.sprite(720, 140 + 0, 'SLOTS7'),
        this.add.sprite(720, 140 + 88, 'SLOTS10'),
        this.add.sprite(720, 140 + 88 * 2, 'SLOTSMELON'),
        this.add.sprite(720, 140 + 88 * 3, 'SLOTSLEMON'),
        this.add.sprite(720, 140 + 88 * 4, 'SLOTSDIAMOND'),
        this.add.sprite(720, 140 + 88 * 5, 'SLOTSBAR'),
        this.add.sprite(720, 140 + 88 * 6, 'SLOTSCROWN')
    ];
    reel3.forEach(sprite => {
        sprite.mask = new Phaser.Display.Masks.GeometryMask(this, mask)
    });

    reel4 = [
        this.add.sprite(870, 140 + 0, 'SLOTS7'),
        this.add.sprite(870, 140 + 88, 'SLOTS10'),
        this.add.sprite(870, 140 + 88 * 2, 'SLOTSMELON'),
        this.add.sprite(870, 140 + 88 * 3, 'SLOTSLEMON'),
        this.add.sprite(870, 140 + 88 * 4, 'SLOTSDIAMOND'),
        this.add.sprite(870, 140 + 88 * 5, 'SLOTSBAR'),
        this.add.sprite(870, 140 + 88 * 6, 'SLOTSCROWN')
    ];
    reel4.forEach(sprite => {
        sprite.mask = new Phaser.Display.Masks.GeometryMask(this, mask)
    });

    spin = this.add.sprite(870, 616, 'SPIN').setInteractive();
    spin.on('pointerdown', startSpin);
    startText = this.add.sprite(870, startTextStartHeight, 'START');
    this.add.sprite(970, 675, 'MOUSEHAND');

    spinGlow = this.add.sprite(870, 616, 'SPINGLOW').setVisible(false);
}

function update() {
    startMovement(startText, 10);
    if (startSpinning) spinning();
}

function startMovement(startText, maximumMovement) {
    if (startText.y >= startTextStartHeight + maximumMovement / 2) up = false;
    if (startText.y <= startTextStartHeight - maximumMovement / 2) up = true;
    if (up) startText.y += 0.5;
    else startText.y -= 0.5;
}

function startSpin(scene) {
    startSpinning = true;
    startText.setVisible(false);
    spin.setVisible(false);
    spinGlow.setVisible(true);

}

function spinning() {
    if (reel1Speed < maxReelSpeed) reel1Speed += 0.2;
    if (reel2Speed < maxReelSpeed) reel2Speed += 0.2;
    if (reel3Speed < maxReelSpeed) reel3Speed += 0.2;
    if (reel4Speed < maxReelSpeed) reel4Speed += 0.2;
    //reel 1
    for (let index = 0; index < reel1.length; index++) {
        reel1[index].y += reel1Speed;
        if (reel1[index].y > 140 + 88 * 6) {
            if (index + 1 >= reel1.length) {
                reel1[index].y = reel1[0].y - 88;
            } else {
                var temp = index + 1
                reel1[index].y = reel1[temp].y - 88;
            }
        }
    }
    //reel 2
    for (let index = 0; index < reel2.length; index++) {
        reel2[index].y += reel2Speed;
        if (reel2[index].y > 140 + 88 * 6) {
            if (index + 1 >= reel2.length) {
                reel2[index].y = reel2[0].y - 88;
            } else {
                var temp = index + 1
                reel2[index].y = reel2[temp].y - 88;
            }
        }
    }
    //reel 3
    for (let index = 0; index < reel3.length; index++) {
        reel3[index].y += reel3Speed;
        if (reel3[index].y > 140 + 88 * 6) {
            if (index + 1 >= reel3.length) {
                reel3[index].y = reel3[0].y - 88;
            } else {
                var temp = index + 1
                reel3[index].y = reel3[temp].y - 88;
            }
        }
    }
    //reel 4
    for (let index = 0; index < reel4.length; index++) {
        reel4[index].y += reel4Speed;
        if (reel4[index].y > 140 + 88 * 6) {
            if (index + 1 >= reel4.length) {
                reel4[index].y = reel4[0].y - 88;
            } else {
                var temp = index + 1
                reel4[index].y = reel4[temp].y - 88;
            }
        }
    }

}