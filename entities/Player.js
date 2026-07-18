class Player extends Entity {

    constructor(scene, x, y) {

        super(scene, x, y, "player");

        this.moveSpeed = 250;

        this.armour = 100;

        this.maxArmour = 100;

        this.weapon = null;

    }

    update() {

    }

}
