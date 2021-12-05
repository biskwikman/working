

// TODO
// MERGE SPRITE COMPONENTS IF POSSIBLE


import Phaser from 'phaser'
import { 
    IWorld,System,addComponent,addEntity,createWorld 
} from 'bitecs'

import { Position } from '../components/Position'
import { Velocity } from '~/components/Velocity'
import { Player } from '~/components/Player'
import { Npc } from '~/components/Npc'
import { Input } from '~/components/Input'
import { ArcadeSprite, ArcadeSpriteStatic } from '~/components/ArcadeSprite'
import { Animation } from '~/components/Animation'
import { Dialog } from '~/components/Dialog'
import { Collision } from '~/components/Collision'

import { createArcadeSpriteSystem, createArcadeSpriteStaticSystem } from '~/systems/SpriteSystem'
import { createMovementSystem } from '~/systems/MovementSystem'
import { createPlayerSystem } from '~/systems/PlayerSystem'
import { createAnimationSystem } from '~/systems/AnimationSystem'
import { createDialogSystem } from '~/systems/DialogSystem'
import { createCollisionSystem } from '~/systems/CollisionSystem'
import { createKeys } from '~/components/Keys'


// should this go into a component?
enum Textures {
    Player,
    Leslie
}

const textureKeys = ['player','leslie']

export default class GameScene extends Phaser.Scene
{
    private keys!: {
        W: Phaser.Input.Keyboard.Key,
        A: Phaser.Input.Keyboard.Key,
        S: Phaser.Input.Keyboard.Key,
        D: Phaser.Input.Keyboard.Key,
        J: Phaser.Input.Keyboard.Key,
        K: Phaser.Input.Keyboard.Key
    }
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private world?: IWorld
    private background?: Phaser.GameObjects.Rectangle
    private selectionBox?: Phaser.GameObjects.Rectangle
    private spriteGroup?: Phaser.Physics.Arcade.Group
    private player?: Phaser.Physics.Arcade.Sprite
    private arcadeSpriteSystem?: System
    private arcadeSpriteStaticSystem?: System
    private movementSystem?: System
    private playerSystem?: System
    private animationSystem?: System
    private dialogSystem?: System
    private collisionSystem?: System

	constructor()
	{
		super('gamescene')
	}

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.keys = createKeys(this)

    }

	preload()
    {
        this.load.spritesheet(textureKeys[Textures.Player], 'art/main-char-sheet.png', {frameWidth: 32, frameHeight: 48})
        this.load.spritesheet(textureKeys[Textures.Leslie], 'art/talker-front.png', {frameWidth: 32, frameHeight: 48})

    }

    create()
    {
        this.world = createWorld()

        const playerEnt = addEntity(this.world)

        addComponent(this.world,Position,playerEnt)

        Position.x[playerEnt] = 100
        Position.y[playerEnt] = 100

        addComponent(this.world,Velocity,playerEnt)
        addComponent(this.world,ArcadeSprite,playerEnt)
        addComponent(this.world,Input,playerEnt)
        addComponent(this.world,Collision,playerEnt)

        ArcadeSprite.texture[playerEnt] = Textures.Player

        addComponent(this.world,Player,playerEnt)
        addComponent(this.world,Animation,playerEnt)

        this.spriteGroup = this.physics.add.group()

        const leslie = addEntity(this.world)

        addComponent(this.world,Dialog,playerEnt)
        addComponent(this.world,Position,leslie)
        Position.x[leslie] = 300
        Position.y[leslie] = 300
        addComponent(this.world,ArcadeSpriteStatic,leslie)
        addComponent(this.world,Npc,leslie)
        addComponent(this.world,Collision,leslie)

        ArcadeSpriteStatic.texture[leslie] = Textures.Leslie

        const spriteStaticGroup = this.physics.add.staticGroup()

        // add selection box 
        this.selectionBox = this.add.rectangle(0,0,32,32,0xffffff,0)

        this.arcadeSpriteSystem = createArcadeSpriteSystem(this.spriteGroup,textureKeys,this.selectionBox)
        this.arcadeSpriteStaticSystem = createArcadeSpriteStaticSystem(spriteStaticGroup,textureKeys)
        this.movementSystem = createMovementSystem()
        this.playerSystem = createPlayerSystem(this.keys)
        this.animationSystem = createAnimationSystem(this,this.spriteGroup,textureKeys)
        this.dialogSystem = createDialogSystem(this)
        this.collisionSystem = createCollisionSystem(this,this.spriteGroup,spriteStaticGroup,this.selectionBox)

    }

    update(t: number, dt: number) {
        if (!this.world)
        {
            return
        }

        this.playerSystem?.(this.world)
        this.movementSystem?.(this.world)
        this.arcadeSpriteStaticSystem?.(this.world)
        this.arcadeSpriteSystem?.(this.world)
        this.animationSystem?.(this.world)
        this.dialogSystem?.(this.world)
        this.collisionSystem?.(this.world)
    }
}
