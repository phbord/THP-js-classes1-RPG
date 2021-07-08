class Paladin extends Character {
    constructor(name, hp=16, dmg=3, mana=160) {
        super(name, hp, dmg, mana);
    }

    specialDamage(victim) {
        const attackName = 'Healing Lighting';
        const damages = 4;
        this.hp += 5;
        this.mana -= 40;
        if (victim.hp > 0) {
            victim.takeDamage(damages);

            const sentence1 = `${this.name} is attacking ${victim.name} whith "${attackName}.\n`;
            const sentence2 = `He deals him ${damages} damages.\n`;
            const sentence3 = `${victim.name} has ${victim.hp} lifepoints left.`;
            console.log(`${sentence1}${sentence2}${sentence3}`);
        }
    }
}