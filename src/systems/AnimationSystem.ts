import Phaser from 'phaser'
import { 
    defineSystem,
    defineQuery
 } from "bitecs";

import { Player } from '~/components/Player'
import { ArcadeSprite } from '~/components/ArcadeSprite'
import { Position } from '~/components/Position'
import { Input,Direction } from "~/components/Input";

export const createAnimationSystem = (scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, textures: string[]) => {
    // const spritesById = new Map<number, Phaser.GameObjects.Sprite>()
    const query = defineQuery([Player,ArcadeSprite,Position])
    const fps = 4.5
    return defineSystem(world => {
        const entities = query(world)
        for (let i = 0; i < entities.length; i++)
        {
            const id = entities[i]
            const texId = ArcadeSprite.texture[id]
            const texture = textures[texId]
            const direction = Input.direction[id]
            const sprite = group.getFirstAlive()
            
            switch (direction)
            {

                case Direction.Left:
                    sprite.anims.play('left', true)
                    break

                case Direction.UpLeft:
                    sprite.anims.play('left', true)
                    break

                case Direction.Up:
                    sprite.anims.play('up', true)
                    break

                case Direction.UpRight:
                    sprite.anims.play('right', true)
                    break

                case Direction.Right:
                    sprite.anims.play('right', true)
                    break

                case Direction.DownRight:
                    sprite.anims.play('right', true)
                    break

                case Direction.Down:
                    sprite.anims.play('down', true)
                    break

                case Direction.DownLeft:
                    sprite.anims.play('left', true)
                    break

                default: 
                    sprite.anims.stop()
                    break
            }

            scene.anims.create({
                key: 'left',
                frames: scene.anims.generateFrameNumbers(texture, {frames: [3, 4]}),
                frameRate: fps,
                repeat: -1
            })
            scene.anims.create({
                key: 'right',
                frames: scene.anims.generateFrameNumbers(texture, {frames: [5, 6]}),
                frameRate: fps,
                repeat: -1
            })
            scene.anims.create({
                key: 'down',
                frames: scene.anims.generateFrameNumbers(texture, {frames: [0, 1, 0, 2]}),
                frameRate: fps,
                repeat: -1
            })
            scene.anims.create({
                key: 'up',
                frames: scene.anims.generateFrameNumbers(texture, {frames: [7, 8, 7, 9]}),
                frameRate: fps,
                repeat: -1
            })
            scene.anims.create({
                key: 'idle',
                frames: scene.anims.generateFrameNumbers(texture, {frames: [0]}),
                frameRate: fps,
                repeat: -1
            })
        }
        return world
    })
}