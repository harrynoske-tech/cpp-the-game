class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    create() {

        this.cameras.main.setBackgroundColor(0x111111);

        // Background
        this.background = this.add.image(
            0,
            0,
            "hotel-arrival"
        );

        this.background.setOrigin(0, 0);

        // Player
        this.player = this.add.circle(
            320,
            600,
            16,
            0x2ecc71
        );

        this.speed = 250;

        this.keys = this.input.keyboard.addKeys({
            up: "W",
            down: "S",
            left: "A",
            right: "D"
        });

        // VIP
        this.vip = this.add.circle(
            380,
            600,
            16,
            0x3498db
        );

        // Mission Area
        this.goal = this.add.rectangle(
            690,
            180,
            160,
            70,
            0x00ff00,
            0.25
        );

    }

    update(time, delta) {

        const distance = this.speed * (delta / 1000);

        if (this.keys.left.isDown) this.player.x -= distance;
        if (this.keys.right.isDown) this.player.x += distance;
        if (this.keys.up.isDown) this.player.y -= distance;
        if (this.keys.down.isDown) this.player.y += distance;

    }

}
