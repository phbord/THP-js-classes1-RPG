class Game {
    constructor() {
        this.users = {};
        this.losers = [];
        this.turnLeft = 10;
        this.turnNumber = 0; //current turn number
        this.winner = { name: "", hp: 0, status: "playing" };

        //this.gameCourse(); //LAUNCH entire game
    }

    newTurn() {
        if (this.turnLeft > 0 && this.users !== null) {
            this.playersAlive();
            this.turn = new Turn(this.users, this.turnNumber);
            this.turn.startTurn();
            this.turnLeft -= 1;
        }
    }

    watchStats() {
        Object.values(this.users).map(x => {
            console.log(`PLAYER: ${x.name}\nClass: ${x.constructor.name}\nStatus: ${x.status}\nHP (lifepoints): ${x.hp}\n`);
            console.log(`DMG (damages): ${x.dmg}\nMana (special attack points): ${x.mana}\n*****************\n\n`);
        });
    }

    newAvatar(name, type) {
        const player = new type(name);
        this.users[player.name] = player;
    }

    playersAlive() {
        Object.values(this.users).map(x => {
            if (x.status === 'loser') {
                this.losers.push(x.name);
                delete this.users[x.name];
            }
        });
    }

    attackPhase() {
        if (this.turn.turnStatus === "active") {
            const usersLength = Object.values(this.users).length;
            for (let i = 0; i < usersLength; i++) {
                this.turn.play();
            }
        }
    }

    gameCourse() {
        while (this.winner.status !== 'winner') {
            this.turnNumber += 1;
            this.newTurn();
            this.attackPhase();
            this.watchWinner();
        }
    }

    watchWinner() {
        if (Object.values(this.users).length === 1 || this.turnLeft === 0) {
            console.log(`**********\nEND of game!\n**********`);
            Object.values(this.users).map(x => {
                if (x.hp > this.winner.hp) {
                    this.winner.name = x.name;
                    this.winner.hp = x.hp;
                };
            });
            this.winner.status = 'winner';
            console.log(`The winner is "${this.winner.name}", with ${this.winner.hp} lifepoints!`);
        }
    }
}

const game = new Game();