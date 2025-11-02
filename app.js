document.addEventListener("DOMContentLoaded", () => {
  // Parse JSON data into JavaScript objects
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  generateUserList(userData, stocksData);
  registerMainButtons(userData, stocksData);
});
function generateUserList(users, stocks) {
  const userList = document.querySelector(".user-list");
  userList.innerHTML = ""; // clear old list

  users.forEach(({ user, id }) => {
    const li = document.createElement("li");
    li.textContent = `${user.lastname}, ${user.firstname}`;
    li.id = id;
    li.classList.add("user-item");
    userList.appendChild(li);
  });

  userList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      handleUserListClick(event, users, stocks);
    }
  });
}
function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;
  const selectedUser = users.find(u => u.id == userId);

  if (selectedUser) {
    populateForm(selectedUser);
    renderPortfolio(selectedUser, stocks);
  }
}
function populateForm(data) {
  const { user, id } = data;
  document.querySelector("#userID").value = id;
  document.querySelector("#firstname").value = user.firstname;
  document.querySelector("#lastname").value = user.lastname;
  document.querySelector("#address").value = user.address;
  document.querySelector("#city").value = user.city;
  document.querySelector("#email").value = user.email;
}
console.log(`User ${user.firstname} ${user.lastname} loaded successfully.`);
function renderPortfolio(user, stocks) {
  const portfolioList = document.querySelector(".portfolio-list");
  portfolioList.innerHTML = "";

  user.portfolio.forEach(({ symbol, owned }) => {
    const row = document.createElement("div");
    row.classList.add("portfolio-row");

    const symbolEl = document.createElement("p");
    symbolEl.textContent = symbol;

    const sharesEl = document.createElement("p");
    sharesEl.textContent = `${owned} shares`;

    const viewBtn = document.createElement("button");
    viewBtn.textContent = "View Details";
    viewBtn.id = symbol;
    viewBtn.classList.add("view-btn");

    row.append(symbolEl, sharesEl, viewBtn);
    portfolioList.appendChild(row);
  });
  portfolioList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      viewStock(event.target.id, stocks);
    }
  });
}
function viewStock(symbol, stocks) {
  const stock = stocks.find(s => s.symbol == symbol);
  const stockArea = document.querySelector(".stock-form");

  if (stock && stockArea) {
    document.querySelector("#stockName").textContent = stock.name;
    document.querySelector("#stockSector").textContent = stock.sector;
    document.querySelector("#stockIndustry").textContent = stock.subIndustry;
    document.querySelector("#stockAddress").textContent = stock.address;
    document.querySelector("#logo").src = `logos/${symbol}.svg`;

    stockArea.style.display = "block";
  }
}
function registerMainButtons(userData, stocksData) {
  const deleteButton = document.querySelector("#deleteUser");
  const saveButton = document.querySelector("#saveUser");

  // Delete
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.querySelector("#userID").value;
    const index = userData.findIndex(u => u.id == id);
    if (index !== -1) {
      userData.splice(index, 1);
      generateUserList(userData, stocksData);
      document.querySelector(".portfolio-list").innerHTML = "";
      document.querySelector("#userForm").reset();
    }
  });

  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.querySelector("#userID").value;

    userData.forEach(u => {
      if (u.id == id) {
        u.user.firstname = document.querySelector("#firstname").value;
        u.user.lastname = document.querySelector("#lastname").value;
        u.user.address = document.querySelector("#address").value;
        u.user.city = document.querySelector("#city").value;
        u.user.email = document.querySelector("#email").value;
      }
    });
    generateUserList(userData, stocksData);
  });
}

