class Assassin extends Character {
    constructor(name, hp=6, dmg=6, mana=20) {
        super(name, hp, dmg, mana);
    }

    specialDamage(victim) {
        const attackName = 'Shadow hit';
        const damages = 7;
        this.shield = 1000;
        this.mana -= 20;
        if (victim.hp > 0) {
            victim.takeDamage(damages);

            const sentence1 = `${this.name} is attacking ${victim.name} whith "${attackName}.\n`;
            const sentence2 = `He deals him ${damages} damages.\n`;
            const sentence3 = `${victim.name} has ${victim.hp} lifepoints left.`;
            console.log(`${sentence1}${sentence2}${sentence3}`);
        }
    }
}