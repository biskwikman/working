import {
    defineComponent,
    Types
} from 'bitecs'

export enum Overlapped {
    No,
    Yes
}

export const Collision = defineComponent({
    collidedSprite: Types.ui8,
    overlap: Types.ui8
})