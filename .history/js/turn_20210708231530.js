function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function shuffle(arr) {
    const n = arr.length;
    for(let i=0 ; i<n-1 ; ++i) {
    let j = getRandomInt(n);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    };
    return arr;
}


class Turn {
    constructor(users, turnNumber) {
        this.alivePlayers = users;
        this.turnNumber = turnNumber;
        this.leftToPlay = Object.values(this.alivePlayers); //players who didn't attack yet
        this.targetNames = Object.values(this.alivePlayers).map(x => x.name);
        this.turnStatus = "active";
    }

    startTurn() {
        console.log(`It's turn ${this.turnNumber}`);
    }

    //ONE BLOW (for one character)
    play() {
        const attacker = this.choosePlayer();
        if (this.turnStatus !== "over" && attacker.hp > 0) {
            const target = this.chooseTarget(attacker);
            if (target === false) return 'exit';
            //console.log('this.alivePlayers = ',this.alivePlayers);
            //console.log('target =',target);
            //console.log('attacker =',attacker.name);
            this.blow(target, attacker);
        }
        else {
            console.log('This turn is over!');
        }
    }

    chooseTarget(attacker) {
        const target = prompt(`It's time for ${attacker.name} to play. Who is your target?`);
        while (!this.targetNames.includes(target)) {
            if (target === null) {
                return false;
            }
            return this.chooseTarget(attacker);
        }
        return target;
    }

    //Choose a player randomly who didn't play yet
    choosePlayer() {
        if (this.leftToPlay.length > 0) {
            const attacker = shuffle(this.leftToPlay).pop();
            if (attacker.hp > 0) {
                return attacker;
            }
            else {
                delete this.alivePlayers[attacker.name];
                this.choosePlayer();
            }
        }
        else {
            this.endTurn();
        }
    }

    //Choose damage types and hit
    blow(target, attacker) {
        let blowType;
        while (true) {
            blowType = prompt("Please choose an attack type:\n1: Normal\n2: Special\n");
            if (blowType === '1' || blowType === '2') break;
        }
        if (blowType === '1') return attacker.dealDamage(this.alivePlayers[target]);
        if (blowType === '2') return attacker.specialDamage(this.alivePlayers[target]);
    };

    endTurn() {
        this.turnStatus = "over";
        Object.values(this.alivePlayers).map(x => x.shield = 0);
    }
}

