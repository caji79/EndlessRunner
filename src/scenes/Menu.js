class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {
        // menu background
        this.menuTileSprite = this.add.tileSprite(width/2, 90, 420, 1260, 'menuBackground')
        this.menuScrolling = false

        // title font setting
        let menuConfig = {
            fontFamily: 'Pegasus',
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#ffffff',
            resolution: 10,
            align: 'center',
            fixedWidth: 0
        }
        
        // main title/instruction
        this.mainTitle = this.add.text(centerX, centerY, 'All the Way Up', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '20px'
        this.subTitle01 = this.add.text(centerX, centerY+40, 'Use the LEFT & RIGHT to Move', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '28px'
        this.subTitle02 = this.add.text(centerX, centerY+height/5, 'Press UP to Play', menuConfig).setOrigin(0.5)

        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.subTitle02.visible = !this.subTitle02.visible
            },
            loop: true
        })

        balloon = this.add.image(centerX-1, height/7*6, 'balloon', 0).setOrigin(0.5).setScale(2)

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.menuScrolling = true
            this.subTitle02.destroy()

            this.tweens.add({
                targets: [ this.mainTitle, this.subTitle01],
                duration: 3250,
                alpha: 0,
                onComplete: () => {
                    this.scene.start('playScene')
                }
            })

            this.tweens.add({
                targets: balloon,
                duration: 3250,
                y: -50
            })
        }

        if (this.menuScrolling) {
            this.menuTileSprite.tilePositionY -= 1
        }
    }
}