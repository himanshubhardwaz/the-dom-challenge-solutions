/*
 * Creates pixel art grid
 * @param el DOM Element
 * @param rows Number of rows
 * @param rows Number of cols
 */
function PixelArt(el, rows, cols) {
  // write logic to create pixel art grid.

  let selected = {};

  let isMouseDown = false;

  const element = document.querySelector(el);

  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= rows; i++) {
    const rowParent = document.createElement("div");

    rowParent.classList.add("row");

    for (let j = 1; j <= cols; j++) {

      const rowChild = document.createElement("div");

      rowChild.classList.add("row-children");

      rowChild.dataset.row = i;
      rowChild.dataset.col = j;

      rowParent.appendChild(rowChild);
    }

    fragment.appendChild(rowParent);
  }

  element.appendChild(fragment);

  element.addEventListener('click', onClick);
  element.addEventListener('mousedown', onMouseDown);
  element.addEventListener('mouseup', onMouseUp);
  element.addEventListener('mousemove', onMouseMove);

  function toggleSelect(row, col, toggleEnabled = true) {
    if (selected[`${row}-${col}`] && toggleEnabled) {
      for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
          if (i === Number(row) && j === Number(col)) {
            element.children[i - 1].children[j - 1].classList.remove('selected');
            selected[`${row}-${col}`] = false;
          }
        }
      }
    }

    else {
      for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
          if (i === Number(row) && j === Number(col)) {
            element.children[i - 1].children[j - 1].classList.add('selected');
            selected[`${row}-${col}`] = true;
          }
        }
      }
    }
  }

  function onMouseMove(event) {
    console.log({ isMouseDown })
    if (isMouseDown) {
      const row = event.target.dataset.row;
      const col = event.target.dataset.col;

      if (!row || !col) {
        return
      }

      toggleSelect(row, col, false);
    }
  }

  function onClick(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (!row || !col) {
      return
    }

    toggleSelect(row, col);
  }

  function onMouseDown() {
    isMouseDown = true;
  }

  function onMouseUp() {
    isMouseDown = false;
  }


}
