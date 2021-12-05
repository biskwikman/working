import { 
    exitQuery,
    enterQuery,
    defineQuery,
    defineSystem
} from 'bitecs'

import { Position } from '~/components/Position'
import { Sprite } from '~/components/Sprite'
import { Velocity } from '~/components/Velocity'
import { ArcadeSprite,ArcadeSpriteStatic } from '~/components/ArcadeSprite'
import { State } from '~/components/Player'
import { Input, Direction } from '~/components/Input'
// import { Npc } from '~/components/Npc'

export const createArcadeSpriteStaticSystem = (group: Phaser.Physics.Arcade.StaticGroup, textures: string[]) => {
    const spritesById = new Map<number, Phaser.Physics.Arcade.Sprite>()
    const spriteQuery = defineQuery([Position, ArcadeSpriteStatic])
    const spriteQueryEnter = enterQuery(spriteQuery)
    const spriteQueryExit = exitQuery(spriteQuery)

    return defineSystem(world => {
        const enterEntities = spriteQueryEnter(world)
        for (let i = 0; i < enterEntities.length; i++)
        {
            const id = enterEntities[i]
            const texId = ArcadeSpriteStatic.texture[id]
            const texture = textures[texId]
            const sprite = group.get(Position.x[id], Position.y[id], texture)
            sprite.setScale(2)  // make this a var of each character
            sprite.body.setSize(54, 64)
            sprite.body.setOffset(-10, 8)
            spritesById.set(id, sprite)
        }

        const entities = spriteQuery(world)
        for (let i = 0; i < entities.length; ++i) 
        {
            const id = entities[i]
            const sprite = spritesById.get(id)
            if (!sprite) { continue }
            sprite.setPosition(Position.x[id], Position.y[id])
            sprite.setDepth(sprite.y)
        }

        const exitEntities = spriteQueryExit(world)
        for (let i = 0; i < entities.length; i++)
        {
            const id = exitEntities[i]
            const sprite = spritesById.get(id)

            if (!sprite)
            {
                continue
            }

            group.killAndHide(sprite)
            spritesById.delete(id)
        }

        return world
    })
}

export const createArcadeSpriteSystem = (group: Phaser.Physics.Arcade.Group, textures: string[], selectionBox: Phaser.GameObjects.Rectangle) => {
    const spritesById = new Map<number, Phaser.Physics.Arcade.Sprite>()
    const spriteQuery = defineQuery([Position,Velocity,ArcadeSprite])
    const spriteQueryEnter = enterQuery(spriteQuery)
    const spriteQueryExit = exitQuery(spriteQuery)
    const { scene } = group
    scene.physics.add.existing(selectionBox)

    return defineSystem(world => {
        const enterEntities = spriteQueryEnter(world)
        for (let i = 0; i < enterEntities.length; i++)
        {
            // creates and positions sprite for player
            const id = enterEntities[i]
            const texId = ArcadeSprite.texture[id]
            const texture = textures[texId]
            const sprite: Phaser.Physics.Arcade.Sprite = group.get(Position.x[id], Position.y[id], texture)
            sprite.setScale(State.scale).setCollideWorldBounds(true)
            sprite.body.setSize(State.size.width, State.size.height)
            sprite.body.setOffset(State.offset.x, State.offset.y)
            spritesById.set(id, sprite)
        }

        const entities = spriteQuery(world)
        for (let i = 0; i < entities.length; ++i) 
        {
            const id = entities[i]
            const direction = Input.direction[id]
            const sprite = spritesById.get(id)
            if (!sprite) { continue }
            sprite.setVelocity(Velocity.x[id], Velocity.y[id])
            sprite.setDepth(sprite.y)
            switch (direction) {
                case Direction.Left:
                case Direction.UpLeft:
                case Direction.DownLeft:
                    selectionBox.setPosition(sprite.body.x - 32, sprite.body.y + 16)
                    break
                case Direction.Right:
                    case Direction.UpRight:
                    case Direction.DownRight:
                    selectionBox.setPosition(sprite.body.x + 96, sprite.body.y + 16)
                    break
                case Direction.Up:
                    selectionBox.setPosition(sprite.body.x + 32, sprite.body.y - 32)
                    break
                case Direction.Down:
                    selectionBox.setPosition(sprite.body.x + 32, sprite.body.y + 80)
                    break
            }
        }

        const exitEntities = spriteQueryExit(world)
        for (let i = 0; i < entities.length; i++)
        {
            const id = exitEntities[i]
            const sprite = spritesById.get(id)

            if (!sprite)
            {
                continue
            }

            group.killAndHide(sprite)
            spritesById.delete(id)
        }

        return world
    })
}

export const createSpriteSystem = (scene: Phaser.Scene, textures: string[]) => {
    const spritesById = new Map<number, Phaser.GameObjects.Sprite>()
    const spriteQuery = defineQuery([Sprite,Position])
    const spriteQueryEnter = enterQuery(spriteQuery)
    const spriteQueryExit = exitQuery(spriteQuery)

    return defineSystem(world => {
        const enterEntities = spriteQueryEnter(world)
        for (let i = 0; i < enterEntities.length; i++)
        {
            const id = enterEntities[i]
            const texId = Sprite.texture[id]
            const texture = textures[texId]
            spritesById.set(id, scene.add.sprite(0,0,texture))
        }

        const entities = spriteQuery(world)
        for (let i = 0; i < entities.length; ++i) 
        {
            const id = entities[i]
            const sprite = spritesById.get(id)
            if (!sprite) { continue }
            sprite.x = Position.x[id]
            sprite.y = Position.y[id]
        }

        const exitEntities = spriteQueryExit(world)
        for (let i = 0; i < entities.length; i++)
        {
            const id = exitEntities[i]
            const sprite = spritesById.get(id)

            if (!sprite)
            {
                continue
            }

            sprite.destroy()
            spritesById.delete(id)
        }

        return world
    })
}
