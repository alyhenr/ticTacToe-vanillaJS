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
    App.$.newRoundBtn.addEventListener("click", () => {});

    // Click on the squares
    [...App.$.squares].forEach((square, index) => {
      // Add unique id
      square.id = `square-${index}`;
      //Add event listener
      square.addEventListener("click", (ev) => {
        console.log(ev.currentTarget);
        const currentPlayer = App.state.currentPlayer;
        const icon = document.createElement("i");

        if (currentPlayer === 1) {
          icon.classList.add("fa-solid", "fa-x", "yellow");
        } else {
          icon.classList.add("fa-solid", "fa-o", "turquoise");
        }

        ev.currentTarget.replaceChildren(icon);

        App.state.currentPlayer = App.state.currentPlayer === 1 ? 2 : 1;
      });
    });
  },
};

{
  /* <i class="fa-solid fa-x yellow"></i>
<i class="fa-solid fa-o turquoise"></i> */
}

window.addEventListener("load", App.init);
