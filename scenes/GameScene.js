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

    let dx = 0;
    let dy = 0;

    if (this.keys.left.isDown) dx -= distance;
    if (this.keys.right.isDown) dx += distance;
    if (this.keys.up.isDown) dy -= distance;
    if (this.keys.down.isDown) dy += distance;

    this.player.x += dx;
    this.player.y += dy;

    // VIP follows player
    const followSpeed = 120 * (delta / 1000);

    const angle = Phaser.Math.Angle.Between(
        this.vip.x,
        this.vip.y,
        this.player.x,
        this.player.y
    );

    const distanceToPlayer = Phaser.Math.Distance.Between(
        this.vip.x,
        this.vip.y,
        this.player.x,
        this.player.y
    );

    if (distanceToPlayer > 60) {

        this.vip.x += Math.cos(angle) * followSpeed;
        this.vip.y += Math.sin(angle) * followSpeed;

    }

    // Mission Complete
    if (Phaser.Geom.Intersects.RectangleToRectangle(
        this.player.getBounds(),
        this.goal.getBounds()
    )) {

        alert("MISSION COMPLETE");

        this.scene.restart();

    }

    // Mission Failed
    if (distanceToPlayer > 250) {

        alert("VIP LOST");

        this.scene.restart();

    }

}
