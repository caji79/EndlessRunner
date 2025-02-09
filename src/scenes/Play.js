class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.BALLOON_VELOCITY = 10
        this.NEEDLE_VELOCITY = 400
    }

    create() {
        this.cameras.main.setBackgroundColor(0x33ddff)

        // play background
        this.sky = this.add.tileSprite(0, 0, 420, 840, 'sky').setOrigin(0, 0)
        this.skyScrolling = true

        // balloon physic settings
        balloon = this.physics.add.sprite(centerX, height/7*6, 'balloon', 0).setOrigin(0.5).setScale(2)
        balloon.body.setCircle(balloon.width/2)
        balloon.body.setCollideWorldBounds(true)
        balloon.setImmovable()
        balloon.setDragX(0.5)
        balloon.setBounce(0.7)
        balloon.setMaxVelocity(300, 0)
        // winning condition
        balloon.popped = false

        // add needle
        this.needles = this.add.group({
            runChildUpdate: true
        })

        this.spawnTimer = this.time.addEvent({
            delay: 1000,
            callback: this.addNeedle,
            callbackScope: this,
            loop: true
        })

        // balloon-needle collision
        this.physics.add.collider(balloon, this.needles, this.balloonPop, null, this)

        // key settings
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (this.skyScrolling) {
            this.sky.tilePositionY -= 1
        }

        if (!balloon.popped) {
            if (cursors.left.isDown) {
                // console.log('left')
                balloon.play('left')
                balloon.body.velocity.x -= this.BALLOON_VELOCITY
            } else if (cursors.right.isDown) {
                // console.log('right')
                balloon.play('right')
                balloon.body.velocity.x += this.BALLOON_VELOCITY
            } else {
                balloon.play('idle')
            }            
        }
    }

    addNeedle() {
        let needle = new Needle(this, this.NEEDLE_VELOCITY)
        this.needles.add(needle)
    }

    balloonPop() {
        balloon.popped = true
        this.spawnTimer.destroy()
        this.physics.pause()
        this.skyScrolling = false
        balloon.play('death',true).once('animationcomplete', () => {
            // console.log('balloon destroyed')
            balloon.destroy()
        })
    }
}