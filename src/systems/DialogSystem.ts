import { 
    defineQuery,
    defineSystem
} from 'bitecs'

import { DialogBoxState,Dialog } from '~/components/Dialog'
import { Input,Keys } from '~/components/Input'
import { Collision,Overlapped } from '~/components/Collision'

export const createDialogSystem = (scene: Phaser.Scene) => {
    
    const query = defineQuery([Dialog])

    const dialogContainer = scene.add.container(40, scene.scale.height * 0.75)
    const background = scene.add.rectangle(0,0,scene.scale.width - 80,scene.scale.height * 0.2,0x0c6ceb).setOrigin(0)
    const textObj = scene.add.text(0, 10, 'sup').setWordWrapWidth(background.width * 0.7)
    dialogContainer.add([background,textObj])
    dialogContainer.visible = false

    // const typewriteText = (text: string) => {
    //     textObj.text = ''
    //     const length = text.length
    //     let i = 0
    //     scene.time.addEvent({
    //         callback: () => {
    //             textObj.text += text[i]
    //             ++i
    //         },
    //         repeat: length -1,
    //         delay: 50
    //     })
    // }

    return defineSystem(world => {
        const entities = query(world)

        textObj.x = (background.displayWidth / 2) - (textObj.width / 2)
        textObj.y = (background.displayHeight / 2) - (textObj.height / 2)

        for (let i = 0; i < entities.length; ++i) 
        {
            const id = entities[i]
            const actions = Input.keys[id]
            const dialogBox = Dialog.dialogBox[id]
            const overlapped = Collision.overlap[id]
            switch (true) 
            {
                case actions === Keys.Select && dialogBox === DialogBoxState.closed && overlapped === Overlapped.Yes: 
                    dialogContainer.visible = true
                    Dialog.dialogBox[id] = DialogBoxState.open
                    break

                case actions === Keys.Select && dialogBox === DialogBoxState.open:
                    dialogContainer.visible = false
                    Dialog.dialogBox[id] = DialogBoxState.closed
                    break
        }
        }
        return world
    })
}