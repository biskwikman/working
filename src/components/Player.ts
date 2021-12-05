import { 
    defineComponent
} from 'bitecs'

const speed = 250
const diagonalSpeed = speed * (1/1.44)
const scale = 2
const size = {width: 32, height: 32}
const offset = {x: 0, y: 16}

export const State = {speed: speed, diagonalSpeed: diagonalSpeed, scale: scale, size: size, offset: offset}

export const Player = defineComponent()
