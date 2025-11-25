let codePlayer = [];
let codeComp = [];
let round = 1;
let turns = 9;
let cNrCPoz = 0; //correct numbers on the correct position
let cNrWPoz = 0; //correct numbers on the wrong position
let textOnScreen = document.querySelector('#text');
let toggle = false; //so that you can only click enter once
let endgame = false; //to trigger endgame text
let x = 0;
let consoleScreen = document.querySelector('#console');

codeGenerator();
console.log(codeComp); //test


function nr(nr) {
    if (codePlayer.length < 4) {
        document.querySelector('#code').innerHTML += ` ${nr}`;
        codePlayer.push(nr); //adds stuff at the end of an array
    }
    
}

/* codeGenerator generates a code where EVERY digit is different, by checking, whether the current digit (i)
is different from all the previous ones, and if not, it randomly generates another number UNTIL its different*/
function codeGenerator() {
    for (let i = 0; i < 4; i++) {
        if (i === 0) {
            codeComp[i] = Math.ceil(Math.random() * 6);
        } else if (i === 1) {
            do {
                codeComp[i] = Math.ceil(Math.random() * 6);
            } while (codeComp[i] === codeComp[i - 1]);
        } else if (i === 2) do {
            codeComp[i] = Math.ceil(Math.random() * 6);
        } while (codeComp[i] === codeComp[i - 1] || codeComp[i] === codeComp[i - 2]);
        else do {
            codeComp[i] = Math.ceil(Math.random() * 6);
        } while (codeComp[i] === codeComp[i - 1] || codeComp[i] === codeComp[i - 2] || codeComp[i] === codeComp[i - 3]);

    }
}

function newTurn() {
    
    toggle = false; //for the 'enter' key
    round++;
    turns--;
    cNrCPoz = 0;
    cNrWPoz = 0;
    if(round<11){
        textOnScreen.innerHTML = `
        <p id="message">The computer has made its choice... guess carefully</p>
        <p>Round <span id="round">1</span> | <span id="turnsLeft">9</span> turns left</p>
        <p>Enter code: 
        <span id="code"></span>
        <span id="theLine">_</span>
        </p>`;
    textOnScreen.style.color = 'rgb(44, 95, 137)';
    document.querySelector('#code').innerHTML = ` `; //empties the code on screen
    codePlayer = []; //empties the code array
    document.querySelector('#round').innerHTML = round; //updates the round
    document.querySelector('#turnsLeft').innerHTML = turns; //updates remaining turns
    bullyPlayer();
    } else{
        textOnScreen.innerHTML = `No more turns.`;
        textOnScreen.style.alignText = 'center';
    }
    
}

//motivational messages for the players
function bullyPlayer() {
    switch (round) {
        case 2: document.querySelector('#message').innerHTML = `Don't worry you have another chance.`;
            break;
        case 3: document.querySelector('#message').innerHTML = 'Or... multiple';
            break;
        case 4: document.querySelector('#message').innerHTML = 'Still not there? Try again, if u dare!';
            break;
        case 5: document.querySelector('#message').innerHTML = `I'm lowkey getting bored...`;
            break;
        case 6: document.querySelector('#message').innerHTML = `You're really not giving up are u?`
            break;
        case 7: document.querySelector('#message').innerHTML = `Tic-tac tic-tac`;
            break;
        case 8: document.querySelector('#message').innerHTML = `You're not gonna make it.`;
            break;
        case 9: document.querySelector('#message').innerHTML = `HA-HA HA-HA-HA`;
            break;
        case 10: document.querySelector('#message').innerHTML = `One last chance... loser.`;
            break;
        default: document.querySelector('#message').innerHTML = `The computer has made its choice... guess carefully`;
    }
}


function verifyCode() {
    /*a check to make sure that the button works only if it hasn't been toggled before
    (because there was a bug where u could endlesly spam enter until u won)
       |         |                                                         */
    toggle = !toggle; //toggle = true
    console.log(toggle);
    if (toggle) { //execute verification
        for (let i = 0; i < 4; i++) {
            if (codePlayer[i] == codeComp[i]) {
                cNrCPoz++; //found a correct number on the correct position
            } else {
                for (let j = 0; j < 4; j++) {
                    if (codePlayer[i] == codeComp[j]) {
                        cNrWPoz += 1; //finding all the numbers on wrong positions
                    }
                }

            }
        }

        if (cNrCPoz == 4) { //winning scenario
            textOnScreen.innerHTML = `<p>Congrats! You guessed the code! :)</p>
           <p>Here's your prize: 🍪 🍪 🍪 🍪 🍪 (many cookies)</p>`;
            textOnScreen.style.color = '#0e8a24';
            document.querySelector('#code-input').style.backgroundColor = '#7ffa96';

            const buttons = document.getElementsByTagName("button");
            for (const button of buttons) {
                button.disabled = true;
            }
        } else if (round >= 10 && cNrCPoz < 4) { //losing scenario
            textOnScreen.innerHTML = `<p>Too late...</p>`;
            textOnScreen.style.color = 'rgb(139, 6, 24)';
            document.querySelector('#code-input').style.backgroundColor = '#ff7878';

            const buttons = document.querySelectorAll(".btn");
            for (const button of buttons) {
                button.disabled = true;
            }
            toggle = true;
            endgame = true;

        } else { //default case
            textOnScreen.innerHTML = `
            <p>You have introduced the code: ${codePlayer[0]} ${codePlayer[1]} ${codePlayer[2]} ${codePlayer[3]}</p>
            <p style = "color:rgb(139, 6, 24);">You have ${cNrCPoz} number(s) in the correct position</p>
            <p style = "color:rgb(139, 6, 24);">And ${cNrWPoz} number(s) in the wrong position</p>`;

            consoleScreen.innerHTML += `<p>${codePlayer}</p>` 
            consoleScreen.innerHTML += `<p>round ${round}: You have ${cNrCPoz} nr on corr. poz</p>`; //test
            consoleScreen.innerHTML += `<p>You have ${cNrWPoz} nr on wrong poz</p>`; 
        }
    } else if(endgame && !toggle){
        document.querySelector('#console-screen').style.display = 'none';
        toggle = true;
        let endText = [`I have warned you.`, `There's no going back.`, `Nice try, loser.`, `Bye-Bye`];
        if(x<4){
            textOnScreen.innerHTML = `<p>${endText[x]}</p>` ;
            x++;
            if(x == 3){
                document.querySelector('#game-over').style.display = 'flex';
                document.querySelector('#game-over').style.animation = 'appear 3s';
            }
        } 
       
    }else{
        toggle = true;
        //nothing happens
    }

}



alert('Welcome to code breaker!');
alert('In this game, you will have to guess a 4 digit pin, set by the computer.');
alert('All digits have to be different');
alert('Beware... You have a limited amount of turns.');
alert('Dont... ')
alert('run out...')
alert('of turns.'); 

