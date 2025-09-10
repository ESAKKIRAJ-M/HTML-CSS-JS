let data = JSON.parse(localStorage.getItem("zohoUserData")) || [];


if (data.length === 0) {
  alert("No user found. Please create an account first!");
}

let nameInput = document.getElementById("nameInput");
let passInput = document.getElementById("passInput");
let signInBtn = document.querySelector(".butt");

signInBtn.addEventListener("click", function () {
  let currentName = nameInput.value.trim();
  let currentPass = passInput.value.trim();

  console.log("Entered Name:", currentName);
  console.log("Entered Pass:", currentPass);

  nameInput.style.border = "1px solid gray";
  passInput.style.border = "1px solid gray";


  let found = false;

  for (let i = 0; i < data.length; i++) {
    let user = data[i];

    if (user.Name === currentName && user.password1 === currentPass) {
      found = true;
      break;
    }
  }

  if (found) {
    alert("Sign in successful!");
    nameInput.value = "";
    passInput.value = "";
  } else {
    alert("Invalid username or password!");
    nameInput.style.border = "2px solid red";
    passInput.style.border = "2px solid red";
  }
});
