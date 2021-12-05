import { 
    defineQuery,
    defineSystem
} from 'bitecs'

import { Collision, Overlapped } from '~/components/Collision'
import { Player } from '~/components/Player'
// import { CollisionDirection,Npc } from '~/components/Npc'

let objectSelected
export const createCollisionSystem = (
    scene: Phaser.Scene, 
    spriteGroup: Phaser.Physics.Arcade.Group, 
    spriteStaticGroup: Phaser.Physics.Arcade.StaticGroup,
    selectionBox: Phaser.GameObjects.Rectangle) => 
    {
        const bodiesById = new Map<number, Phaser.GameObjects.GameObject>()

        const query = defineQuery([Collision, Player])

        scene.physics.add.collider(spriteGroup,[spriteStaticGroup])
        scene.physics.add.overlap(selectionBox,[spriteStaticGroup], (p,o) => {
            objectSelected = true
        })

        return defineSystem(world => {
            const entities = query(world)
            for (let i = 0; i < entities.length; i++)
            {
                const id = entities[i]
                if (objectSelected === true) {
                    Collision.overlap[id] = Overlapped.Yes
                } else {
                    Collision.overlap[id] = Overlapped.No
                }
                
                objectSelected = false
            }

            return world
        })
    }