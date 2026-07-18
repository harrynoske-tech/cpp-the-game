class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    create() {

        this.cameras.main.setBackgroundColor(0x111111);

        // Background
        this.background = this.add.image(0, 0, "hotel-arrival");
        this.background.setOrigin(0, 0);

        // Player
        this.player = this.add.circle(320, 650, 16, 0x2ecc71);

        // VIP
        this.vip = this.add.circle(380, 650, 16, 0x3498db);
        // Civilians
this.civilians = [];

for (let i = 0; i < 10; i++) {

    const civilian = this.add.circle(
        Phaser.Math.Between(120, 760),
        Phaser.Math.Between(120, 720),
        10,
        0xffffff
    );

    civilian.targetX = Phaser.Math.Between(100, 760);
    civilian.targetY = Phaser.Math.Between(100, 720);

    this.civilians.push(civilian);

}

        // Hotel entrance (goal)
        this.goal = this.add.rectangle(
            690,
            180,
            160,
            70,
            0x00ff00,
            0.25
        );

        this.speed = 250;

        this.keys = this.input.keyboard.addKeys({
            up: "W",
            down: "S",
            left: "A",
            right: "D"
        });

        this.vipSpeed = 70;

        this.missionComplete = false;

    }

    update(time, delta) {

        if (this.missionComplete) {
            return;
        }

        // ------------------------
        // Player Movement
        // ------------------------

        const distance = this.speed * (delta / 1000);

        if (this.keys.left.isDown) this.player.x -= distance;
        if (this.keys.right.isDown) this.player.x += distance;
        if (this.keys.up.isDown) this.player.y -= distance;
        if (this.keys.down.isDown) this.player.y += distance;

        // ------------------------
        // VIP walks toward entrance
        // ------------------------

        const vipAngle = Phaser.Math.Angle.Between(
            this.vip.x,
            this.vip.y,
            this.goal.x,
            this.goal.y
        );

        this.vip.x += Math.cos(vipAngle) * this.vipSpeed * (delta / 1000);
        this.vip.y += Math.sin(vipAngle) * this.vipSpeed * (delta / 1000);

        // ------------------------
// Civilian AI
// ------------------------

for (const civilian of this.civilians) {

    const angle = Phaser.Math.Angle.Between(
        civilian.x,
        civilian.y,
        civilian.targetX,
        civilian.targetY
    );

    civilian.x += Math.cos(angle) * 35 * (delta / 1000);
    civilian.y += Math.sin(angle) * 35 * (delta / 1000);

    if (Phaser.Math.Distance.Between(
        civilian.x,
        civilian.y,
        civilian.targetX,
        civilian.targetY
    ) < 10) {

        civilian.targetX = Phaser.Math.Between(100, 760);
        civilian.targetY = Phaser.Math.Between(100, 720);

    }

}

        // ------------------------
        // Mission Complete
        // ------------------------

        if (Phaser.Math.Distance.Between(
            this.vip.x,
            this.vip.y,
            this.goal.x,
            this.goal.y
        ) < 40) {

            this.missionComplete = true;

            this.add.text(
                250,
                40,
                "MISSION COMPLETE",
                {
                    fontFamily: "Rajdhani",
                    fontSize: "42px",
                    color: "#00ff00"
                }
            );

        }

        // ------------------------
        // VIP Lost
        // ------------------------

        const escortDistance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            this.vip.x,
            this.vip.y
        );

        if (escortDistance > 220) {

            this.missionComplete = true;

            this.add.text(
                290,
                40,
                "VIP LOST",
                {
                    fontFamily: "Rajdhani",
                    fontSize: "42px",
                    color: "#ff3333"
                }
            );

        }

    }

}
