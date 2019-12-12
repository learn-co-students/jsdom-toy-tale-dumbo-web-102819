let addToy = false
 
document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  let toyCollection = document.querySelector("#toy-collection");
  let addForm = document.querySelector(".add-toy-form");

  fetch("http://localhost:3000/toys")
    .then((r) => r.json() )
    .then((data) => {  
      data.forEach((ele) => {
        turnJsonToHtml(ele)
      })
   });

///////////////////////////////////////////

  function turnJsonToHtml(ele) {

    let div = document.createElement("div");
    div.class = "card";
    
    div.innerHTML = `
    <h2> name: ${ele.name}</h2>
    <img src=${ele.image} class="toy-avatar" />
    <p id=${ele.id} > likes: ${ele.likes} </p>`
    
    let btn = document.createElement('BUTTON');
    btn.innerText = "Like <3";
    btn.addEventListener('click', (e) => {
      updateLikes(ele);
    });

    div.append(btn)

    toyCollection.append(div);
  }

/////// End of turnJsonToHtml function

  addForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
      
    let newName = evt.target.name.value;
    let newImage = evt.target.image.value;

    fetch("http://localhost:3000/toys", {
      method:"POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
          name: newName,
          image: newImage,
          likes: 0
        })
      })
      .then((r) => r.json())
      .then((newToy) => {
        turnJsonToHtml(newToy)
      })
  });


  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  });


  function updateLikes(ele) {
      fetch(`http://localhost:3000/toys/${ele.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        body: JSON.stringify({
          "likes": ele.likes += 1
        })
      })
      .then(r => r.json())
      .then(obj => {
        let p = document.getElementById(ele.id);
        p.innerText = `likes: ${ele.likes}`;
      });
  }

})
