let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyListDiv =document.getElementById("toy-collection")
  const createBtn = document.getElementById("create_button")
  
  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then((toyObjectArr) => {
    toyObjectArr.forEach((toyObject) => {
      turnToyObjToHTML(toyObject)
    })
    })
  
  function turnToyObjToHTML(toyObject){
    let toyCardDiv = document.createElement("div")
        toyCardDiv.className = "card"
    let toyImg = document.createElement("img")
        toyImg.className = "toy-avatar"
        toyImg.src = toyObject.image
        toyImg.alt = toyObject.name
       
    let toyNameH2 = document.createElement("h2")
        toyNameH2.innerText = toyObject.name
        
        
    let toyLikesP = document.createElement("p")
        toyLikesP.innerText = toyObject.likes
        toyLikesP.id = `p-${toyObject.id}`
    let toyBtn = document.createElement("button")
        toyBtn.className = "like-btn"
        toyBtn.id = `${toyObject.id}`
        toyBtn.innerText ="Like <3"
        toyCardDiv.append(toyNameH2)
        toyCardDiv.append(toyImg)
        toyCardDiv.append(toyLikesP)
        toyCardDiv.append(toyBtn)
        
        
        toyListDiv.append(toyCardDiv)

        toyBtn.addEventListener("click", (evt) => {
          
          fetch("http://localhost:3000/toys")
          .then(r => r.json())
          .then((arr) => {
            let toy = arr.find((oneToy) => {
              return evt.target.id == oneToy.id
            })
            fetch(`http://localhost:3000/toys/${toyObject.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
              likes: Number(toy.likes) + 1
              })
            })
            .then(r => r.json())
            .then((json) => {
              let newP = document.getElementById(`p-${json.id}`)
              newP.innerText = json.likes
            })
          })
          
        })

  }  // end of function turnToyObj

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

    toyForm.addEventListener("submit", (evt) => {
      evt.preventDefault()
      newToyName = evt.target["name"].value
      newToyImg = evt.target["image"].value
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: newToyName,
          image: newToyImg,
          likes: 0
        })

      })
      .then(r => r.json())
      .then((newToyObj)=> {
        turnToyObjToHTML(newToyObj)
      })
    })

})
