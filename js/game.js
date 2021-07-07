class Game {
    constructor() {
        this.users = {};
        this.losers = [];
        //const {player} = this.users;
        this.turnLeft = 10; //tours restants
    }

    newTurn() {
        if (this.turnLeft > 0 && this.users !== null) {
            this.playersAlive();
            this.turn = new Turn(this.users);
            this.turn.startTurn();
            this.turnLeft -= 1;
        }
        else if (this.turnLeft === 0 && this.users !== null) {
        }
    }

    watchStats() {
        Object.values(this.users).map(x => {
            console.log(`PLAYER: ${x.name}\nClass: ${x.constructor.name}\nStatus: ${x.status}\nHP: ${x.hp}\DMG: ${x.dmg}\nnMana: ${x.mana}\n*****************\n`);
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
        const usersLength = Object.values(this.users).length;
        for (let i = 0; i < usersLength; i++) {
            this.turn.play();
        }
    }

    watchWinner() {
        console.log(`**********\nEND of game!\n**********`);
        let winner = {name: "", hp: 0};
        Object.values(this.users).map(x => {
            if (x.hp > winnerHp) {
                winner.name = x.name;
                winner.hp = x.hp;
            }
        });
        console.log(`The is ${winner.name}, with ${winner.hp} lifepoints!`);
    }
}

const game = new Game();

/*
=======
CONSOLE
=======

Infos des utilisateur
    => game.watchStats();

Créer des personnages
    => game.newAvatar('Grace', Fighter);
    => game.newAvatar('Ulder', Paladin);
    => game.newAvatar('Moana', Monk);
    => game.newAvatar('Draven', Berzerker);
    => game.newAvatar('Carl', Assassin);

Voir les données d'un personnage
    => game.users['Grace'];

Lancer un tour
    => game.newTurn();

Lancer les coups
    => let turn = game.newTurn(); game.turn.play();
*/