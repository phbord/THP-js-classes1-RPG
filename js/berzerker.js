class Berzerker extends Character {
    constructor(name, hp=8, dmg=4, mana=0) {
        super(name, hp, dmg, mana);
    }

    specialDamage(victim) {
        const attackName = 'Rage';
        this.dmg += 1;
        this.hp -= 1;
        if (victim.hp > 0) {
            victim.takeDamage(this.dmg);

            const sentence1 = `${this.name} is attacking ${victim.name} whith "${attackName}.\n`;
            const sentence2 = `He deals him ${this.dmg} damages.\n`;
            const sentence3 = `${victim.name} has ${victim.hp} lifepoints left.`;
            console.log(`${sentence1}${sentence2}${sentence3}`);
        }
    }
}