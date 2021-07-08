class Monk extends Character {
    constructor(name, hp=8, dmg=2, mana=200) {
        super(name, hp, dmg, mana);
    }

    specialDamage(victim) {
        victim = this;
        const attackName = 'heal';
        this.hp += 8;
        this.mana -= 25;
        if (victim.hp > 0) {
            const sentence1 = `The monk heals himself.\n`;
            const sentence2 = `${victim.name} has ${victim.hp} lifepoints left.`;
            console.log(`${sentence1}${sentence2}`);
        }
    }
}