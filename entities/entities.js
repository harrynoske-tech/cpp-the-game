class Entity extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {

        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.maxHealth = 100;
        this.health = 100;

        this.moveSpeed = 200;

        this.isDead = false;

    }

    takeDamage(amount) {

        if (this.isDead) {
            return;
        }

        this.health -= amount;

        if (this.health <= 0) {

            this.health = 0;

            this.die();

        }

    }

    die() {

        this.isDead = true;

        this.setVelocity(0, 0);

    }

}
