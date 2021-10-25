// Alert players that they are starting the round
window.alert("Welcome to Robot Gladiators!");//
// Player robot stats //
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, "Attack = " + playerAttack, "Health = " + playerHealth);

// Enemy Robot stats //
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"]; 
var enemyHealth = 50;
var enemyAttack = 12;
var enemyMoney = 10;

// fight function statement //
var fight = function(enemyName) {

    // repeat and execute as long as the enemy-robot is alive 
    while(playerHealth > 0 && enemyHealth > 0) {

         // Ask player if they would like to fight or skip //
         var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

         // if player choses to skip
        if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
    
            // confirm player wants to skip and stop loop //
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight/stop loop //
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight!");
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log(playerName + " has " + playerMoney + " coins remaining.");
                window.alert(playerName + " has " + playerMoney + " coins remaining.");
                break;
            }

            // if no (false), ask question again by running fight() again
            else {
                fight();
            }
        }

        // if player choses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT" || promptFight === "Fight")  {  

            //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
            enemyHealth = enemyHealth - playerAttack;

            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                break;
            }   else {
                    window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            playerHealth = playerHealth - enemyAttack;

            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );

            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died! ");
                break;
            }   else {
                    window.alert(playerName + " still has " + playerHealth + " health left.");
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
    // reset player stats //
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    // loop fight with enemy robot //
    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        
            // pick new enemy to fight based on the index of the enemyNames array//
            var pickedEnemyName = enemyNames[i];

            // New enemy health reset//
            enemyHealth = 50;
            fight(pickedEnemyName);
            //debugger;  
        }   
            // if player is not alive, end game //
            else {
                window.alert("Game Over: You have lost your robot in battle!");
                break;
        };  
    };
    // after the loop ends, player is either out of health or enemies to fight so run endGame //
    endGame();
    // play again //
    startGame();
};
// function to end the entire game //
var endGame = function() {
    window.alert("Let's see how you did!");
      // if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } 
        // preferred format for end of game if player loss //
        else {
            window.alert("You ended with a score of " + playerMoney + ".");
        };
    // original way course designed the game //
    //else {
    //    window.alert("You've lost your robot in battle.");
    //}

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
    // restart the game
    startGame();
    } 
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    };
};
// start game when page loads //
startGame();