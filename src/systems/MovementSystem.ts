import { defineSystem,defineQuery } from "bitecs"

import { Position } from "~/components/Position"
import { Velocity } from "~/components/Velocity"
import { Input,Direction } from "~/components/Input"
import { State } from "~/components/Player"

export function createMovementSystem() {
    const speed = State.speed
    const diagonalSpeed = State.diagonalSpeed
    //define query to get all entities which have pos and vel
    const query = defineQuery([Position,Velocity,Input])

    return defineSystem(world => {
        //entities = all entities which have pos and vel and are in this world
        const entities = query(world)
        for (let i = 0; i < entities.length; ++i)
        {
            const id = entities[i]

            const direction = Input.direction[id]

            switch (direction)
            {
                case Direction.None:
                    Velocity.x[id] = 0
                    Velocity.y[id] = 0
                    break
                
                case Direction.Left:
                    Velocity.x[id] = -speed
                    Velocity.y[id] = 0
                    break

                case Direction.UpLeft:
                    Velocity.x[id] = -diagonalSpeed
                    Velocity.y[id] = -diagonalSpeed
                    break

                case Direction.Up:
                    Velocity.x[id] = 0
                    Velocity.y[id] = -speed
                    break

                case Direction.UpRight:
                    Velocity.x[id] = diagonalSpeed
                    Velocity.y[id] = -diagonalSpeed
                    break

                case Direction.Right:
                    Velocity.x[id] = speed
                    Velocity.y[id] = 0
                    break

                case Direction.DownRight:
                    Velocity.x[id] = diagonalSpeed
                    Velocity.y[id] = diagonalSpeed
                    break

                case Direction.Down:
                    Velocity.x[id] = 0
                    Velocity.y[id] = speed
                    break
                    
                case Direction.DownLeft:
                    Velocity.x[id] = -diagonalSpeed
                    Velocity.y[id] = diagonalSpeed
                    break
            }

            Position.x[id] += Velocity.x[id]
            Position.y[id] += Velocity.y[id]
        }
        return world
    })
}