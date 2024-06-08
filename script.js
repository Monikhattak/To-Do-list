const inputBox = document.getElementById("inputBox");
const listContanier = document.getElementById("listContanier");

function addtask() {
    if (inputBox.value.trim() === '') {
        alert("Please write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        let span = document.createElement("span");
        span.innerHTML = "\u00D7";
        li.appendChild(span);
        listContanier.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addtask();
    }
});

listContanier.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContanier.innerHTML);
}

function showtasks() {
    listContanier.innerHTML = localStorage.getItem("data");
    let listItems = listContanier.getElementsByTagName("li");
    for (let item of listItems) {
        let span = item.getElementsByTagName("span")[0];
        if (span) {
            span.addEventListener("click", function () {
                this.parentElement.remove();
                saveData();
            });
        }
        item.addEventListener("click", function () {
            this.classList.toggle("checked");
            saveData();
        });
    }
}

showtasks();
