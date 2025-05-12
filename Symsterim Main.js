//Allow user input 
const prompt = require('prompt-sync')();
function introStory(){
    console.log("It's been 1,000 years since the land of Symsterim fell. Only a few cities that held artifacts from an ancient civilation were the only areas spared. The sun has stopped shining, leaving only the moon to illuminate the world that is left.\n You are Sindra, one of the warriors of the city of Sakura. Your armor is made from the beasts that prowl beyond the protective radius of the Ring of Hoba. This ring is worn by Queen Naomi at all times. Your sword is a long sword that contains a green orb in its hilt, granting you the power of the wind in each strike.\nLately, it seems as though the power of the Ring of Hoba is fading. The shadowy beasts have left their tracks closer than they've ever been. The queen has asked you to seek help from the nearby city of Medai. As you head to the Northern border of Sakura, you see one of the shadow monsters staring at you. \nThis is where your journey begins. With one deep breath, you draw your sword and step out of the protection of the barrier,\n")
}

//PLAYER STATS
playerHealth = 100

playerMinAttack = 4
playerMaxAttack = 10
playerMinCrit = 1
playerMaxCrit = 6

//PLAYER INVENTORY
items = [
    {name:'Potions', quantity: 10},
    {name:'Placeholder', quantity:5}
]


function useInventory(){
    for (let i = 0; i < (Object.keys(items).length); i++){
console.log(i+1, ".", items[i].name,":", items[i].quantity)
    }

console.log(Object.keys(items).length+1, ". Back")
}

//Determine player's damage
function ranPlayerAttack(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

let getPlayerAttack = ranPlayerAttack(playerMinAttack, playerMaxAttack)

//Generates random number for critical damage chance
function ranPlayerCrit(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

let getPlayerCrit = ranPlayerCrit(playerMaxCrit,playerMaxAttack)


//If player rolls lowest damage and it isn't a critical attack, they miss
//Otherwise determines if the attack is a regular or critical hit
function playerAttack(){
    if (getPlayerAttack == 4 && getPlayerCrit !=3){
        console.log("You missed your attack.")
    }
    else if (getPlayerCrit == 3) {
        console.log("You critically injure the beast, dealing " +getPlayerAttack*1.5+ " damage!")
        enemyDamage += getPlayerAttack*1.5;
    }
    else {
        console.log("You hit the beast, dealing " +getPlayerAttack+ " damage.")
        enemyDamage += getPlayerAttack;
    }
}

//ENEMY INFO
let easyBeastHealth = 50
let mediumBeastHealth = 100
let hardBeastHealth = 150

beastMinAttack = 1
beastMaxAttack = 5
beastMinCrit = 1
beastMaxCrit = 8

//Determine beast's damage
function ranBeastAttack(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

let getBeastAttack = ranBeastAttack(beastMinAttack, beastMaxAttack)

function ranBeastCrit(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

let getBeastCrit = ranBeastCrit(beastMinCrit,beastMaxCrit)

function beastAttack(){
    if (getBeastAttack == 1 && getBeastCrit !=4){
        console.log("The beast lunges at you and misses.")
    }
    else if (getBeastCrit == 3) {
        console.log("The beast hits a weak point in your armor for " +getBeastAttack*1.5+ " damage!")
        playerDamage += getBeastAttack*1.5;
    }
    else {
        console.log("The beast strikes you, dealing " +getBeastAttack+ " damage.")
        playerDamage += getBeastAttack;
    }
}

//COMBAT OPTIONS
function playerChoice(){
    console.log("\n1. Fight\n2. Inventory\n3. Block")
 choice = parseInt(prompt("Select a number: "));

while (choice < 1 || choice >3 ||isNaN(choice))
{
     console.log("\n1. Fight\n2. Inventory\n3. Block")
choice = parseInt(prompt("Select a number: "))
}

switch(choice){
case 1: console.log("\nYou attack with your sword.")
playerAttack()
break;

case 2: console.log("\nYou search your belongings.")
useInventory()
 invChoice = parseInt(prompt("Select a number: "));

while (invChoice < 1 || invChoice >(Object.keys(items).length)+1 ||isNaN(invChoice)){
     for (let i = 0; i < (Object.keys(items).length); i++){
console.log(i+1, ".", items[i].name,":", items[i].quantity)
    }
    console.log(Object.keys(items).length+1, ". Back")
     invChoice = parseInt(prompt("Select a number: "));
}
    if( invChoice <= (Object.keys(items).length))
        {console.log("You used 1 " +items[invChoice-1].name)
            items[invChoice-1].quantity -=1;
        }
        
   else playerChoice();

break;
    

case 3: console.log("\nYou raise your sword to block.")
//Add 
break;
}
}



 


//COUNTERS
let turns = 0
let experience = 0

//COMBAT COUNTERS
let playerDamage = 0
let enemyDamage = 0

//MAIN
function easyBattle(){
    console.log("The beast charges at you, running on all fours. The wind orbs in your armor make it easy to jump out of the way.")
    playerDamage = 0
    enemyDamage = 0
while (enemyDamage <= easyBeastHealth){
    //Generate new random attack/crit numbers each turn
    getPlayerAttack = ranPlayerAttack(playerMinAttack, playerMaxAttack)
    getPlayerCrit = ranPlayerCrit(playerMinCrit,playerMaxCrit)
    getBeastAttack = ranBeastAttack(beastMinAttack, beastMaxAttack)
    getBeastCrit = ranBeastCrit(beastMinCrit,beastMaxCrit)

    playerChoice()
    beastAttack()
   ;
}
console.log("You have defeated the beast.")
turns += 1;
}


introStory();
easyBattle();