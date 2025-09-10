let items = [];

window.onload = function () {
  items = JSON.parse(localStorage.getItem("item")) || [];
  displayItems();

  let input = document.getElementById("itemInput");
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addItem();
    }
  });
};

function addItem() {
  let input = document.getElementById("itemInput");
  let newItem = input.value.trim();

  if (newItem === "") {
    alert("Please enter an item");
    return;
  }

  items.push(newItem);
  localStorage.setItem("item", JSON.stringify(items));
  input.value = "";

  displayItems();
}

function displayItems() {
  let list = document.getElementById("itemList");
  list.innerHTML = "";

  items.forEach(function (item, index) {
    let row = document.createElement("tr");

    let tdItem = document.createElement("td");
    tdItem.textContent = item.toUpperCase();
    tdItem.className = "list";

    let tdAction = document.createElement("td");

    let editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.className = "editBtn";
    editBtn.onclick = function () {
      let updatedItem = prompt("Edit item:", item);
      if (updatedItem !== null && updatedItem.trim() !== "") {
        items[index] = updatedItem.trim();
        localStorage.setItem("item", JSON.stringify(items));
        displayItems();
      }
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.className = "deleteBtn";
    deleteBtn.onclick = function () {
      items.splice(index, 1);
      localStorage.setItem("item", JSON.stringify(items));
      displayItems();
    };

    tdAction.appendChild(editBtn);
    tdAction.appendChild(deleteBtn);

    row.appendChild(tdItem);
    row.appendChild(tdAction);

    list.appendChild(row);
  });
}

function clearItems() {
  if (confirm("Are you sure to clear all items?")) {
    items = [];
    localStorage.setItem("item", JSON.stringify(items));
    displayItems();
  }
}
