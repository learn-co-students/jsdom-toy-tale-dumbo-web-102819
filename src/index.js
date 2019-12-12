let addToy = false
const addToyForm = document.querySelector('.add-toy-form')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    openCloseTab()
  })

})

const openCloseTab = () => {
  addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
}
const addToyToDb = (event) => {
  event.preventDefault()
  let newToy = event.target
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      name: newToy.name.value,
      image: newToy.image.value,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(toy => {
    createToyCard(toy)
    openCloseTab()
  })
}

addToyForm.addEventListener("submit", addToyToDb )



fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then((json) => {
 json.forEach(createToyCard)
})

const createToyCard = (toy) => { 

  const toyCard = document.createElement('div');
  toyCard.className = "card"
  toyCard.id = toy.id
  toyCard.innerHTML = `<h2>${toy.name}</h2>\n 
  <form class="edit-form hidden">\n
    <input type="text" name="name" placeholder="Update Toy Name">\n
    <input type="submit" name="edit-submit" value="Finalize">\n
  </form>\n
  <img src=${toy.image} class="toy-avatar" /> \n
  <p> ${toy.likes === 1 ? toy.likes + " like" : toy.likes + " likes"} </p>\n
  <button class="like-btn">Like <3</button>\n
  <button class="edit-btn">Edit</button>\n
  <button class="delete"> X </button`

  //Adding Event Listener to Like Button
  
  toyCard.querySelector('.like-btn').addEventListener("click", (event) => {
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: "PATCH",
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        likes: toy.likes += 1
      })
    })
    .then(resp => resp.json())
    .then(json => {
      let pTag = toyCard.querySelector('p')
      pTag.innerText = json.likes === 1 ? json.likes + " like" : json.likes + " likes"
    } )
  })


  //Delete button

  let deleteBtn = toyCard.querySelector('.delete')
  deleteBtn.addEventListener('click', event => {

    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(() => toyCard.remove())
  })

//Edit Button

  let editButton = toyCard.querySelector('.edit-btn')
  let editForm = toyCard.querySelector('.edit-form')
  editButton.addEventListener('click', () => {
    editForm.classList.contains("hidden") ? editForm.classList.remove("hidden") : editForm.classList.add("hidden")
  })

  
  editForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let updatedToyName = event.target.name.value
    toy.name = updatedToyName
    
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        name: toy.name
      })
    })
    .then(resp => resp.json())
    .then(json => {
      
      let hTag = toyCard.querySelector('h2')
      hTag.innerText = json.name
      editForm.classList.add('hidden')
    })
  })

  toyCollection.append(toyCard)
}
