// Eli Chen
// All the Way Up
// Total Work Hours: 30 - 35
// Creative Tilt:
//     To be honest, I didn't really do something technically special or interesting. I would say that I focused more on
// the aesthetic side. The only things that may be considered as "new" from the class examples are Particle Emitter and
// Graphics. I looked up some information and examples about how to use them online, making sure they are working properly.
//     For the aesthetic aspect, I think it's good enough. I tried to make the game more visually and aurally engaging to
// make up for my technical shortcomings. What I'm particularly proud of is the balloon popping animation, it took me a long
// time to make it look perfect. Also, I added the transition animation for the balloon between the menu scene and play scene. 
// It looks like the balloon go to the top of the screen and fly out to the sky. Last thing is always the background music, I 
// feel like I might have a talent for music. :)

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
    scene: [ Load, Menu, Play, GameOver ]
}

let game = new Phaser.Game(config)

let width = game.config.width
let height = game.config.height
let centerX = game.config.width/2
let centerY = game.config.height/2
let cursors
let balloon
let altitude
let highScore = 0