class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
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
        this.add.text(centerX, centerY, 'All the Way Up').setOrigin(0.5)
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start('playScene')
            console.log('pass')
        }
    }
}