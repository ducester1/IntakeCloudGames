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
var updateScene;
var createScene;
var game = new Phaser.Game(config);
var width = game.config.width;
var height = game.config.height;

var startTextStartHeight = 540;
var yMiddle = 140 + 88 * 3;
var startText, spin, spinGlow, hand;
var up;
var startSpinning = false, firstStop = false;
var reelSpinning = [true, true, true, true];

var reel0, reel1, reel2, reel3;
var reel0Speed = { speed: 0 }, reel1Speed = { speed: 0 }, reel2Speed = { speed: 0 }, reel3Speed = { speed: 0 };
var timedEventFirstSpin;

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
    createScene = this;

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
    reel0 = [
        this.add.sprite(410, 140 + 0, 'SLOTS7'),
        this.add.sprite(410, 140 + 88, 'SLOTS10'),
        this.add.sprite(410, 140 + 88 * 2, 'SLOTSMELON'),
        this.add.sprite(410, 140 + 88 * 3, 'SLOTSLEMON'),
        this.add.sprite(410, 140 + 88 * 4, 'SLOTSDIAMOND'),
        this.add.sprite(410, 140 + 88 * 5, 'SLOTSBAR'),
        this.add.sprite(410, 140 + 88 * 6, 'SLOTSCROWN')
    ];
    //adds the mask to the sprites so they wont show out of the reels
    reel0.forEach(sprite => {
        sprite.mask = new Phaser.Display.Masks.GeometryMask(this, mask)
    });

    reel1 = [
        this.add.sprite(560, 140 + 0, 'SLOTSMELON'),
        this.add.sprite(560, 140 + 88, 'SLOTSCROWN'),
        this.add.sprite(560, 140 + 88 * 2, 'SLOTSBAR'),
        this.add.sprite(560, 140 + 88 * 3, 'SLOTS10'),
        this.add.sprite(560, 140 + 88 * 4, 'SLOTSLEMON'),
        this.add.sprite(560, 140 + 88 * 5, 'SLOTS7'),
        this.add.sprite(560, 140 + 88 * 6, 'SLOTSDIAMOND')
    ];
    reel1.forEach(sprite => {
        sprite.mask = new Phaser.Display.Masks.GeometryMask(this, mask)
    });

    reel2 = [
        this.add.sprite(720, 140 + 0, 'SLOTSLEMON'),
        this.add.sprite(720, 140 + 88, 'SLOTSBAR'),
        this.add.sprite(720, 140 + 88 * 2, 'SLOTS7'),
        this.add.sprite(720, 140 + 88 * 3, 'SLOTSDIAMOND'),
        this.add.sprite(720, 140 + 88 * 4, 'SLOTS10'),
        this.add.sprite(720, 140 + 88 * 5, 'SLOTSCROWN'),
        this.add.sprite(720, 140 + 88 * 6, 'SLOTSMELON')
    ];
    reel2.forEach(sprite => {
        sprite.mask = new Phaser.Display.Masks.GeometryMask(this, mask)
    });

    reel3 = [
        this.add.sprite(870, 140 + 0, 'SLOTSBAR'),
        this.add.sprite(870, 140 + 88, 'SLOTSDIAMOND'),
        this.add.sprite(870, 140 + 88 * 2, 'SLOTSLEMON'),
        this.add.sprite(870, 140 + 88 * 3, 'SLOTSCROWN'),
        this.add.sprite(870, 140 + 88 * 4, 'SLOTS7'),
        this.add.sprite(870, 140 + 88 * 5, 'SLOTSMELON'),
        this.add.sprite(870, 140 + 88 * 6, 'SLOTS10')
    ];
    reel3.forEach(sprite => {
        sprite.mask = new Phaser.Display.Masks.GeometryMask(this, mask)
    });

    spin = this.add.sprite(870, 616, 'SPIN').setInteractive();
    spin.on('pointerdown', startSpin);
    startText = this.add.sprite(870, startTextStartHeight, 'START');
    this.tweens.add({ targets: startText, y: 550, duration: 500, yoyo: true, repeat: -1 });
    hand = this.add.sprite(970, 675, 'MOUSEHAND');

    spinGlow = this.add.sprite(870, 616, 'SPINGLOW').setVisible(false);
}

