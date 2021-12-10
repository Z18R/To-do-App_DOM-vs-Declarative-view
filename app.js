let ourData = []
render()
const ourForm = document.querySelector("#ourForm")

function loadData() {
  if (localStorage.getItem("ourData")) {
    ourData = JSON.parse(localStorage.getItem("ourData"))
  }
}

loadData()
render()

function saveData() {
  render()
  localStorage.setItem("ourData", JSON.stringify(ourData))
}

function render() {
  document.querySelector("#app").innerHTML = `
  <form onsubmit="submitHandler(event)">
    <input id="ourField" type="text" autocomplete="off" />
    <button>Create Item</button>
  </form>

  <ul>
    ${ourData
      .map(function(item) {
        return `<li>${item.value} <button data-value="${item.value}" data-id="${item.id}" onclick="updateMe(this)">Edit</button> <button onclick="deleteMe(this)" data-id="${item.id}">Delete</button></li>`
      })
      .join("")}
  </ul>
  `
}

function updateMe(el) {
  const idToUpdate = el.getAttribute("data-id")
  let newValue = prompt("Enter new value.", el.getAttribute("data-value"))
  if (newValue) {
    ourData = ourData.map(function(item) {
      if (item.id == idToUpdate) {
        item.value = newValue
      }
      return item
    })
    saveData()
  }
}

function deleteMe(el) {
  const idToDelete = el.getAttribute("data-id")
  ourData = ourData.filter(function(item) {
    return item.id != idToDelete
  })
  saveData()
}

function submitHandler(e) {
  e.preventDefault()
  ourData.push({ value: document.querySelector("#ourField").value, id: Date.now() })
  saveData()
}
