new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods:{
        //commencer le jeu
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        //Attaque
        attack: function() {
            var damage = this.calculateDammage(3, 10);
            this.monsterHealth -= damage;
            //ajouter chaque tour en debut de tableau
            this.turns.unshift({
                isPlayer: true,
                text: 'Vous attaquez le Monstre: ' + damage + 'pv'
            })
            //verifier si la partie est fini
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        //attaque speciale
        specialAttack : function(){
            this.monsterHealth -= this.calculateDammage(10, 20);

            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        //condition de soin
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            }else{
                this.playerHealth = 100;
            }
            this.monsterAttacks(); 
        },
        //abandonner
        giveUp: function(){
            if(confirm('Vous avez perdu! Rejouer?')){
                this.startGame();
            } else{
                this.gameIsRunning = false;
            }
            return true;
            
        },
        //Attaque du monstre
        monsterAttacks: function(){
            var damage = this.calculateDammage(5, 10);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Le Monstre vous attaque: ' + damage + 'pv'
            })
        },
        //calcul des points de dommage
        calculateDammage: function(min, max){
            //formule
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        //verifier si il y a un gagnant
        checkWin: function() {
            //si le monstre n'a plus de PV
            if (this.monsterHealth <= 0) {
                if (confirm('Vous avez gagné! Rejouer?')) {
                    this.startGame();
                } else{
                    this.gameIsRunning = false;
                }
                return;
                //si le joueur n'a plus de PV
            } else if (this.playerHealth <= 0) {
                if(confirm('Vous avez perdu! Rejouer?')){
                    this.startGame();
                } else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
})