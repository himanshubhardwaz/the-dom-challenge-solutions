/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */
function Star(el, count, callback) {
  // write logic to create star rating utility.
  let current = -1

  const starDiv = document.querySelector(el);

  const frag = document.createDocumentFragment();

  for (let i = 1; i <= count; i++) {
    const node = document.createElement("i");

    node.classList.add("fa")
    node.classList.add("fa-star-o")

    node.dataset.ratingVal = i

    frag.appendChild(node)
  }

  starDiv.appendChild(frag);

  starDiv.addEventListener("mouseover", onMouseOver)
  starDiv.addEventListener("click", onClick)
  starDiv.addEventListener("mouseleave", onMouseLeave)

  function fill(rating) {
    for (let i = 0; i < count; i++) {
      if (i < rating) {
        starDiv.children[i].classList.add('fa-star');
      }
      else {
        starDiv.children[i].classList.remove('fa-star');
      }
    }
  }

  function onMouseOver(e) {
    const currHoveredRating = e.target.dataset.ratingVal;

    if (!currHoveredRating) return;

    fill(currHoveredRating);
  }

  function onClick(e) {
    current = e.target.dataset.ratingVal
    fill(current)
    callback(current);
  }

  function onMouseLeave() {
    fill(current);
  }
}
