const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');
const healthBarElement = document.getElementById('health')
const inventoryElement = document.getElementById('inventory')
//changes background
let btn1 = document.querySelector('#btn-1');
let btn2 = document.querySelector('#btn-2');
btn1.addEventListener('click', () => {
    document.body.style.backgroundImage = "url('img/castle.jpg')"
})
btn2.addEventListener('click', () => {
    document.body.style.backgroundImage = "url('img/darkwoods.jpg')"
})
//random 1d10 generator
function getRandomNumber() {
    return Math.floor(Math.random()*10);
}
//declares an empty array to push items into
let state = {}
let inv = [];

//function to start game
function startGame() {
state = {
    sword: true,
    lamp: false,
    holyRelic: false,
    healingPotion: false,
    gold: 0,
    longSword: false,
    shield: false,
    health: 20,
    sanity: 20,
    strength: 10,
    chance: 5
};
    showTextNode(1);
    return state;
};
//moves the game along
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}
//determines whether to show the option based on what's in inventory
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}
//options 
function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    if (nextTextNodeId === 3) {
        alert("You freaking chicken!")
    }
    if (nextTextNodeId === 5 || nextTextNodeId === 4 || nextTextNodeId === 100) {
        alert("Game Over!")
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
    return state
}

//the textNodes for the basic game.
textNodes = [
    {
        id: 1,
        lvl: 2,
        text: 'Before you lies the moldering wooden doors of the castle, metal braces rusted by the sea dusted winds.  The windows that speckle the towers are lifeless but shutters dance chaotically.',
        options: [
        {
            text: 'enter the castle',
            nextText: 2
        },
        {
            text: 'return to the villiage',
            nextText: 3,
            setState: { sanity: 10 },
        },
    ]
    },
    {
        id: 2,
        text: 'The main area is dark.',

        options: [
        {
            text: 'use your lamp',
            nextText: 4,
            requiredState: (currentState) => currentState.lamp,
            setState: { health: 0 },
            setState: { gold: 1000}
        },
        {
            text: 'continue blindly',
            nextText: 5,
            setState: { health: 0 },
        }
    ]
    },
    {
        id: 3,
        text: 'The villiagers poke fun at you for sucking.  However, they offer you a lamp.',
        options: [
        {
            text: 'Take the lamp and go back and prove yourself, damnit',
            nextText: 1,
            setState: { lamp: true },
        },
        {
            text: 'live a life of quiet embarrassment',
            nextText: 100,
            setState: { health: 0 },
        }
    ]
    },
    {
        id: 100,
        text: 'Twenty years down the road the creatures from the castle descend upon the helpless villiagers and take everyone as their prey.',
        options: [
        {
            text: "restart",
            nextText: -1
        }
    ]
    },
    {
        id: 4,
        text: 'You find you\'re in a room full of riches but your flash light attracts a ghoul who eats your face off.  You die.',

        options : [
            {
                text: "restart",
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'You fall down a pit and die.',
        options : [
            {
                text: "restart",
                nextText: -1
            }
        ]
    },

]

startGame();

//function to push true items into an inventory array
function createInventory (state, inv) {
    for (let item in state) {
        if (state[item] === true) {
            inv.push(item)
        }
    } return inv;
}

createInventory(state, inv)

const healthTemp = `health: ${state.health} 
sanity: ${state.sanity}
strength: ${state.strength} 
luck: ${state.chance}`;
const invTemp = `inventory: 
${inv.join(", ")}
gold: ${state.gold}`;

const healthTemplate = function(healthTemp, state){
    return new Function("return `"+healthTemp +"`;").call(state);
}

healthBarElement.innerText = healthTemplate(healthTemp, state);

const inventoryTemplate = function (invTemp, state) {
    return new Function("return `"+invTemp+"`;").call(state);
}

inventoryElement.innerText = inventoryTemplate(invTemp, state)

//displays stats
// function healthTemp(state) {
// let trying = "";
// trying = `health: ${state.health} 
// sanity: ${state.sanity}
// strength: ${state.strength} 
// luck: ${state.chance}`;
// return trying;
// }
// healthBarElement.innerText = healthTemp(state);
//displays inventory






/////////////////////////////work in progress/////////////////////////////////////
// const monsterEncounter = [
//     {
//         id: 111,
//         text: "You've encountered a thief!",
//         options = [
//             {
//                 text: "Run!"
//             },
//             {
//                 text: "Fight!"
//             }
//         ]
//     },
//     {
//         id: 222,
//         text: "You've encountered a ghoul!",
//         options = [
//             {
//                 text: "Run!"
//             },
//             {
//                 text: "Fight!"
//             }
//         ]
//     }
// ]

module.exports = createInventory
module.exports = selectOption
module.exports = showOption
module.exports = showTextNode
module.exports = startGame
module.exports = getRandomNumber


