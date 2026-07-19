class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    create() {

        this.cameras.main.setBackgroundColor(0x111111);

        // Hotel background
this.hotelBackground = this.add.image(
    0,
    0,
    "hotel-arrival"
);

this.hotelBackground.setOrigin(0, 0);

// Police HQ background
this.policeBackground = this.add.image(
    this.hotelBackground.width,
    0,
    "police-hq"
);

this.policeBackground.setOrigin(0, 0);

// Camera can move across both maps
this.cameras.main.setBounds(
    0,
    0,
    this.hotelBackground.width + this.policeBackground.width,
    this.hotelBackground.height
);

     // Player
this.player = this.add.sprite(
    320,
    650,
    "bodyguard-front"
);

this.player.setScale(0.14);
        this.cameras.main.startFollow(
    this.player,
    true,
    0.12,
    0.12
);

this.cameras.main.setDeadzone(120, 80);

        // VIP
        this.vip = this.add.circle(380, 650, 16, 0x3498db);

        // Civilians
this.civilians = [];

const lanes = [440, 480];

for (let i = 0; i < 4; i++) {

    const movingRight = i % 2 === 0;

    const civilian = this.add.sprite(
        movingRight ? 120 : 900,
        lanes[i % 2],
        movingRight ? "civilian-right" : "civilian-left"
    );

    civilian.setScale(0.12);

    civilian.direction = movingRight ? 1 : -1;
    civilian.minX = 120;
    civilian.maxX = 900;
    civilian.speed = 35;

    this.civilians.push(civilian);

}

            // Suspicious Person
this.suspicious = this.add.circle(
    520,
    500,
    12,
    0xff4444
);

this.suspiciousSpeed = 55;
this.attackStarted = false;
        this.attackDelay = 1500;
this.attackStartTime = null;
this.attackerStopped = false;
this.attackerStopTime = 0;

        // Hotel entrance (goal)
// Hotel entrance (goal)
this.goal = this.add.rectangle(
    769,
    175,
    120,
    40,
    0x00ff00,
    0.25
);

this.goal.setVisible(false);

        this.speed = 250;

        this.keys = this.input.keyboard.addKeys({
    up: "W",
    down: "S",
    left: "A",
    right: "D",
    space: Phaser.Input.Keyboard.KeyCodes.SPACE
});

        this.vipSpeed = 70;

        this.missionComplete = false;
        this.protectionText = this.add.text(
    20,
    20,
    "",
    {
        fontFamily: "Rajdhani",
        fontSize: "26px",
        color: "#00ff88"
    }
);

this.protectionText.setScrollFactor(0);

    }

    update(time, delta) {

       if (this.missionComplete) {

    if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
        this.scene.restart();
    }

    return;
}

        // ------------------------
        // Player Movement
        // ------------------------

        const distance = this.speed * (delta / 1000);

    let moveX = 0;
let moveY = 0;

if (this.keys.left.isDown) {
    moveX = -1;
    this.player.setTexture("bodyguard-left");
}

if (this.keys.right.isDown) {
    moveX = 1;
    this.player.setTexture("bodyguard-right");
}

if (this.keys.up.isDown) {
    moveY = -1;
    this.player.setTexture("bodyguard-back");
}

if (this.keys.down.isDown) {
    moveY = 1;
    this.player.setTexture("bodyguard-front");
}

if (moveX !== 0 || moveY !== 0) {

    const length = Math.sqrt(moveX * moveX + moveY * moveY);

    this.player.x += (moveX / length) * distance;
    this.player.y += (moveY / length) * distance;

}
// ------------------------
// VIP follows player
// ------------------------

const followDistance = 60;

const distanceToPlayer = Phaser.Math.Distance.Between(
    this.vip.x,
    this.vip.y,
    this.player.x,
    this.player.y
);

if (distanceToPlayer > followDistance) {

    const vipAngle = Phaser.Math.Angle.Between(
        this.vip.x,
        this.vip.y,
        this.player.x,
        this.player.y
    );

    this.vip.x += Math.cos(vipAngle) * this.vipSpeed * (delta / 1000);
    this.vip.y += Math.sin(vipAngle) * this.vipSpeed * (delta / 1000);

}

        // ------------------------
