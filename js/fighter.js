class Fighter extends Character {
    constructor(name, hp=12, dmg=4, mana=40) {
        super(name, hp, dmg, mana);
    }

    specialDamage(victim) {
        const attackName = 'Dark Vision';
        const damages = 5;
        this.shield = 2;
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
