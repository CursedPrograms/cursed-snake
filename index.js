document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('game-board');
    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 5, y: 5 };
    let direction = 'right';

    function createBoard() {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = `${row}-${col}`;
                board.appendChild(cell);
            }
        }
    }

    function drawSnake() {
        snake.forEach(segment => {
            const cell = document.getElementById(`${segment.y}-${segment.x}`);
            cell.classList.add('snake');
        });
    }

    function drawFood() {
        const cell = document.getElementById(`${food.y}-${food.x}`);
        cell.classList.add('food');
    }

    function clearBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.className = 'cell';
        });
    }

    function update() {
        clearBoard();
        drawSnake();
        drawFood();
    }

    function moveSnake() {
        const head = { ...snake[0] };

        switch (direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize)
            };
        } else {
            snake.pop();
        }
    }

    function checkCollision() {
        const head = snake[0];
        return (
            head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize ||
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        );
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }

    function gameLoop() {
        moveSnake();
        if (checkCollision()) {
            alert('Game over!');
            resetGame();
        }
        update();
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        food = { x: 5, y: 5 };
        direction = 'right';
        clearBoard();
        update();
    }

    createBoard();
    update();

    document.addEventListener('keydown', handleKeyPress);

    setInterval(gameLoop, 200);
});