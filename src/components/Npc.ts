import { 
    defineComponent, Types
} from 'bitecs'

const speed = 250
const diagonalSpeed = speed * (1/1.44)
const scale = 2

export const State = {speed: speed, diagonalSpeed: diagonalSpeed, scale: scale}

export const Npc = defineComponent()