class PreloadScene extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {

        this.load.image(
            "hotel-arrival",
            "assets/backgrounds/hotel-arrival.png"
        );

        this.load.image(
    "police-hq",
    "assets/backgrounds/police-hq.png"
);

        // Bodyguard
        this.load.image(
            "bodyguard-front",
            "assets/sprites/player/bodyguard_front.png"
        );

        this.load.image(
            "bodyguard-back",
            "assets/sprites/player/bodyguard_back.png"
        );

        this.load.image(
            "bodyguard-left",
            "assets/sprites/player/bodyguard_left.png"
        );

        this.load.image(
            "bodyguard-right",
            "assets/sprites/player/bodyguard_right.png"
        );

        // Civilians
        this.load.image(
            "civilian-left",
            "assets/sprites/civilians/civilian_left.png"
        );

        this.load.image(
            "civilian-right",
            "assets/sprites/civilians/civilian_right.png"
        );

    }

    create() {

        this.scene.start("MenuScene");

    }

}
