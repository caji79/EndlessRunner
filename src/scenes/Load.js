class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // load assets
        this.load.spritesheet('balloon', './assets/balloon_sheet.png', {
            frameWidth: 16,
            frameHeight: 32
        })

        this.load.image('needle', './assets/pixel_needle.png')
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

        console.log('from load to menu')
        this.scene.start('menuScene')
    }
}