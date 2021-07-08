class Character {
    constructor(name, hp, dmg, mana) {
        this.name = name;
        this.hp = hp;       //lifepoints
        this.dmg = dmg;     //dammages on target
        this.mana = mana;   //special attack points
        this.status = 'playing'; //'playing', 'winner' or 'loser'
    }

    takeDamage(dmg) {
        if (this.status === 'playing') {
            this.hp -= dmg;
            if (this.hp <= 0) this.status = 'loser';
            if (this.hp < 0) this.hp = 0;
        }
    }

    dealDamage(victim) {
        if (victim.hp > 0) {
            victim.takeDamage(this.dmg);
            console.log(`${this.name} is attacking ${victim.name}.\nHe deals him ${this.dmg} damages.\n${victim.name} got ${victim.hp} lifepoints left.`);
        }
    }
}