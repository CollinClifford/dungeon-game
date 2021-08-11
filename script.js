const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};
let health = {};

function startGame() {
    health = {
        health: 20,
        sanity: 20
    };
    state = {
        sword: true,
        lamp: true
    };
    showTextNode(1);
};

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

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    } 
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

function getRandomNumber() {
    return Math.floor(Math.random()*10);
}

let btn1 = document.querySelector('#btn-1');
let btn2 = document.querySelector('#btn-2');

btn1.addEventListener('click', () => {
    document.body.style.backgroundImage = "url('img/castle.jpg')"
})

btn2.addEventListener('click', () => {
    document.body.style.backgroundImage = "url('img/1485763.jpg')"
})
//filter

//let the data handle handle the gameplay.  let the engine handle the rendering.

//if/else random encounter

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
            nextText: 3
        },
    ]
    },
    {
        id: 2,
        text: 'The main area is dark.  ',
        options: [
        {
            text: 'use your lamp',
            nextText: 4,
            requiredState: (currentState) => currentState.lamp 
        },
        {
            text: 'continue blidly',
            nextText: 5
        }
    ]
    },
    {
        id: 3,
        text: 'The villiagers poke fun at you for sucking.',
        options: [
        {
            text: 'go back and prove yourself, damnit',
            nextText: 1
        },
        {
            text: 'live a life of quiet embarrassment',
            nextText: 100
        }
    ]
    },
    {
        id: 100,
        text: 'Twenty years down the road the creatures from the castle descend upon the helpless villiagers and take everyone as their prey.',
    },
]

startGame();
