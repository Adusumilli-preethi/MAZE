
class Maze {
    constructor(size) {
        this.size = size;
        this.grid = [];
        this.start = { x: 0, y: 0 };
        this.end = { x: size - 1, y: size - 1 };
        this.userPosition = { x: 0, y: 0 }; // Starting position of the user
        this.timer = null;
        this.startTime = null;  // Store the start time for calculating time taken
    }

    generateMaze() {
        this.grid = [];
        for (let i = 0; i < this.size; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = Math.random() < 0.2 ? 1 : 0;  // Random walls (20%)
            }
        }
        this.grid[this.start.x][this.start.y] = 0; // Start is always clear
        this.grid[this.end.x][this.end.y] = 0; // End is always clear
    }

    drawMaze() {
        const mazeElement = document.getElementById("maze");
        mazeElement.innerHTML = "";
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");

                // Draw walls
                if (this.grid[i][j] === 1) {
                    cell.classList.add("wall");
                }

                // Draw start and end
                if (i === this.start.x && j === this.start.y) {
                    cell.classList.add("start");
                } else if (i === this.end.x && j === this.end.y) {
                    cell.classList.add("end");
                }

                // Draw user's position (yellow square)
                if (i === this.userPosition.x && j === this.userPosition.y) {
                    cell.classList.add("user");
                }

                mazeElement.appendChild(cell);
            }
        }
    }

    startTimer() {
        this.startTime = Date.now();  // Store the start time when timer starts
        this.timer = setInterval(() => {
            const timerElement = document.getElementById("timer");
            const timeElapsed = Math.floor((Date.now() - this.startTime) / 1000); // Calculate elapsed time
            timerElement.textContent = `Time: ${timeElapsed}s`;
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    moveUser(direction) {
        let newX = this.userPosition.x;
        let newY = this.userPosition.y;

        if (direction === 'up' && newX > 0 && this.grid[newX - 1][newY] === 0) {
            newX--;
        } else if (direction === 'down' && newX < this.size - 1 && this.grid[newX + 1][newY] === 0) {
            newX++;
        } else if (direction === 'left' && newY > 0 && this.grid[newX][newY - 1] === 0) {
            newY--;
        } else if (direction === 'right' && newY < this.size - 1 && this.grid[newX][newY + 1] === 0) {
            newY++;
        }

        // If the user reaches the end
        if (newX === this.end.x && newY === this.end.y) {
            this.stopTimer();
            const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);  // Calculate total time
            alert(`Congratulations! You completed the maze in ${timeTaken} seconds.`);
            location.reload(); // Refresh the page after the user clicks OK on the alert
        }

        // Update the user's position
        this.userPosition = { x: newX, y: newY };
        this.drawMaze(); // Redraw the maze after movement
    }
}

const maze = new Maze(20);
maze.generateMaze();
maze.drawMaze();
maze.startTimer();

document.getElementById("generate-maze").addEventListener("click", () => {
    const size = parseInt(document.getElementById("maze-size").value);
    maze.size = size;
    maze.generateMaze();
    maze.drawMaze();
    maze.startTimer();
});

// Event listener for keyboard movement
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        maze.moveUser("up");
    } else if (event.key === "ArrowDown") {
        maze.moveUser("down");
    } else if (event.key === "ArrowLeft") {
        maze.moveUser("left");
    } else if (event.key === "ArrowRight") {
        maze.moveUser("right");
    }
});
