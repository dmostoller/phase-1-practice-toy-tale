let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

});

fetch("http://localhost:3000/toys")
  .then((resp) => resp.json())
  .then((data) => renderToyArr(data))

function renderToyArr(toyArr) {
    console.log(toyArr)
    const toyCollection = document.querySelector("#toy-collection")

    toyArr.forEach((toyObj) => {
      const toyCard = document.createElement('div')
      toyCard.className = 'card'

      const h2 = document.createElement('h2')
      h2.textContent = toyObj.name 
      toyCard.appendChild(h2)
      
      const img = document.createElement('img')
      img.src = toyObj.image
      img.className = 'toy-avatar'
      toyCard.appendChild(img)

      const p = document.createElement('p')
      let currLikes = toyObj.likes
      p.textContent = `${toyObj.likes} likes`
      toyCard.appendChild(p)

      const btn = document.createElement('button')
      btn.className = "like-btn"
      btn.id = toyObj.id
      btn.innerText = "Like ❤️"
      toyCard.appendChild(btn)
      btn.addEventListener('click', handleIncrementLikes)

      function handleIncrementLikes() {
        currLikes++
        //console.log(currLikes)
        p.textContent = `${currLikes} likes`
      }

      toyCollection.appendChild(toyCard)
    })
}

const form = document.querySelector('form')
form.addEventListener('submit', (e) => handleAddNewToy(e))

function handleAddNewToy(e) {
  e.preventDefault()
  const newToyObj = {
    id : 9,
    likes : 0,
    name : e.target.name.value,
    image : e.target.image.value,
  }
  renderToyArr([newToyObj])
}