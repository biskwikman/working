import { 
    defineSystem,
    defineQuery
 } from "bitecs"

import { Player } from '~/components/Player'
import { Velocity } from '~/components/Velocity'
import { Input,Direction,Keys } from '~/components/Input'

export function createPlayerSystem(keys: {
    W: Phaser.Input.Keyboard.Key,
    A: Phaser.Input.Keyboard.Key,
    S: Phaser.Input.Keyboard.Key,
    D: Phaser.Input.Keyboard.Key,
    J: Phaser.Input.Keyboard.Key,
    K: Phaser.Input.Keyboard.Key
}) {
    const up = keys.W
    const left = keys.A
    const down = keys.S
    const right = keys.D

    const query = defineQuery([Player,Velocity,Input])
    return defineSystem(world => {
        const entities = query(world)
        for (let i = 0; i < entities.length; i++)
        {
            const id = entities[i]
            // horizontal movement
            if (left.isDown)
            {
                Input.direction[id] = Direction.Left
            }
            else if (right.isDown)
            {
                Input.direction[id] = Direction.Right
            }
            // vertical movement
            if (up.isDown)
            {   
                Input.direction[id] = Direction.Up
            }
            else if (down.isDown)
            {
                Input.direction[id] = Direction.Down
            }
            // diagonal movement
            // Up and left
            if (up.isDown && left.isDown)
            {
                Input.direction[id] = Direction.UpLeft
            }
            // Up and right
            if (up.isDown && right.isDown)
            {
                Input.direction[id] = Direction.UpRight
            }
            // down and right
            if (down.isDown && right.isDown)
            {
                Input.direction[id] = Direction.DownRight
            }
            // down and left
            if (down.isDown && left.isDown)
            {
                Input.direction[id] = Direction.DownLeft
            }
            if (!up.isDown && !down.isDown && !left.isDown && !right.isDown)
            {
                Input.direction[id] = Direction.None
            }
            // interact button
            if (Phaser.Input.Keyboard.JustDown(keys.K)) 
            { 
                Input.keys[id] = Keys.Select
            } else if (!Phaser.Input.Keyboard.JustDown(keys.K)) 
            {
                Input.keys[id] = Keys.None
            }
        }
        return world
    })
}