class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create() {
        this.cameras.main.fadeIn(2000, 255, 255, 255)

        this.menuTileSprite = this.add.tileSprite(width/2, 90, 420, 1260, 'menuBackground')

        // creating scoreboard
        // https://labs.phaser.io/edit.html?src=src/game%20objects%5Cgraphics%5Cfill%20rounded%20rectangle.js
        // https://docs.phaser.io/api-documentation/typedef/types-gameobjects-graphics
        let scoreBoard = this.add.graphics()
        scoreBoard.fillStyle(0xffffff, 0.9)
        scoreBoard.fillRoundedRect(50, 100, 320, 520, 32)

        let boardConfig = {
            fontFamily: 'Pegasus',
            fontSize: '32px',
            fontStyle: 'bold',
            stroke: '#bcbcbc',
            strokeThickness: 3,
            color: '#ffffff',
            resolution: 10,
            align: 'center',
            fixedWidth: 0
        }

        let scoreConfig = {
            fontFamily: 'Courier New',
            fontSize: '96px',
            fontStyle: 'bold',
            stroke: '#bcbcbc',
            strokeThickness: 3,
            color: '#ffffff',
            resolution: 10,
            align: 'center',
            fixedWidth: 0
        }

        // display scores
        this.bestScore = this.add.text(centerX, centerY-105, `${highScore}m`, scoreConfig).setOrigin(0.5)
        this.score = this.add.text(centerX, centerY+70, `${altitude}m`, scoreConfig).setOrigin(0.5)

        this.add.text(centerX, centerY-180, 'Highest:', boardConfig).setOrigin(0.5)
        this.add.text(centerX, centerY-5, 'Balloon Reached:', boardConfig).setOrigin(0.5)

        this.restartTitle = this.add.text(centerX, centerY+175, 'Press UP to Restart', boardConfig).setOrigin(0.5)
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
            this.sound.play('sfx-restart')
            this.scene.start('playScene')
        }
    }
}