let addToy = false
document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')

  const toyForm = document.querySelector('.container')

  const toyCollection = document.querySelector('#toy-collection')

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
.then((toyslist) => {
  toyslist.forEach((toy) => {
    takeJSONtoHTML(toy)
  })
})

function takeJSONtoHTML(toy){
  let newDiv = document.createElement("div")
  newDiv.className="card"
  newDiv.innerHTML = `<h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p> ${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>`
  toyCollection.append(newDiv)

// Eric code:
  let likeBtn = newDiv.querySelector(".like-btn")
  let toyP = newDiv.querySelector("p")
  console.log("p", toyP);
  likeBtn.addEventListener("click", (arguments) => {
    toy.likes = toy.likes + 1;

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ //can also stringify the whole toy object, but bad practice > can be problematic if object is too large
        likes: toy.likes
      })
    })
    .then(r => r.json())
    .then(updatedToy => {
      toyP.innerText = `${updatedToy.likes} Likes`
    })
  })
  }
  // end eric

  toyForm.addEventListener('submit', (evt) => { evt.preventDefault()

  let newName = evt.target.name.value
  let newImage = evt.target.image.value

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: newName,
      image: newImage,
      likes: 0
    })
  })
  .then((a) => a.json())
  .then(newToy => takeJSONtoHTML(newToy))
}

)
})
