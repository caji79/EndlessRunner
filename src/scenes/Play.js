class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        this.balloonVelocity = 10
        this.needleVelocity = 400
        altitude = 0

        // bgm
        this.bgm = this.sound.add('bgm', {
            mute: false,
            volume: 0.5,
            loop: true
        })
        this.bgm.play()

        // play background
        this.sky = this.add.tileSprite(0, 0, 420, 840, 'sky').setOrigin(0, 0)
        this.skyScrolling = true

        // height display (scores)
        let heightConfig = {
            fontFamily: 'Pegasus',
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#FFFFFF',
            resolution: 10,
            align: 'center',
            fixedWidth: 0
        } 

        this.heightText = this.add.text(centerX, height-40, `${altitude}m`, heightConfig).setOrigin(0.5).setAlpha(0)

        this.tweens.add({
            targets: this.heightText,
            duration: 1000,
            alpha: 1
        })

        // balloon physic settings
        balloon = this.physics.add.sprite(centerX, height, 'balloon', 0).setOrigin(0.5).setScale(2)
        balloon.body.setCircle(balloon.width/2)
        balloon.body.setCollideWorldBounds(true)
        balloon.setImmovable()
        balloon.setDragX(0.1)
        balloon.setBounce(0.7)
        balloon.setMaxVelocity(300, 0)

        // little animation transition between two scenes
        this.tweens.add({
            targets: balloon,
            duration: 1000,
            y: height/7*6
        })

        // winning condition
        balloon.popped = false

        // add needle
        this.needles = this.add.group({
            runChildUpdate: true
        })

        this.spawnTimer = this.time.addEvent({
            delay: 1500,
            callback: this.addNeedle,
            callbackScope: this,
            loop: true
        })

        // altitude timer
        this.altitudeTimer = this.time.addEvent({
            delay: 1000,
            callback: this.balloonHeight,
            callbackScope: this,
            loop: true
        })

        // balloon-needle collision
        this.physics.add.collider(balloon, this.needles, this.balloonPop, null, this)

        // wind particle
        this.windEmitter = this.add.particles(0, 0, 'wind', {
            speedX: 100,
            scale: 2,
            alpha: {start: 1, end: 0},
            quantity: 1,
            frequency: 1000,
            emitting: false
        })

        // wind blowing time
        this.windTimer = this.time.addEvent({
            delay: Phaser.Math.Between(8000, 12000),
            callback: this.applyWind,
            callbackScope: this,
            loop: true
        })

        // key settings
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (this.skyScrolling) {
            this.sky.tilePositionY -= 1
        }

        if (!balloon.popped) {
            if (this.windBlowing) {
                balloon.body.velocity.x += this.windStrength
            }

            if (cursors.left.isDown) {
                // console.log('left')
                balloon.play('left')
                balloon.body.velocity.x -= this.balloonVelocity
            } else if (cursors.right.isDown) {
                // console.log('right')
                balloon.play('right')
                balloon.body.velocity.x += this.balloonVelocity
            } else {
                balloon.play('idle')
            }
            
            if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
                this.sound.play('sfx-move', { volume: 0.5 })
            } else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
                this.sound.play('sfx-move', { volume: 0.5 })
            }
        }

        if (altitude > highScore) {
            highScore = altitude
        }
    }

    addNeedle() {
        let needle = new Needle(this, this.needleVelocity)
        this.needles.add(needle)
    }

    balloonHeight() {
        altitude += 1
        this.heightText.setText(`${altitude}m`)
        
        // increase needle falling speed and spawn speed
        if (altitude % 5 == 0) {
            if (this.altitudeTimer.delay > 150 && this.needleVelocity < 570) {
                this.altitudeTimer.delay -= 50
                this.needleVelocity += 10
                // console.log(this.altitudeTimer.delay)
                // console.log(this.needleVelocity)
            }

            if (this.spawnTimer.delay > 375) {
                this.spawnTimer.delay -= 75
                // console.log(`spawn: ${this.spawnTimer.delay}`)
            }
        }

    }

    balloonPop() {
        balloon.popped = true
        this.bgm.mute = true
        this.sound.play('sfx-pop')
        this.spawnTimer.destroy()
        this.altitudeTimer.destroy()
        this.windTimer.destroy()
        this.physics.pause()
        this.skyScrolling = false
        balloon.play('death',true).once('animationcomplete', () => {
            // console.log('balloon destroyed')
            balloon.destroy()
            this.cameras.main.fadeOut(2000, 255, 255, 255)
            this.time.delayedCall(2000, () => {
                this.scene.start('gameOverScene')
            })
        })
    }

    applyWind() {
        // console.log('function called')
        this.windStrength = Phaser.Math.Between(2, 6)
        let windDuration = 4000

        this.sound.play('sfx-wind')
        this.windEmitter.setPosition(0, balloon.y)
        this.windEmitter.start()
        
        this.windBlowing = true

        this.time.delayedCall(windDuration, () => {
            this.windBlowing = false
            this.windEmitter.stop()
            // console.log('function stop')
        })
    }
}