function update() {
    updateScene = this;
    //startMovement(startText, 10);
    console
    if (startSpinning) {
        spinning();
    }
    if (firstStop) {
        stopSpinningFirstTime();
    }
}

function startSpin() {
    startSpinning = true;
    startText.setVisible(false);
    spin.setVisible(false);
    hand.setVisible(false);
    spinGlow.setVisible(true);
    timedEventFirstSpin = updateScene.time.delayedCall(3000, setFirstStop => { firstStop = true; }, [], this);
}

function stopSpinningFirstTime() {
    stopping(0, reel0, 3);
    //waiting after first reel is tweening
    updateScene.time.delayedCall(400, stopping1FirstStop => {

        stopping(1, reel1, 2);
        //waiting after the seccond reel is tweening
        updateScene.time.delayedCall(400, stopping2FirstStop => {

            stopping(2, reel2, 1);
            //waiting after the third reel is tweening
            updateScene.time.delayedCall(1500, stopping3FirstStop => {
                stopping(3, reel3, 0)
            })

        }, [], this);
    }, [], this);
}


function stopping(reelNR, array, chosen) {
    if (array[chosen].y > (yMiddle - 70) && array[chosen].y < (yMiddle - 40)) {
        for (var index = 0; index < array.length; index++) {
            var target = targetFinder(chosen, index);
            if (target == 0 || target == 6) {
                array[index].y = 140 + 88 * target;
            }
            eTarget = 140 + 88 * target;
            updateScene.tweens.add({ targets: array[index], y: eTarget, duration: 4000, ease: 'Elastic' });
        };
        reelSpinning[reelNR] = false;
    }
}

function targetFinder(chosen, index) {
    var move = 0;
    var move = 3 - chosen;
    index += move
    if (index > 6) index = 0 + (index - 7);
    else if (index < 0) index = 7 - (0 - index);
    return index;
}

function spinning() {
    createScene.tweens.add({ targets: reel0Speed, speed: 20, duration: 500, ease: 'Linear.None' });
    createScene.tweens.add({ targets: reel1Speed, speed: 20, duration: 500, ease: 'Linear.None' });
    createScene.tweens.add({ targets: reel2Speed, speed: 20, duration: 500, ease: 'Linear.None' });
    createScene.tweens.add({ targets: reel3Speed, speed: 20, duration: 500, ease: 'Linear.None' });

    //reel 1
    if (reelSpinning[0]) {
        for (let index = 0; index < reel0.length; index++) {
            reel0[index].y += reel0Speed.speed;
            if (reel0[index].y > 140 + 88 * 6) {
                if (index + 1 >= reel0.length) {
                    reel0[index].y = reel0[0].y - 88;
                } else {
                    var temp = index + 1
                    reel0[index].y = reel0[temp].y - 88;
                }
            }
        }
    }
    //reel 2
    if (reelSpinning[1]) {
        for (let index = 0; index < reel1.length; index++) {
            reel1[index].y += reel1Speed.speed;
            if (reel1[index].y > 140 + 88 * 6) {
                if (index + 1 >= reel1.length) {
                    reel1[index].y = reel1[0].y - 88;
                } else {
                    var temp = index + 1
                    reel1[index].y = reel1[temp].y - 88;
                }
            }
        }
    }
    //reel 3
    if (reelSpinning[2]) {
        for (let index = 0; index < reel2.length; index++) {
            reel2[index].y += reel2Speed.speed;
            if (reel2[index].y > 140 + 88 * 6) {
                if (index + 1 >= reel2.length) {
                    reel2[index].y = reel2[0].y - 88;
                } else {
                    var temp = index + 1
                    reel2[index].y = reel2[temp].y - 88;
                }
            }
        }
    }
    //reel 4
    if (reelSpinning[3]) {
        for (let index = 0; index < reel3.length; index++) {
            reel3[index].y += reel3Speed.speed;
            if (reel3[index].y > 140 + 88 * 6) {
                if (index + 1 >= reel3.length) {
                    reel3[index].y = reel3[0].y - 88;
                } else {
                    var temp = index + 1
                    reel3[index].y = reel3[temp].y - 88;
                }
            }
        }
    }
}