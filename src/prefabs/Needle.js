class Needle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, Phaser.Math.Between(16, game.config.width - 16), 0, 'needle')

        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setVelocityY(velocity)
        this.setImmovable()
        this.setScale(2)
    }

    update() {
        if (this.y > height+this.height) {
            this.destroy()
            console.log('needle destroyed')
        }
    }
}