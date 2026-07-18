class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        this.load.image(
            "hotel-arrival",
            "assets/backgrounds/hotel-arrival.png"
        );

    }

    create() {

        this.scene.start("MenuScene");

    }

}
