class Character {
    constructor(name, hp, dmg, mana) {
        this.name = name;
        this.hp = hp; //points de vie
        this.dmg = dmg; //dégât sur la cible
        this.mana = mana; //points d'attaques spéciales
        this.status = 'playing'; //'winner' ou 'loser'
    }

    takeDamage(dmg) {
        if (this.status === 'playing') {
            this.hp -= dmg;
            if (this.hp < 0) this.hp = 0;
        }
    }

    dealDamage(victim) {
        if (victim.hp > 0) {
            victim.takeDamage(this.dmg);
            console.log(`X is attacking ${this.name}. He deals him ${this.dmg} damages.\n${this.name} got ${this.hp} lifepoints left`);
        }
    }
}