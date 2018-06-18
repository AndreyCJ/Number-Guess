// Game values
let min = 1,
		max = 10,
		winningNum = getRandomNum(min, max),
		guessesLeft = 3,
		trys1,
		trys2;
// UI Elements
const game = document.querySelector('#game'),
			minNum = document.querySelector('.min-num'),
			maxNum = document.querySelector('.max-num'),
			guessBtn = document.querySelector('#guess-btn'),
			guessInput = document.querySelector('#guess-input'),
			message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event
game.addEventListener('mousedown', function(e){
	if(e.target.className === 'play-again'){
		window.location.reload();
	}
})

// Listen for guess
guessBtn.addEventListener('click', function(){
	let guess = parseInt(guessInput.value);

	// validate
	if(isNaN(guess) || guess < min || guess > max){
		setMessage(`Введите число в диапазоне от ${min} до ${max}`, 'red')
	}

	// Check if won
	if(guess === winningNum){
		gameOver(true, `Число ${winningNum} верно! Вы победили!`, 'green');
	} else {
		// Wrong number
		guessesLeft -= 1;

		if(guessesLeft === 0){
			// Game over - lost
			gameOver(false, `Игра окончена, вы проиграли :( <br> Правильный ответ был ${winningNum}`);
		} else {
			guessInput.value = '';
			// Game continues - answer wrong
			if(guessesLeft === 1){
				trys1 = 'попытка';
				trys2 = 'осталась';
			} else if (guessesLeft <= 4){
				trys1 = 'попытки';
				trys2 = 'осталось';
			} else if(guessesLeft <= 10){
				trys1 = 'попыток';
				trys2 = 'осталось';
			}

			// switch(guessesLeft){
			// 	case 1:
			// 		trys1 = 'попытка';
			// 		trys2 = 'осталось';
			// 		break;
			// 	case 10:
			// 	case 9:
			// 	case 8:
			// 	case 7:
			// 	case 6:
			// 	case 5:
			// 		trys1 = 'попыток';
			// 		trys2 = 'осталось';
			// 		break;
			// 	case 4:
			// 	case 3:
			// 	case 2:
			// 		trys1 = 'попытки';
			// 		trys2 = 'осталась';
			// 	break;
			// }


			setMessage(`Число ${guess} не верно, у вас ${trys2} ${guessesLeft} ${trys1} `, 'red');
			guessInput.style.borderColor = 'red';
		}

		if(isNaN(guess)){
			guessesLeft += 1;
			setMessage(`Введите число`, 'red');
			guessInput.style.borderColor = 'red';
		}
	}
});

// Set message
function setMessage(msg, color){
	message.style.color = color;
	message.innerHTML = msg;
}

// Game over
function gameOver(won, msg){

	let color;
	won === true ? color = '#03AB00' : color = 'red';

	// Disable input
	guessInput.disabled = true;
	// Change border color
	guessInput.style.borderColor = color;
	// Change text color
	message.style.color = color;
	// You won
	setMessage(msg);

	// Play again?
	guessBtn.value = 'ЗАНОВО';
	guessBtn.className += 'play-again';
}

// get winning number
function getRandomNum(min, max){
	return Math.floor(Math.random()*(max-min+1)+min);
}