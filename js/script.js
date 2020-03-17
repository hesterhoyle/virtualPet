document.getElementById("feed").disabled = true;
document.getElementById("play").disabled = true;
document.getElementById("clean").disabled = true;
document.getElementById("sleep").disabled = true;

var hunger = 10;
var bored = 10;
var sleepy = 10;
var cleanliness = 10;
var maxVal = 10

var statsLow;
var updates;
var check;
var active = false;
var name = "Gull";

var asleep = false;

// start tamagotchi
function tamaStart() {
    if (active == false) {
        name=prompt("Please name your pet!")
        document.getElementById("egg").src="images/seagull.png";
        document.getElementById("statusText").innerHTML=`Your seagull has hatched! Welcome ${name}!`
        document.getElementById("feed").disabled = false;
        document.getElementById("play").disabled = false;
        document.getElementById("clean").disabled = false;
        document.getElementById("sleep").disabled = false;
        document.getElementById("screen").style.backgroundImage = "url('images/day.jpg')"
        active = true;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`;
        statsLow = setInterval(statDown, 20000) //timer to lower stats every 20 seconds
        updates = setInterval(statusUpdate, 10000) //status update changes every 10 seconds
        check = setInterval(checkStats, 2000) //check stats every 3 second
    }
}

//hunger down
function statDownHunger() {
    if (hunger > 0) {
        hunger = hunger - 1;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`;
    }
}
//happy down
function statDownBored() {
    if (bored > 0) {
        bored = bored - 1;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`;
    }
}
//energy down
function statDownSleepy() {
    if (sleepy > 0) {
        sleepy = sleepy - 1;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`;
    }
}
//clean down
function statDownClean() {
    if (cleanliness > 0) {
        cleanliness = cleanliness - 1;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`;
    }
}
//function to call all statdown functions, for use in timer
function statDown() {
    statDownHunger();
    statDownBored();
    statDownSleepy();
    statDownClean();
}

//button press to feed pet but lowers clean
function foodTime() {
    clearInterval(check)
    document.getElementById("statusText").innerHTML=`${name} is grateful for the food!`;
    document.getElementById("egg").src="images/seagullEat.png";
    setTimeout(function() {check = setInterval(checkStats, 2000);}, 5000);
    if (hunger >= (maxVal - 5) && cleanliness >= 3) {
        hunger = maxVal;
        cleanliness = cleanliness - 3;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`;
    } else if (hunger >= (maxVal - 5) && cleanliness <= 3) {
        hunger = maxVal;
        cleanliness = 0;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`;
    } else if (hunger <= (maxVal - 5) && cleanliness >= 3) {
        hunger = hunger + 5;
        cleanliness = cleanliness - 3;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`;
    } else {
        hunger = hunger + 5;
        cleanliness = 0;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`;
    }
}

//button press to play with pet but lowers hungry
function playTime() {
    clearInterval(check);
    document.getElementById("statusText").innerHTML=`${name} loves to play!`
    document.getElementById("egg").src="images/seagullPlay.png";
    setTimeout(function() {check = setInterval(checkStats, 2000);}, 5000);
    if (bored >= (maxVal - 5) && hunger >= 3) {
        bored = maxVal;
        hunger = hunger - 3;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`;
    } else if (bored >= (maxVal - 5) && hunger <= 3) {
        bored = maxVal;
        hunger = 0;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`;
    } else if (bored <= (maxVal - 5) && hunger >= 3) {
        bored = bored + 5;
        hunger = hunger - 3;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`;
    } else {
        bored = bored + 5;
        hunger = 0;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`;
    }
}

//button press to clean pet but lowers sleepy
function bathTime() {
    clearInterval(check);
    document.getElementById("statusText").innerHTML=`${name} is enjoying the bath!`
    document.getElementById("egg").src="images/seagullBath.png";
    setTimeout(function() {check = setInterval(checkStats, 2000);}, 5000);
    if (cleanliness >= (maxVal - 5) && sleepy >= 3) {
        cleanliness = maxVal;
        sleepy = sleepy - 3;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`
    } else if (cleanliness >= (maxVal - 5) && sleepy <= 3) {
        cleanliness = maxVal;
        sleepy = 0;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`
    } else if (cleanliness <= (maxVal - 5) && sleepy >= 3) {
        cleanliness = cleanliness + 5;
        sleepy = sleepy - 3;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`
    } else {
        cleanliness = cleanliness + 5;
        sleepy = 0;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`
    }
}

//button press to sleep
var t;

function bedTime() {
    if (document.getElementById("feed").disabled == false) {
        clearInterval(updates);
        clearInterval(check);
        asleep = true;
        document.getElementById("feed").disabled = true;
        document.getElementById("play").disabled = true;
        document.getElementById("clean").disabled = true;
        document.getElementById("sleep").innerHTML = "Wake up";
        document.getElementById("screen").style.backgroundImage = "url('images/night.png')"
        document.getElementById("egg").src="images/seagullSleep.png";
        resting = setInterval(sleeping, 1000)
        document.getElementById("statusText").innerHTML=`${name} is fast asleep... zzzzzzzz...`
    } else {
        clearInterval(resting);
        asleep = false;
        updates = setInterval(statusUpdate, 10000);
        check = setInterval(checkStats, 1000);
        document.getElementById("feed").disabled = false;
        document.getElementById("play").disabled = false;
        document.getElementById("clean").disabled = false;
        document.getElementById("screen").style.backgroundImage = "url('images/day.jpg')"
        document.getElementById("egg").src="images/seagull.png";
        document.getElementById("sleep").innerHTML = "Sleep";
        document.getElementById("statusText").innerHTML=`${name} wakes up!`
    }
}

function sleeping() {
    if (sleepy < maxVal) {
        sleepy = sleepy + 1;
        document.getElementById("statusVar").innerHTML = `Hunger: ${hunger}, Happy: ${bored}, Energy: ${sleepy}, Clean: ${cleanliness}`
    }
}

//function for random status updates
function statusUpdate() {
    update = Math.ceil(Math.random()*7);
    switch(update) {
        case 1:
            document.getElementById("statusText").innerHTML=`${name} is thinking about chips...`
            break;
        case 2:
            document.getElementById("statusText").innerHTML=`${name} is wandering aimlessly!`
            break;
        case 3:
            document.getElementById("statusText").innerHTML=`${name} is looking at you adoringly!`
            break;
        case 4:
            document.getElementById("statusText").innerHTML=`It looks like ${name} would like to be pet...`
            break;
        case 5:
            document.getElementById("statusText").innerHTML=`Maybe ${name} would like to chat with you?`
            break;
        case 6:
            document.getElementById("statusText").innerHTML=`${name} likes playing games with you!`
            break;
        case 7:
            document.getElementById("statusText").innerHTML=`${name} is thinking about stealing some ice cream!`
            break;
    }
}

//function to check stats of pet
function checkStats() {
    if (asleep == true) {
        document.getElementById("egg").src="images/seagullSleep.png";
    } else {
        if (hunger < 3 || bored < 3 || sleepy < 3 || cleanliness < 3) {
            document.getElementById("egg").src="images/seagullRAWR.png";
            document.getElementById("statusText").innerHTML=`${name} is NOT very happy!`
        } else {
            document.getElementById("egg").src="images/seagull.png";
        }
    }
}


// var hunger = 10;
// var bored = 10;
// var sleepy = 10;
// var cleanliness = 10;

// function startTimer() {
//     return Math.round(Math.random() * (20000 - 5000) + 5000);
// }

