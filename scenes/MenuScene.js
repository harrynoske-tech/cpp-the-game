class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }

    create() {

        const width = this.scale.width;
        const height = this.scale.height;

        this.cameras.main.setBackgroundColor(Theme.Colors.background);

        new Title(
            this,
            width / 2,
            180,
            "CLOSE PROTECTION"
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

}
