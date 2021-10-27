// Alert players that they are starting the round
window.alert("Welcome to Robot Gladiators!");//

// fight function statement //
var fight = function(enemy) {
    window.alert("CHALLENGER is..." + playerInfo.name + "! With an attack = " + playerInfo.attack + " and health = " + playerInfo.health + "hp. VERSUS..." + enemy.name + "! With an attack = " + enemy.attack + " and health = " + enemy.health + "hp!"); 
    // repeat and execute as long as the enemy-robot is alive 
    while(playerInfo.health > 0 && enemy.health > 0) {

        // Ask player if they would like to fight or skip //
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        promptFight = promptFight.toLowerCase();
        // if player choses to skip
        if (promptFight === "skip") {
    
            // confirm player wants to skip and stop loop //
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight/stop loop //
            if (confirmSkip && playerInfo.money >= 10) {
                window.alert(playerInfo.name + " has chosen to skip the fight!");
                
                // subtract money from playerMoney for skipping
                playerInfo.money = playerInfo.money - 10;
                console.log(playerInfo.name + " has " + playerInfo.money + " coins remaining.");
                window.alert(playerInfo.name + " has " + playerInfo.money + " coins remaining.");
                break;
            }
            // check if player has enough money to skip //
            else if (playerInfo.money < 10) {
                window.alert("You don't have enough money!");
            }

            // if no (false), ask question again by running fight() again
            else {
                fight();
            }
        }

        // if player choses to fight, then fight
        if (promptFight === "fight")  {  

            // generate random damage value based on player's attack power //
            //var damage = randomNumber(playerAttack-3, playerAttack); what the module states//
            var damage = randomNumber(playerInfo.attack - 5, playerInfo.attack);

            //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable //
            enemy.health = Math.max(0, enemy.health - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + "hp remaining."
            );

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                
                // add reward for defeating enemy //
                playerInfo.money = playerInfo.money + 20;
                window.alert("You have defeated " + enemy.name + "! Here is your reward of 20 coins. You now have a total of " + playerInfo.money + " coins. Use them wisely!");
                break;
            }   else {
                    window.alert(enemy.name + " still has " + enemy.health + "hp left.");
            }

            // generate random damage value based on player's attack power //
            //var damage = randomNumber(enemyAttack-3, enemyAttack); what the module states//
            var damage = randomNumber(enemy.attack - 5, enemy.attack);
            
            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + "hp remaining."
            );

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died! ");
                break;
            }   else {
                    window.alert(playerInfo.name + " still has " + playerInfo.health + "hp left.");
            }
        }
            // if player did not chose 1 or 2 in prompt//
            else {
                window.alert("You need to choose a valid option. Try again!");
            };
    };    
};

// function to start a new game //
var startGame = function() {

    // now that we created a reset function we can call it so that the player stats are reset and the code is cleaner //
    //reset player stats //
    playerInfo.reset();
    
    // loop fight with enemy robot //
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            
            // pick new enemy to fight based on the index of the enemyNames array //
            var pickedEnemyObj = enemyInfo[i];

            // New enemy health reset //
            pickedEnemyObj.health = randomNumber(50, 70);
            fight(pickedEnemyObj);

            // if player is still alive and we are not at the last enemy in the array //
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                
                // ask if player wants to use the store before next round //
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                
                // if yes, take them to the store() function //
                if (storeConfirm) {
                    shop();
                };   
            };
        }   
            // if player is not alive, end game //
            else {
                window.alert("You have lost your robot in battle!");
                break;
        };  
    };
    // after the loop ends, player is either out of health or enemies to fight so run endGame //
    endGame();
};

// function to end the entire game //
var endGame = function() {
    window.alert("Let's see how you did!");

    // check localStorage for highscore. If its blank, its 0//
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

      // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
            // New high score for player check //
            if (playerInfo.money <= highScore) {
                window.alert("...Unfortunately, you did not beat the current high score of " + localStorage.getItem("highscore") + " set by " + localStorage.getItem("name") + "!");
            } else {
                localStorage.setItem("highscore" , playerInfo.money);
                localStorage.setItem("name" , playerInfo.name);
                window.alert("CONGRATULATION!!! You, " + playerInfo.name.toUpperCase + " hold the new record for ROBOT GLADIATORS! Final score = " + playerInfo.money);
            }
    } 
        // preferred format for end of game if player loss //
    else {
            window.alert("GAME OVER!");
        }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
    // restart the game
    startGame();
    } 
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// shop function definition //
var shop = function() {

    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Welcome to the shop! Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter: 1 to 'REFILL', 2 to 'UPGRADE', or 3 to 'LEAVE' to make a choice.");

    shopOptionPrompt = parseInt(shopOptionPrompt);
    // use switch to carry out action and if player has enough money they can shop again //
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store. See you next time!");
            
            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
  
        // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};
//can purchase more items if they have enough money- to be inserted under “display new health and money remaining”//

//function to generate random numeric value//
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max-min + 1) + min);

    return value;
};
// function to correct bug of "" or Null name // 
var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name + "!");
    return name;
};

//originally at the top of the game but needed the randomNumber function defined so the array below can call on it//
// Player robot stats original //
//var playerName = window.prompt("What is your robot's name?");
//var playerHealth = 100;
//var playerAttack = 10;
//var playerMoney = 10;
// turned into an object to allow for various players to store info // 
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, //comma is needed //
    // was part of the switch above but was added as a function to the object to clean up the code // 
    refillHealth: function() {
        if (playerInfo.money >= 15) {
            window.alert("Refilling player's health by 20hp for 7 coins.");
        this.health += 20;
        this.money -= 15;
        window.alert("Your health is now " + playerInfo.health + "hp and you have " + playerInfo.money + " coins remaining.");
        }
        //re-entershop//
        if (playerInfo.money >= 15) {
            var shopAgainConfirm = window.confirm("Would you like to shop some more? you have " + playerInfo.money + " coins remaining.");
            if (shopAgainConfirm) {
                // go back into shop //
                shop();
                } 
            }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (playerInfo.money >= 15) {
            window.alert("Upgrading player's attack by 6 for 7 coins.");
        this.attack += 6;
        this.money -= 15;
        window.alert("Your attack is now " + playerInfo.attack + " atk and you have " + playerInfo.money + " coins remaining.")
        if (playerInfo.money >= 15) {
                var shopAgainConfirm = window.confirm("Would you like to shop some more? you have " + playerInfo.money + " coins remaining.");
                if (shopAgainConfirm) {
                    // go back into shop //
                    shop();
                    } 
            } }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

// Enemy Robot stats //
//var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"]; 
//var enemyHealth = 50;
//var enemyAttack = 12;
//var enemyMoney = 10;
//turned into an object as well like the player stats //
var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10, 12)
    },
    {
      name: "Amy Android",
      attack: randomNumber(12, 14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(14, 16)
    }
  ];

// start game when page loads //
startGame();