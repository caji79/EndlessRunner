class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.BALLOON_VELOCITY = 10
    }

    create() {
        this.cameras.main.setBackgroundColor(0x33ddff)

        balloon = this.physics.add.sprite(centerX, height/7*6, 'balloon', 0).setOrigin(0.5).setScale(2)
        balloon.body.setCollideWorldBounds(true)

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
            repeat: -1,
            frames: this.anims.generateFrameNames('balloon', {
                start: 1,
                end: 3
            })
        })

        this.anims.create({
            key: 'right',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNames('balloon', {
                start: 4,
                end: 6
            })
        })

        this.anims.create({
            key: 'dead',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNames('balloon', {
                start: 7,
                end: 10
            })
        })

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (cursors.left.isDown) {
            // console.log('left')
            balloon.play('left')
            balloon.x -= this.BALLOON_VELOCITY
        } else if (cursors.right.isDown) {
            // console.log('right')
            balloon.play('right')
            balloon.x += this.BALLOON_VELOCITY
        } else {
            console.log('idle')
            balloon.play('idle')
        }
    }
}