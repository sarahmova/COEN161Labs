/**
 * When doing larger programs, I like to create a large object
 * that holds all the functions and variables that I need. That
 * helps me to break up larger applications into containable chunks.
 */
const Crossword = {
  /**
   * State holds all the variables which can change relating to
   * this application. Try to keep this to a minimum. There are
   * some things (like the currently focused element) which you
   * may want to store here, but it may be unnecessary.if you can
   * derive that instead.
   */
  state: {
    currentDirection: "across",
  },
  /**
   * Event handlers defines all the event handlers for this cross word.
   * Just another little grouping.
   */
  eventHandlers: {
    /**
     * @function onInputFocus
     * @param {FocusEvent} event
     *
     *  1. Create a function to handle input focus events.
     *  2. The body of the function should check the current direction
     *      a. If the currentDirection is across, check for a data-across value
     *      b. If the currentDirection is down, check for a data-direction value.
     *  3. If the input has correct dataset value:
     *      a. Remove the highlighted class from all hint elements
     *      b. Get the hint corresponding to the input's current direction
     *      c. Add the class highlighted to the corresponding hint.
     *
     */
    onInputFocus: function (event) {
      // Create some variables so we don't have to type unnecessarily
      const currentDirection = Crossword.state.currentDirection;
      const input = event.currentTarget;
      // 2a. The dataset value of a DOM node checks contains all the attributes
      // that start with data-.input.dataset[currentDirection] checks the input's
      // data- attributes for a data-[currentDirection]. Since currentDirection is
      // in brackets, it's evaluated as either "across" or "down"
      if (input.dataset[currentDirection]) {
        for (const elt of document.querySelectorAll(".hints li.highlighted")) {
          elt.classList.remove("highlighted"); // 3a
        }

        // 3b
        const hint = document.querySelector(
          // this is a nice complex selector that helps us grab a single element.
          // You won't have to write something this complex but it shows how
          // useful ,querySelector is. Without it, we would have had to do a lot
          // of tree traversal on our own
          `.hints ol[data-direction=${currentDirection}] li[value="${input.dataset[currentDirection]}"]`
        );

        hint.classList.add("highlighted"); // 3c
      }
    },

    /**
     * @function onInputBlur
     * @param {FocusEvent} event
     *
     *  1. Create a function to handle input blue events.
     *  2. If the grid element does not contain the element referenced by the currently active element
     *      a. The currently active element can be referenced using document.activeElement
     *      b. To check if a node contains another, use the .contains() method on a DOM node.
     *  3. For each of the li elements with the highlighted class, remove the class highlighted.
     *
     */
    onInputBlur: function (event) {
      // the call to focus() onInputKeydown is an asynchronous call. Wrap the
      // check for the currently active element in a setTimeout so focus() is popped
      // from the callback queue _before_ this anonymous function is run
      setTimeout(function () {
        if (!document.querySelector(".grid").contains(document.activeElement)) {
          for (const elt of document.querySelectorAll(
            ".hints li.highlighted"
          )) {
            elt.classList.remove("highlighted");
          }
        }
      });
    },
    /**
     * @function focusNextInput
     * @param {KeyboardEvent} event
     *
     * 1. Create a function that handles key down events
     * 2. if the key pressed has the value Tab
     *      a. Toggle the current direction from down -> across and vice-versa
     *      b. Call the onInputFocus function with the event parameter
     * 3. Else if the key pressed is a letter and the length of the key is 1
     *      a. Set the value property of the input to the key
     *      b. if the current direction is across
     *          i. The next sibling for the input is in the input's nextElementSibling property
     *          ii. The next sibling be undefined.
     *          iii. If the next sibling is not udnefined, call its focus method
     *      c. if the current direction is across
     *          i. Get a reference to this input's next row
     *              (1) Use the input's parentElement property to get a reference to the parent element (which is the current row)
     *          ii. Find the position of the current square in the current row.
     *              (1) Only iterate through all input and span elements of the current row
     *          iii. Get a reference to every input and span in the nextRow
     *          iv. Focus the next row
     */
    onInputKeyDown: function (event) {
      // we didn't talk about this, but this will prevent the default
      // behavior of the key down which is to focus the next element
      // I will give you anything we haven't covered in HW, Lab, Lecture, or Worksheets
      event.preventDefault();
      const currentDirection = Crossword.state.currentDirection;
      if (event.key === "Tab") {
        if (currentDirection === "across") {
          Crossword.state.currentDirection = "down";
        } else {
          Crossword.state.currentDirection = "across";
        }
        Crossword.eventHandlers.onInputFocus(event);
      } else if (
        event.key.length === 1 &&
        event.key >= "A" &&
        event.key <= "z"
      ) {
        const input = event.currentTarget;
        input.value = event.key;
        if (currentDirection === "across") {
          const next = input.nextElementSibling;
          // won't have a next element sibling if this is the last input in the row
          if (next) {
            next.focus();
          }
        } else if (currentDirection === "down") {
          const nextRow = input.parentElement.nextElementSibling;
          if (nextRow !== null) {
            // find what number child the current input is
            // but don't count the labels since those wouldn't be squares
            let position = 0;
            const allCurrentRowSquares =
              input.parentElement.querySelectorAll("input, span");
            for (let i = 0; i < allCurrentRowSquares.length; i++) {
              if (allCurrentRowSquares[i] === input) {
                position = i;
              }
            }

            const nextRowSquares = nextRow.querySelectorAll("input, span");
            nextRowSquares[position].focus();
          }
        }
      }
    },
  },
  utils: {
    /**
     * @function createGrid
     * @param {Grid} grid
     * @param {Clues} clues
     *
     * 1. Create a function that creates the grid, it takes in two parameters, one for the grid and oen for the clues.
     * 2. Get the number of rows (m) and columns (n) in the grid, a 2D array.
     * 3. Create n row elements. Each row is a section with the class row
     * 4. While creating a row, create each m clumn elements.
     *      a. When creating a column element, check if the current position in the grid is an empty string
     *          i. If it's an empty string, create a span
     *          b. If it's not, create an input element.
     *              i. The input's maxlength property should be 1
     *              ii. For each clue in the clues object, if the clue's row property and column property
     *                      match the current input's row and column, add an event listener for the focus event.
     *                      The callback is the Crossword.eventHandlers.onInputFocus function
     *              iii. An input can match for a clue in both the across and down direction, so make sure to check both
     *              iv. Add a data-currentDirection attribute to the input. The value of the attribute should be the clue number
     *              v. Add event listeners for the keydown and blur events
     *  5. Attach each row to the .grid element
     */
    createGrid: function (grid, clues) {
      const numRows = grid.length;
      const numCols = grid[0].length;
      for (let i = 0; i < numRows; i++) {
        const row = document.createElement("section");
        row.classList.add("row");

        for (let j = 0; j < numCols; j++) {
          // either create span or input
          let elt;
          if (grid[i][j] === "") {
            elt = document.createElement("span");
          } else {
            elt = document.createElement("input");
            elt.maxlength = 1; // only allow 1 character to be typed

            for (const direction of Object.keys(clues)) {
              for (const clueNumber of Object.keys(clues[direction])) {
                if (
                  clues[direction][clueNumber].row === i + 1 &&
                  clues[direction][clueNumber].column === j + 1
                ) {
                  elt.addEventListener(
                    "focus",
                    Crossword.eventHandlers.onInputFocus
                  );
                  elt.dataset[direction] = clueNumber;
                }
              }
            }

            elt.addEventListener(
              "keydown",
              Crossword.eventHandlers.onInputKeyDown
            );
            elt.addEventListener("blur", Crossword.eventHandlers.onInputBlur);
          }
          row.appendChild(elt);
        }

        document.querySelector(".grid").appendChild(row);
      }
    },

    /**
     * @function createHints
     * @param {Clues} clues
     *
     * 1. Create a function that adds hints to the document.
     * 2. For each direction
     *      a. Create an h1 element where the text is thc direction being iterated through
     *      b. Create an ol for each of the clues.
     *      c. Attach a data-direction attribute with the value of direction being iterated through
     *      d. For each clueNumber
     *          i. Create an li element.
     *          ii. Attach the value property to the li element. The value of this property will be the current clueNumber
     *          iii. The textContent of this li is the current clue's hint property
     */
    createHints: function (clues) {
      for (const direction of Object.keys(clues)) {
        const heading = document.createElement("h1");
        heading.textContent = direction;
        const ol = document.createElement("ol");
        ol.dataset.direction = direction;

        for (const clueNumber of Object.keys(clues[direction])) {
          // hint will be clues.across.1
          const li = document.createElement("li");
          li.value = clueNumber; // sets the number shown before each li
          li.textContent = clues[direction][clueNumber].hint;
          ol.appendChild(li);
        }

        document.querySelector(".hints").appendChild(heading);
        document.querySelector(".hints").appendChild(ol);
      }
    },

    /**
     * @function createHintLabels
     * @param {Clues} clues
     *
     * 1. Create a function that makes the labels for each grid element
     * 2. Iterate through each direction of clues
     *      a. For each clueNumber
     *          i. Create a label element and assign it to a variable called label
     *          ii. The text content of this label should be the hint property of the clue
     *          iii. Use the insertBefore method of the current _row_.
     *              (1) insertBefore takes two parameters: 1\ new element being inserted 2\ the element the new element should come before
     *
     */
    createHintLabels: function (clues) {
      for (const direction of Object.keys(clues)) {
        for (const clueNumber of Object.keys(clues[direction])) {
          const hint = clues[direction][clueNumber];
          const row = document.querySelector(`.row:nth-child(${hint.row})`);
          const square = row.querySelector(`:nth-child(${hint.column})`);
          const label = document.createElement("label");
          label.textContent = clueNumber;

          // I would give you this next block of code
          // accounts for some weirdneess in positioning
          label.style.left = `${
            5 * (hint.column - 1) + 0.5 + 0.1 * (hint.column - 1)
          }rem`;
          label.style.top = `0.2rem`;

          row.insertBefore(label, square);
        }
      }
    },
    /**
     * @function revealError
     * @param {Error} err
     *
     * 1. log the error passed in
     * 2. Remove the hidden class from the paragraph element with the error class
     */
    revealError: (err) => {
      console.log(err);
      document.querySelector("p.error").classList.remove("hidden");
    },
  },

  /**
   * @function initializeGrid
   *
   * 1. fetch from the URL provided
   * 2. If the fetch was fulfilled
   *    a. parse the JSON body of the response
   *    b. Call the createGrid, createHints, and createHintLabels functions with the proper variables
   * 3. If the fetch was rejected
   *    a. Call the revealError function
   */
  initializeGrid: function () {
    fetch("https://www.aelahi.dev/api/crossword/puzzle/11-2-2022")
      .then((response) => response.ok && response.json())
      .then((data) => {
        // separate out the grid structure and the hints
        const grid = data.grid;
        const clues = data.clues;

        Crossword.utils.createGrid(grid, clues);
        Crossword.utils.createHints(clues);
        Crossword.utils.createHintLabels(clues);
      })
      .catch(Crossword.utils.revealError);
  },
};

Crossword.initializeGrid();