// Civilian AI
// ------------------------

for (const civilian of this.civilians) {

    civilian.x += civilian.direction * civilian.speed * (delta / 1000);

    if (civilian.x >= civilian.maxX) {

        civilian.direction = -1;
        civilian.setTexture("civilian-left");

    }

    if (civilian.x <= civilian.minX) {

        civilian.direction = 1;
        civilian.setTexture("civilian-right");

    }

}

        // ------------------------
// Suspicious Person AI
// ------------------------

if (this.attackerStopped) {

    const escapeAngle = Phaser.Math.Angle.Between(
        this.player.x,
        this.player.y,
        this.suspicious.x,
        this.suspicious.y
    );

    this.suspicious.x += Math.cos(escapeAngle) * 120 * (delta / 1000);
    this.suspicious.y += Math.sin(escapeAngle) * 120 * (delta / 1000);

}
else if (!this.attackStarted) {

    const suspiciousAngle = Phaser.Math.Angle.Between(
        this.suspicious.x,
        this.suspicious.y,
        this.vip.x,
        this.vip.y
    );

    const suspiciousDistance = Phaser.Math.Distance.Between(
        this.suspicious.x,
        this.suspicious.y,
        this.vip.x,
        this.vip.y
    );

    if (suspiciousDistance > 80) {

        this.suspicious.x += Math.cos(suspiciousAngle) * this.suspiciousSpeed * (delta / 1000);
        this.suspicious.y += Math.sin(suspiciousAngle) * this.suspiciousSpeed * (delta / 1000);

    }

 if (suspiciousDistance <= 80) {

    if (this.attackStartTime === null) {
        this.attackStartTime = time;
    }

    if (time - this.attackStartTime >= this.attackDelay) {
        this.attackStarted = true;
    }

}
else {

    this.attackStartTime = null;

}

} else {

    const attackAngle = Phaser.Math.Angle.Between(
        this.suspicious.x,
        this.suspicious.y,
        this.vip.x,
        this.vip.y
    );

    this.suspicious.x += Math.cos(attackAngle) * 220 * (delta / 1000);
    this.suspicious.y += Math.sin(attackAngle) * 220 * (delta / 1000);

}

        // ------------------------
// Player intercepts attacker
// ------------------------

if (
    !this.missionComplete &&
    !this.attackerStopped &&
    Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.suspicious.x,
        this.suspicious.y
    ) < 24
) {

    this.attackStarted = false;
    this.attackerStopped = true;
    this.attackerStopTime = time;
    this.suspiciousSpeed = 0;

    this.suspicious.fillColor = 0xffff00;

}
        
// ------------------------
// Suspicious Person reaches VIP
// ------------------------

if (
    !this.attackerStopped &&
    Phaser.Math.Distance.Between(
        this.suspicious.x,
        this.suspicious.y,
        this.vip.x,
        this.vip.y
    ) < 20
) {

    this.missionComplete = true;

    this.add.text(
        250,
        80,
        "MISSION FAILED\nVIP ATTACKED",
        {
            fontFamily: "Rajdhani",
            fontSize: "40px",
            color: "#ff3333",
            align: "center"
        }
    );

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
        "MISSION COMPLETE\n\nPress SPACE to restart",
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

        let status = "";
let colour = "#00ff88";

if (escortDistance < 70) {

    status = "PROTECTION: EXCELLENT";
    colour = "#00ff88";

}
else if (escortDistance < 120) {

    status = "PROTECTION: GOOD";
    colour = "#ffff44";

}
else if (escortDistance < 180) {

    status = "PROTECTION: POOR";
    colour = "#ff9933";

}
else {

    status = "PROTECTION: CRITICAL";
    colour = "#ff3333";

}

this.protectionText.setText(status);
this.protectionText.setColor(colour);

       if (escortDistance > 260) {

    this.missionComplete = true;

    this.add.text(
        250,
        80,
        "MISSION FAILED\nVIP LOST",
        {
            fontFamily: "Rajdhani",
            fontSize: "40px",
            align: "center",
            color: "#ff3333"
        }
    );

}

    }

}
