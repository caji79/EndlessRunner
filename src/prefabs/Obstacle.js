class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, Phaser.Math.Between(), game.config.height)
    }
}