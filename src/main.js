// Eli Chen
// All the Way Up
// 

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 420,
    height: 720,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        }
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

let width = game.config.width
let height = game.config.height
let centerX = game.config.width/2
let centerY = game.config.height/2
let highScore
let cursors
let balloon