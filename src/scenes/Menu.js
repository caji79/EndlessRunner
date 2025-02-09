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
        this.subTitle = this.add.text(centerX, centerY+40, 'Use the LEFT & RIGHT to Move', menuConfig).setOrigin(0.5)

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.menuScrolling = true

            this.tweens.add({
                targets: [ this.mainTitle, this.subTitle],
                duration: 3250,
                alpha: 0,
                onComplete: () => {
                    this.scene.start('playScene')
                }
            })
        }

        if (this.menuScrolling) {
            this.menuTileSprite.tilePositionY -= 1
        }
    }
}