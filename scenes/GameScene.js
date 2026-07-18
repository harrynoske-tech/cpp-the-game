class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    create() {

        this.cameras.main.setBackgroundColor(0x202020);

        const width = this.scale.width;
        const height = this.scale.height;

        this.add.circle(
            width / 2,
            height / 2,
            18,
            0x2ecc71
        );

    }

}
