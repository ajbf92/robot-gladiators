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
            if (confirmSkip && playerMoney >= 10) {
                window.alert(playerName + " has chosen to skip the fight!");
                
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log(playerName + " has " + playerMoney + " coins remaining.");
                window.alert(playerName + " has " + playerMoney + " coins remaining.");
                break;
            }
            // check if player has enough money to skip //
            else if (playerMoney < 10) {
                window.alert("You don't have enough money!");
            }

            // if no (false), ask question again by running fight() again
            else {
                fight();
            }
        }

        // if player choses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT" || promptFight === "Fight")  {  

            // generate random damage value based on player's attack power //
            //var damage = randomNumber(playerAttack-3, playerAttack); what the module states//
            var damage = randomNumber(playerAttack - 5, playerAttack);

            //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable //
            enemyHealth = Math.max(0, enemyHealth - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + "hp remaining."
            );

            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                
                // add reward for defeating enemy //
                playerMoney = playerMoney + 20;
                window.alert("You have defeated " + enemyName + "! Here is your reward of 20 coins. You now have a total of " + playerMoney + " coins. Use them wisely!");
                break;
            }   else {
                    window.alert(enemyName + " still has " + enemyHealth + "hp left.");
            }

            // generate random damage value based on player's attack power //
            //var damage = randomNumber(enemyAttack-3, enemyAttack); what the module states//
            var damage = randomNumber(enemyAttack - 5, enemyAttack);
            
            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            playerHealth = Math.max(0, playerHealth - damage);

            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + "hp remaining."
            );

            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died! ");
                break;
            }   else {
                    window.alert(playerName + " still has " + playerHealth + "hp left.");
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
        
            // pick new enemy to fight based on the index of the enemyNames array //
            var pickedEnemyName = enemyNames[i];

            // New enemy health reset //
            enemyHealth = randomNumber(40, 60);
            fight(pickedEnemyName);

            // if player is still alive and we are not at the last enemy in the array //
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                
                // ask if player wants to use the store before next round //
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                
                // if yes, take them to the store() function //
                if (storeConfirm) {
                    shop();
                };   
            };
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
    //startGame();
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

// shop function definition //
var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Welcome to the shop! Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "refill":
        case "Refill":
        case "REFILL":
        if (playerMoney >= 7) {
            window.alert("Refilling player's health by 20hp for 7 coins.");
    
            // increase health and decrease money
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;

            // display new health and money remaining //
            window.alert("Your health is now " + playerHealth + "hp and you have " + playerMoney + " coins remaining.");    
        }
            else {
                window.alert("You don't have enough money!");
        }

            break;
        case "upgrade":
        case "UPGRADE":
        case "Upgrade":
        if (playerMoney >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 coins.");
  
            // increase attack and decrease money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
      
            //display new attack and money remaining //
            window.alert("Your attack is now " + playerAttack + " atk and you have " + playerMoney + " coins remaining.")
        }
            else {
                window.alert("You don't have enough money!"); 
        }
            break;
        case "leave":
        case "LEAVE":
        case "Leave":
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
//function to generate random numeric value//
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max-min + 1) + min);

    return value;
};

// start game when page loads //
startGame();