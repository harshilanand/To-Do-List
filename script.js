// IEFE
(() => {
  // state variables
  let toDoListArray = [];
  // ui variables
  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input");
  const ul = document.querySelector(".toDoList");

  // event listeners
  form.addEventListener('submit', e => {
    // prevent default behaviour - Page reload
    e.preventDefault();
    // give item a unique ID
    let itemId = String(Date.now());
    // get/assign input value
    let toDoItem = input.value;
    //pass ID and item into functions
    addItemToDOM(itemId , toDoItem);
    addItemToArray(itemId, toDoItem);
    // clear the input box. (this is default behaviour but we got rid of that)
    input.value = '';
  });

  ul.addEventListener('click', e => {
    let id = e.target.getAttribute('data-id')
    if (!id) return // user clicked in something else
    //pass id through to functions
    removeItemFromDOM(id);
    removeItemFromArray(id);
  });

  ul.addEventListener('change', e => {
    if (e.target.type === 'checkbox') {
      const listItem = e.target.parentElement;
      if (e.target.checked) {
        listItem.classList.add('checked');
      } else {
        listItem.classList.remove('checked');
      }
    }
  });

  // functions
  function addItemToDOM(itemId, toDoItem) {
    // create a checkbox input
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute('data-id', itemId);

    // create a label for the checkbox
    const label = document.createElement('label');
    label.innerText = toDoItem;

    // create a div to hold the checkbox and label
    const div = document.createElement('div');
    div.classList.add('item'); // Add a class for styling if necessary
    div.appendChild(checkbox);
    div.appendChild(label);

    // add div to the DOM
    ul.appendChild(div);
  }

  function addItemToArray(itemId, toDoItem) {
    // add item to array as an object with an ID so we can find and delete it later
    toDoListArray.push({ itemId, toDoItem});
    console.log(toDoListArray)
  }

  function removeItemFromArray(id) {
    // create a new toDoListArray with all li's that don't match the ID
    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    console.log(toDoListArray);
  }

})();