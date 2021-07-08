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
        console.log('this.leftToPlay.length ===> ',this.leftToPlay.length);
        if (this.turnStatus !== "over") {
            let attacker = this.choosePlayer();
            const target = this.chooseTarget(attacker);
            console.log('this.alivePlayers = ',this.alivePlayers);
            console.log('this.targetNames.includes(target) = ',this.targetNames.includes(target));
            console.log('target =',target);
            console.log('attacker =',attacker.name);
            attacker.dealDamage(this.alivePlayers[target]);
        }
        else {
            console.log('This turn is over!');
        }
        console.log('this.leftToPlay.length ===> ',this.leftToPlay.length);
    }

    chooseTarget(attacker) {
        const target = prompt(`It's time for ${attacker.name} to play. Who is your target?`);
        while (!this.targetNames.includes(target)) {
            return this.chooseTarget(attacker);
        }
        return target;
    }

    choosePlayer() {
        if (this.leftToPlay.length > 0) {
            const attacker = shuffle(this.leftToPlay).pop();
            if (attacker.hp > 0) {
                return attacker;
            }
            else {
                delete this.alivePlayers[attacker.name];
                return this.choosePlayer();
            }
        }
        else {
            this.turnStatus = "over";
        }
    }
}

