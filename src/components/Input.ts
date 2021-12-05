import {
    defineComponent,
    Types
} from 'bitecs'

export enum Direction {
    None,
    Left,
    UpLeft,
    Up,
    UpRight,
    Right,
    DownRight,
    Down,
    DownLeft
}

export enum Keys {
    None,
    Select,
    Cancel
}

export const Input = defineComponent({
    direction: Types.ui8,
    keys: Types.ui8
})