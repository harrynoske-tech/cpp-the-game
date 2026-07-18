class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {
        const { width, height } = this.scale;

        const loadingText = this.add.text(
            width / 2,
            height / 2 - 30,
            "Loading...",
            {
                fontSize: "28px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        const progressText = this.add.text(
            width / 2,
            height / 2 + 20,
            "0%",
            {
                fontSize: "20px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        this.load.on("progress", (value) => {
            progressText.setText(`${Math.round(value * 100)}%`);
        });
    }

    create() {
        this.scene.start("MenuScene");
    }
}
