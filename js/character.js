class Character {
    constructor(name, hp, dmg, mana) {
        this.name = name;   //ex: 'Ulder'
        this.hp = hp;       //lifepoints
        this.dmg = dmg;     //damages on target
        this.mana = mana;   //special attack points
        this.status = 'playing'; //ex: 'playing', 'winner' or 'loser'
        this.shield = 0;    //Protection bonus
    }

    takeDamage(dmg) {
        if (this.status === 'playing') {
            const reduceDamage = dmg - this.shield;
            if (reduceDamage > 0) this.hp -= reduceDamage;
            if (this.hp <= 0) this.status = 'loser';
            if (this.hp < 0) this.hp = 0;
        }
    }

    dealDamage(victim) {
        if (victim.hp > 0) {
            victim.takeDamage(this.dmg);

            const sentence1 = `${this.name} is attacking ${victim.name}.\n`;
            const sentence2 = `He deals him ${this.dmg} damages.\n`;
            const sentence3 = `${victim.name} has ${victim.hp} lifepoints left.`;
            console.log(`${sentence1}${sentence2}${sentence3}`);
        }
    }

    // specialDamage(victim) {
    // }
}