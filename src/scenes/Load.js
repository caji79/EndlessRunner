class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // sprite sheet
        this.load.spritesheet('balloon', './assets/balloon_sheet.png', {
            frameWidth: 16,
            frameHeight: 32
        })

        // image
        this.load.image('needle', './assets/pixel_needle.png')
        this.load.image('menuBackground', './assets/menuBackground.png')
        this.load.image('sky', './assets/sky.png')
        this.load.image('wind', './assets/wind.png')

        // sound effect
        this.load.audio('sfx-pop', './assets/pop.wav')
        this.load.audio('sfx-move', './assets/balloonMove.wav')
        this.load.audio('sfx-up', './assets/balloonUp.wav')
        this.load.audio('sfx-wind', './assets/windBlow.wav')
        this.load.audio('sfx-restart', './assets/restart.wav')

        // bgm
        this.load.audio('game-bgm', './assets/game_bgm.mp3')

        }

    create() {
        // balloon animation
        this.anims.create({
            key: 'idle',
            frameRate: 0,
            repeat: 0,
            frames: this.anims.generateFrameNames('balloon', {
                start: 0,
                end: 0
            })
        })

        this.anims.create({
            key: 'left',
            frameRate: 5,
            repeat: 0,
            frames: this.anims.generateFrameNames('balloon', {
                start: 1,
                end: 3
            })
        })

        this.anims.create({
            key: 'right',
            frameRate: 5,
            repeat: 0,
            frames: this.anims.generateFrameNames('balloon', {
                start: 4,
                end: 6
            })
        })

        this.anims.create({
            key: 'death',
            frameRate: 5,
            repeat: 0,
            frames: this.anims.generateFrameNames('balloon', {
                start: 7,
                end: 10
            })
        })

        // console.log('from load to menu')
        this.scene.start('menuScene')
    }
}