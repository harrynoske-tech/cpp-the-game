class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    create() {

        this.cameras.main.setBackgroundColor(0x2a2a2a);

        // World size
        this.physics.world.setBounds(0, 0, 3000, 3000);

        // Build map
        const map = new TrainingGround(this);
        map.build();

        // Player
        this.player = this.add.circle(
            1500,
            1500,
            18,
            0x2ecc71
        );

        this.keys = this.input.keyboard.addKeys({
            up: "W",
            down: "S",
            left: "A",
            right: "D"
        });

        this.speed = 250;

        // Camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.4);
        this.cameras.main.setBounds(0, 0, 3000, 3000);

    }

    update(time, delta) {

        const distance = this.speed * (delta / 1000);

        if (this.keys.left.isDown) this.player.x -= distance;
        if (this.keys.right.isDown) this.player.x += distance;
        if (this.keys.up.isDown) this.player.y -= distance;
        if (this.keys.down.isDown) this.player.y += distance;

    }

}
