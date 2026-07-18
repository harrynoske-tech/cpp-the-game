class Title extends Phaser.GameObjects.Container {

    constructor(scene, x, y, text) {

        super(scene, x, y);

        const shadow = scene.add.text(4, 4, text, {
            ...Theme.Fonts.title,
            color: "#000000"
        });

        shadow.setOrigin(0.5);
        shadow.setAlpha(0.35);

        const title = scene.add.text(0, 0, text, Theme.Fonts.title);

        title.setOrigin(0.5);

        this.add(shadow);
        this.add(title);

        scene.add.existing(this);

    }

}
