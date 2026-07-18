class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }

    create() {

        const width = this.scale.width;
        const height = this.scale.height;

        this.cameras.main.setBackgroundColor(Theme.Colors.background);

        this.createBackground(width, height);

        new Title(
            this,
            width / 2,
            150,
            "CPP - THE GAME"
        );

        new Button(
            this,
            width / 2,
            height / 2,
            320,
            70,
            "START GAME",
            () => {
                this.scene.start("GameScene");
            }
        );

    }

    createBackground(width, height) {

        this.grid = this.add.grid(
            width / 2,
            height / 2,
            width * 2,
            height * 2,
            64,
            64,
            0x111111,
            1,
            0x202020,
            0.4
        );

        this.tweens.add({

            targets: this.grid,

            angle: 360,

            duration: 120000,

            repeat: -1

        });

    }

}
