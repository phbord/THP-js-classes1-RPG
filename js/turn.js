class Turn {
    constructor(users) {
        this.users = users;
        this.userArr = Object.values(this.users);
        this.turnNumber = 0;
        this.turnStatus = "active";
    }

    startTurn() {
        this.turnNumber += 1;
        console.log(`It's turn ${this.turnNumber}`);
    }

    play() {
        let attacker = this.choosePlayer();
        let target = prompt(`It's time for ${attacker.name} to play. Who is your target?`);
        console.log(`${attacker.name} is attacking ${this.users[target]}.`);
        attacker.dealDamage(this.users[target]);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    shuffle(users) {
        const n = Object.values(this.users).length;
        for (const i in users) {
            const j = this.getRandomInt(n);
            let temp = Object.values(this.users)[i];
            Object.values(this.users)[i] = Object.values(this.users)[j];
            Object.values(this.users)[j] = temp;
        }
        return users;
    }

    choosePlayer() {
        if (this.userArr.length > 0) {
            return this.shuffle(this.userArr).pop();
        }
        else {
            this.turnStatus = "over";
        }
    }
}

