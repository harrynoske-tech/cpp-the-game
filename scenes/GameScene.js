class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    create() {

        const width = this.scale.width;
        const height = this.scale.height;

        this.cameras.main.setBackgroundColor(0x2a2a2a);

        // Create the player
        this.player = new Player(
            this,
            width / 2,
            height / 2
        );

        // Temporary placeholder until sprite is added
        this.playerGraphic = this.add.circle(
            this.player.x,
            this.player.y,
            18,
            0x2ecc71
        );

        this.keys = this.input.keyboard.addKeys({
            up: "W",
            down: "S",
            left: "A",
            right: "D"
        });

    }

    update(time, delta) {

        const speed = this.player.moveSpeed;
        let vx = 0;
        let vy = 0;

        if (this.keys.left.isDown) vx = -speed;
        if (this.keys.right.isDown) vx = speed;
        if (this.keys.up.isDown) vy = -speed;
        if (this.keys.down.isDown) vy = speed;

        this.player.body.setVelocity(vx, vy);
        this.player.body.velocity.normalize().scale(speed);

        this.playerGraphic.x = this.player.x;
        this.playerGraphic.y = this.player.y;

    }

}
