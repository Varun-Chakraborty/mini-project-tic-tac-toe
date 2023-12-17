let board = document.querySelector('.board');
let reset = document.querySelector('.reset');
let blocks = document.querySelectorAll('.box');

function isWinner() {
    const winning_chances = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (const chance of winning_chances) {
        if (blocks[chance[0]].innerText != '') {
            if (blocks[chance[0]].innerText == blocks[chance[1]].innerText) {
                if (blocks[chance[1]].innerText == blocks[chance[2]].innerText) {
                    return [true, blocks[chance[0]], blocks[chance[1]], blocks[chance[2]]];
                }
            }
        }
    };
    return [false];
}

function showWinner() {
    const winnerInfo = isWinner().slice(1);
    winnerInfo.forEach(e => {
        e.style.background = '#000';
    })
    setTimeout(() => {
        winnerInfo.forEach(e => {
            e.style.background = '';
        })
    }, 2000);
}

let i = 0;
function click(element) {
    element.innerText = i++ % 2 == 0 ? 'X' : 'O';
    if (isWinner()[0]) {
        showWinner();
    }
}

function clickHandler(event) {
    const element = event.target;
    if (!isWinner()[0]) {
        click(element);
        element.removeEventListener('click', clickHandler);
    } else {
        showWinner();
    }
}

function addEventListenerToAll() {
    blocks.forEach(element => {
        element.addEventListener('click', clickHandler);
        element.innerText = '';
    });
}

reset.addEventListener('click', () => {
    i = 0;
    addEventListenerToAll()
});

addEventListenerToAll();