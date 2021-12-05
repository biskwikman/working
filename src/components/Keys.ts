

export const createKeys = (scene: Phaser.Scene) => {
    let W,A,S,D,J,K
    W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    S = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    J = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
    K = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

    const Keys = {
        W: W,
        A: A,
        S: S,
        D: D,
        J: J,
        K: K
    }

    return Keys
}