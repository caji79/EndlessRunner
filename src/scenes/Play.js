class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.BALLOON_VELOCITY = 10
    }

    create() {
        this.cameras.main.setBackgroundColor(0x33ddff)

        // balloon physic settings
        balloon = this.physics.add.sprite(centerX, height/7*6, 'balloon', 0).setOrigin(0.5).setScale(2)
        balloon.body.setCircle(balloon.width/2)
        balloon.body.setCollideWorldBounds(true)
        balloon.setDragX(200)
        balloon.setBounce(0.7)
        balloon.setMaxVelocity(300, 0)
        // winning condition
        balloon.destroyed = false

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
            key: 'death',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNames('balloon', {
                start: 7,
                end: 10
            })
        })

        // this.needle = this.physics.add.sprite(centerX, centerY, 'needle').setScale(2)
        this.needles = this.add.group()

        this.spawn1 = this.time.addEvent({
            delay: 3000,
            callback: this.spawnNeedle,
            callbackScope: this,
            loop: true
        })


        // key settings
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (!balloon.destroyed) {
            if (cursors.left.isDown) {
                // console.log('left')
                balloon.play('left', true)
                balloon.body.velocity.x -= this.BALLOON_VELOCITY
            } else if (cursors.right.isDown) {
                // console.log('right')
                balloon.play('right', true)
                balloon.body.velocity.x += this.BALLOON_VELOCITY
            } else {
                balloon.play('idle', true)
            }            
        }

        console.log(`velocity: ${balloon.body.velocity.x}`)
    }

    spawnNeedle() {
        let needle = new Needle(this, 150)
        this.needles.add(needle)
    }
}