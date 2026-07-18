class Button extends Phaser.GameObjects.Container {

    constructor(scene, x, y, width, height, text, callback) {

        super(scene, x, y);

        this.callback = callback;

        this.width = width;
        this.height = height;

        this.shadow = scene.add.rectangle(
            0,
            6,
            width,
            height,
            0x000000,
            0.35
        );

        this.shadow.setOrigin(0.5);

        this.glow = scene.add.rectangle(
            0,
            0,
            width + 10,
            height + 10,
            Theme.Colors.accent,
            0.15
        );

        this.glow.setOrigin(0.5);
        this.glow.setVisible(false);

        this.background = scene.add.rectangle(
            0,
            0,
            width,
            height,
            Theme.Colors.surfaceLight
        );

        this.background.setStrokeStyle(
            2,
            Theme.Colors.accent
        );

        this.label = scene.add.text(
            0,
            0,
            text,
            Theme.Fonts.body
        );

        this.label.setOrigin(0.5);

        this.add([
            this.shadow,
            this.glow,
            this.background,
            this.label
        ]);

        this.setSize(width, height);

        this.setInteractive(
            new Phaser.Geom.Rectangle(
                -width / 2,
                -height / 2,
                width,
                height
            ),
            Phaser.Geom.Rectangle.Contains
        );

        this.on("pointerover", () => {

            this.glow.setVisible(true);

            scene.tweens.add({
                targets: this,
                scaleX: 1.03,
                scaleY: 1.03,
                duration: 120
            });

        });

        this.on("pointerout", () => {

            this.glow.setVisible(false);

            scene.tweens.add({
                targets: this,
                scaleX: 1,
                scaleY: 1,
                duration: 120
            });

        });

        this.on("pointerdown", () => {

            scene.tweens.add({
                targets: this,
                scaleX: 0.96,
                scaleY: 0.96,
                duration: 70
            });

        });

        this.on("pointerup", () => {

            scene.tweens.add({
                targets: this,
                scaleX: 1.03,
                scaleY: 1.03,
                duration: 70
            });

            if (this.callback) {

                this.callback();

            }

        });

        scene.add.existing(this);

    }

}
