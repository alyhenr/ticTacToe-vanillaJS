const App = {
  // selected elements from the DOM:
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuOptions: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),

  },

  state: {
    currentPlayer: 1,
    // 3x3 base for squares id's
    grid: Array(3).fill("*").map(() => Array(3).fill("*")),
    gameOn: true,
  },

  init() {
    App.registerEventListeners();
  },

  registerEventListeners() {
    // Toggle the menu
    App.$.menu.addEventListener("click", (ev) => {
      App.$.menuOptions.classList.toggle("hidden");
    });

    // Reset button
    App.$.resetBtn.addEventListener("click", () => {
      location.reload();
    });

    // New Round button
    App.$.newRoundBtn.addEventListener("click", () => { });

    // Click on the squares
    [...App.$.squares].forEach(
      (square, index) => square
        .addEventListener('click', App.handleClick(square, index)));
  },

  handleClick(square, index) {
    // Add unique id --> Using a 3x3 matriz model
    const row = Math.floor(index / 3);
    const column = index - 3 * row;
    const id = `${row}-${column}`;
    square.id = id;
    //Add event listener
    square.addEventListener("click", (ev) => {
      // In case it was already clicked, return
      if (ev.currentTarget.hasChildNodes()) {
        return;
      }

      // In case one of the players has won
      if (!App.state.gameOn) {
        return;
      }

      const currentPlayer = App.state.currentPlayer;
      const icon = document.createElement("i");

      if (currentPlayer === 1) {
        icon.classList.add("fa-solid", "fa-x", "yellow");
        App.markGrid("X", row, column);
      } else {
        icon.classList.add("fa-solid", "fa-o", "turquoise");
        App.markGrid("O", row, column);
      }

      ev.currentTarget.replaceChildren(icon);

      App.state.currentPlayer = App.state.currentPlayer === 1 ? 2 : 1;
    })
  },

  markGrid(item, row, column) {
    App.state.grid[row][column] = item;

    // Check if the player has won:
    // 1. Checking the row:
    const rowStatus = App.state.grid[row].filter((square) =>
      square === item);
    // 2. Checking the column:
    const columnStatus = App.state.grid.filter((square) =>
      square[column] === item);
    // 3. Checking diagonals:
    const diagPrincipalStatus = App.state.grid.map(
      (square, index) => square[index]
    ).filter(square => square === item);
    const diagSecStatus = App.state.grid.map(
      (square, index) => square[square.length - 1 - index]
    ).filter(square => square === item);

    const sequences =
      [rowStatus, columnStatus, diagPrincipalStatus, diagSecStatus]
        .map(sequence => sequence.length);

    if (sequences.includes(3)) {
      App.state.gameOn = false;
      App.finishGame();
    }
  },

  finishGame() {
    console.log("Game Over");
  },
};

window.addEventListener("load", App.init);
