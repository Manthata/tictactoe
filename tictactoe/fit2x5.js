let flag = false;
let counter = 25;
let winningLine = null;
const squares = document.querySelectorAll('.square');
const squaresArray = [].slice.call(squares); // IE11対策
const messages = document.querySelectorAll('.message-list li');
const messagesArray = [].slice.call(messages); // IE11対策
const resetBtn = document.querySelector('#reset-btn');


// メッセージの切り替え関数
const setMessage = (id) => {
    messagesArray.forEach((message) => {
        if (message.id === id) {
            message.classList.remove('js-hidden');
        } else {
            message.classList.add('js-hidden');
        }
    });
}


// 勝利判定のパターン関数
const filterById = (targetArray, idArray) => {
    return targetArray.filter((e) => {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2] || e.id === idArray[3] || e.id === idArray[4]);
    });
}
// 勝利判定パターン

//horizontal
const line1 = filterById(squaresArray, ['1-1', '1-2', '1-3', '1-4', '1-5']);
const line2 = filterById(squaresArray, ['2-1', '2-2', '2-3', '2-4', '2-5']);
const line3 = filterById(squaresArray, ['3-1', '3-2', '3-3', '3-4', '3-5']);
const line4 = filterById(squaresArray, ['4-1', '4-2', '4-3', '4-4', '4-5']);
const line5 = filterById(squaresArray, ['5-1', '5-2', '5-3', '5-4', '5-5']);
//vertical
const line6 = filterById(squaresArray, ['1-1', '2-1', '3-1', '4-1', '5-1']);
const line7 = filterById(squaresArray, ['1-2', '2-2', '3-2', '4-2', '5-2']);
const line8 = filterById(squaresArray, ['1-3', '2-3', '3-3', '4-3', '5-3']);
const line9 = filterById(squaresArray, ['1-4', '2-4', '3-4', '4-4', '5-4']);
const line10 = filterById(squaresArray, ['1-5', '2-5', '3-5', '4-5', '5-5']);
// diagonal 
const line11 = filterById(squaresArray, ['1-1', '2-2', '3-3', '4-4', '5-5']);
const line12 = filterById(squaresArray, ['1-5', '2-4', '3-3', '4-2', '5-1']);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11, line12];
// 勝利判定関数
const isWinner = (symbol) => {
    // some: 1つでも条件を満たしていればTrueを返す
    const result = lineArray.some((line) => {
        // every: 全て条件を満たしていればTrueを返す
        const subResult = line.every((square) => {
            if (symbol === 'maru') {
                return square.classList.contains('js-maru-checked');
            } else
            if (symbol === 'batsu') {
                return square.classList.contains('js-batsu-checked');
            }
        });

        if (subResult) { winningLine = line }
        console.log(winningLine, line)

        return subResult;
    });
    return result;
}


// ゲーム終了時の関数
const gameOver = () => {
    // 全てのマスをクリック不可にする
    squaresArray.forEach((square) => {
        square.classList.add('js-unclickable');
    });

    // 勝った時のマス目をハイライトする
    if (winningLine) {
        winningLine.forEach((square) => {
            square.classList.add('js-highLight');
        });
    }

    //　リセットボタン表示
    resetBtn.classList.remove('js-hidden');
}


// ゲームの初期化の関数
const initGame = () => {
    flag = false;
    counter = 25;
    winningLine = null;
    squaresArray.forEach((square) => {
        square.classList.remove('js-maru-checked');
        square.classList.remove('js-batsu-checked');
        square.classList.remove('js-unclickable');
        square.classList.remove('js-highLight');
    });
    setMessage('batsu-turn');
    resetBtn.classList.add('js-hidden');
}
resetBtn.addEventListener('click', function() {
    initGame();
});


//　マスをクリックした時のイベント発火
squaresArray.forEach((square) => {
    square.addEventListener('click', () => {
        if (flag === true) {
            square.classList.add('js-maru-checked');
            square.classList.add('js-unclickable');

            if (isWinner('maru')) {
                setMessage('maru-win');
                gameOver();
                return;
            }

            setMessage('batsu-turn');
            flag = false;

        } else {
            square.classList.add('js-batsu-checked');
            square.classList.add('js-unclickable');

            if (isWinner('batsu')) {
                setMessage('batsu-win');
                gameOver();
                return;
            }

            setMessage('maru-turn');
            flag = true;
        }

        counter--;
        // 引き分け判定
        if (counter === 0) {
            setMessage('draw');
            gameOver();
        }
    });
});

