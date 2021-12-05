import { 
    Types,defineComponent
} from 'bitecs'

export enum DialogBoxState {
    closed,
    open
}

export const Dialog = defineComponent({
    dialogBox: Types.ui8
})