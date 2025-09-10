
var details =[];
const pwd1 = document.getElementById("password1");
const pwd2 = document.getElementById("password2");
const bar = document.getElementById("bar");
const strengthLabel = document.getElementById("strengthLabel");
const percentLabel = document.getElementById("percent");
const submitBtn = document.getElementById("submitbtn");

function checkStrength(password) {
  let score = 0;

  if (password.length >= 8) score += 20;       
  if (/[a-z]/.test(password)) score += 20;     
  if (/[A-Z]/.test(password)) score += 20;     
  if (/[0-9]/.test(password)) score += 20;     
  if (/[^A-Za-z0-9]/.test(password)) score += 20;

  return score;
}

function updateMeter() {
  let pass = pwd1.value;
  let strength = checkStrength(pass);

  bar.style.width = strength + "%";
  percentLabel.textContent = strength + "%";

  if (strength === 0) {
    bar.style.background = "gray";
    strengthLabel.textContent = "Strength: ";
  } else if (strength <= 40) {
    bar.style.background = "red";
    strengthLabel.textContent = "Strength: Weak";
  } else if (strength < 80) {
    bar.style.background = "orange";
    strengthLabel.textContent = "Strength: Medium";
  } else {
    bar.style.background = "green";
    strengthLabel.textContent = "Strength: Strong";
  }
}
pwd1.addEventListener("input", updateMeter);


function confirmPassword(){
   if (pwd1.value !== pwd2.value) {
    pwd2.setCustomValidity("Passwords do not match");
  } else {
    pwd2.setCustomValidity("");
  }
}

pwd2.addEventListener("input", confirmPassword);

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = form.querySelectorAll("input, select, textarea");
  let userData = {};

  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];

    if (input.type === "file") continue;

    let key;
    if (input.previousElementSibling) {
      key = input.previousElementSibling.innerText.replace(":", "");
      key = "Name";
    } else {
      key = input.name || input.id||"Name";
    }

    userData[key] = input.value.trim();
  }

  
  let storedData = JSON.parse(localStorage.getItem("zohoUserData")) || [];

 
  if (!Array.isArray(storedData)) {
    storedData = [storedData];
  }

 
  storedData.push(userData);

 
  localStorage.setItem("zohoUserData", JSON.stringify(storedData));

  console.log(storedData);

  alert("Account created successfully! Data stored in localStorage.");
  form.reset();
  bar.style.width = "0%";
  percentLabel.textContent = "0%";
  strengthLabel.textContent = "Strength:";
});
