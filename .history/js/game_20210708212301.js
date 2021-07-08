class Game {
    constructor() {
        this.users = {};
        this.losers = [];
        this.turnLeft = 10;
        this.turnNumber = 0; //current turn number
        this.winner = { name: "", hp: 0, status: "playing" };

        //LAUNCH entire game
        this.gameCourse();
    }

    newTurn() {
        if (this.turnLeft > 0 && this.users !== null) {
            this.playersAlive();
            this.turn = new Turn(this.users, this.turnNumber);
            this.turn.startTurn();
            this.turnLeft -= 1;
        }
    }

    newAvatar(name, type) {
        const player = new type(name);
        this.users[player.name] = player;
    }

    generateAvatars() {
        const avatars = [
            { name: 'Grace', type: Fighter },
            { name: 'Ulder', type: Paladin }
        ];
        avatars.map(x => this.newAvatar(x.name, x.type));
    }

    playersAlive() {
        Object.values(this.users).map(x => {
            if (x.status === 'loser') {
                this.losers.push(x.name);
                delete this.users[x.name];
            }
        });
    }

    //Attack phase of one turn
    attackPhase() {
        if (this.turn.turnStatus === "active") {
            const usersLength = Object.values(this.users).length;
            const breaker = 0;
            for (let i = 0; i < usersLength; i++) {
                const currentTurn = this.turn.play();
                if (currentTurn === 'exit') {
                    breaker = 1;
                    break;
                }
            }
            if (breaker === 1) this.turnLeft = 0;
        }
    }

    gameCourse() {
        //Avatars
        //this.generateAvatars();
        //Turns
        while (this.winner.status !== 'winner') {
            this.turnNumber += 1;
            this.newTurn();
            this.attackPhase();
            this.watchWinner();
        }
    }

    watchWinner() {
        if (Object.values(this.users).length === 1 || this.turnLeft === 0) {
            console.log(`************\nEND of game!\n************`);
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

    watchStats() {
        Object.values(this.users).map(x => {
            console.log(`PLAYER: ${x.name}\nClass: ${x.constructor.name}\nStatus: ${x.status}\nHP (lifepoints): ${x.hp}\n`);
            console.log(`DMG (damages): ${x.dmg}\nMana (special attack points): ${x.mana}\n*****************\n\n`);
        });
    }
}

const game = new Game();