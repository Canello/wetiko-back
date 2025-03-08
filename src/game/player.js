export class Player {
    constructor(id, lat, long, humanDesign) {
        this.id = id;
        this.lat = lat;
        this.long = long;
        this.health = 1000;
        this.range = 100;
        // humanDesign is some parameter (like a string, or a set of values) that defines the player's design
        // i.e. it's skills effects, etc
        // Using a string for now
        this.humanDesign = humanDesign;
    }

    tick(players) {
        this.magic(players);
        this.soul();
    }

    aura(damage, attacker) {
        const type = this.humanDesign.length % 3;

        switch (type) {
            case 0:
                // Take all damage then reflect some of it
                this.health -= Math.ceil(damage);
                attacker.health -= Math.ceil(damage * 0.25);
            case 1:
                // Reduce damage taken
                this.health -= Math.ceil(damage * 0.75);
            case 2:
                // Random damage multiplier
                this.health -= Math.ceil(damage * (Math.random() + 0.5));
        }
    }

    magic(players) {
        const type = Math.floor(this.humanDesign.length / 2) % 3;

        for (const playerId in players) {
            const enemy = players[playerId];
            const distance = Math.sqrt((this.lat - enemy.lat) ** 2 + (this.long - enemy.long) ** 2);

            if (distance <= this.range) {
                let damage = 0;

                switch (type) {
                    case 0:
                        // Distance based damage (the closer the greater)
                        damage = Math.ceil(10 * (this.range - distance) / this.range);
                        enemy.aura(damage, this);
                    case 1:
                        // Distance based damage (the farthest the greater)
                        damage = Math.ceil(10 * distance / this.range);
                        enemy.aura(damage, this);
                    case 2:
                        // Random damage
                        damage = Math.ceil(10 * Math.random());
                        enemy.aura(damage, this);
                }
            }
        }
    }

    soul() {
        const type = Math.floor(Math.random() * 100) % 10;

        if (type === 0) {
            // Heal
            if (this.health >= 1000) return;
            this.health += 1;
        }
    }
}
