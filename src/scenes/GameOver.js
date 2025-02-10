class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create() {
        this.gameOverTitle = this.add.text(centerX, centerY, 'Game Over').setOrigin(0.5)
        this.restartTitle = this.add.text(centerX, centerY+40, 'Press UP to restart').setOrigin(0.5)

        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.restartTitle.visible = !this.restartTitle.visible
            },
            loop: true
        })

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start('playScene')
        }
    }
}