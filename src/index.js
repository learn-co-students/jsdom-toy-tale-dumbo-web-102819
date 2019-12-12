let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollect = document.querySelector("#toy-collection")
  const addToyForm = document.querySelector(".add-toy-form")
  // const toyLike = document.querySelector()
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then((toysArr) => {
    toysArr.forEach((toyObj) => {
      turnToystoHTML(toyObj)
    })


  })



function turnToystoHTML(toyObj) {
let toyDiv = document.createElement("div")
toyDiv.className = "card"
toyDiv.innerHTML = `<h2>${toyObj.name}</h2>
  <img src=${toyObj.image} class="toy-avatar" />
  <p>${toyObj.likes} Likes </p>
  <button class="like-btn">Like <3</button>`
let likeButton = toyDiv.querySelector(".like-btn")
likeButton.addEventListener("click", () => {
  let newLikes = toyObj.likes + 1
  // toyObj.likes += 1
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
     method:"PATCH",
     headers: {
      'Content-Type': 'application/json',
     Accept: 'application/json'
     },
     body: JSON.stringify({
       likes: newLikes
     })
  })
  .then(r => r.json())
  .then((toyObj) => {
    toyDiv.innerHTML = `<h2>${toyObj.name}</h2>
      <img src=${toyObj.image} class="toy-avatar" />
      <p>${toyObj.likes } Likes </p>
      <button class="like-btn">Like <3</button>`
  })
})
toyCollect.append(toyDiv);
}


addToyForm.addEventListener("submit",(evt) => {
  evt.preventDefault()

let newName = evt.target.name.value
let newImg = evt.target.image.value

fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: newName,
    image: newImg,
    likes: 0
  })
})
.then(r => r.json())
.then((newToyInstansce) => { 
  turnToystoHTML(newToyInstansce)
})
  

})

















})
