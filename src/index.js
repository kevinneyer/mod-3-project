const COCKTAILINGREDIENT_URL = "http://localhost:3000/cocktail_ingredients"
const COCKTAILS = "http://localhost:3000/cocktails"

document.addEventListener("DOMContentLoaded", function(){
  fetchUp()
  clickHandler()
})

function fetchUp(){
fetch("http://localhost:3000/cocktails")
.then(response => response.json())
.then(data => {
  data.forEach(cocktail => {
    console.log(cocktail)
    renderCocktail(cocktail)
    console.log(cocktail.ingredients)
    renderIngredients(cocktail)
    })
  })
}

    

function renderCocktail(cocktail){
    let cards = document.querySelector('.cards')
    let cocktailCard = document.createElement('div')
    cocktailCard.className = "card mb-3"
    cocktailCard.innerHTML = `
    <h3 class="card-header">${cocktail.name}</h3>
    <div class="card-body">
      <h5 class="card-title">${cocktail.bio}</h5>
    </div>
    <img class="drink-img" style="height: 200px; width: 27%; display: block;" src=${cocktail.image}>
    <div class="card-body">
      <p class="card-text">Ingredients</p>
    </div>
    <ul id=${cocktail.id} class="list-group list-group-flush">
    </ul>
    <div class="card-body">
      <button type="button" id="upvote" class="btn btn-outline-secondary">Upvote</button>
      <button type="button" id="downvote" class="btn btn-outline-secondary">Downvote</button>
     </div>
    <div class="card-footer text-muted">
      ${cocktail.likes} likes
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Comments</h4>
      <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
      <p class="card-text">Sample Comments</p>
      <p class="card-text">Sample Comments</p>
      <p class="card-text">Sample Comments</p>
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
    `
    cards.append(cocktailCard)
}

function renderIngredients(cocktail) {
  cocktail.ingredients.forEach(ingredient => {
    let ingredientUl = document.getElementById(`${cocktail.id}`)
    let ingredientLi = document.createElement("li")
    ingredientLi.className = "list-group-item"
    ingredientLi.innerText = `${ingredient.name} - ${ingredient.amount}`
    ingredientUl.append(ingredientLi)
  })
}

function clickHandler() {
  document.addEventListener("click", function(e) {
    if (e.target.id === "upvote") {
      let upvote = e.target
      let cocktailId = parseInt(upvote.parentNode.parentNode.childNodes[9].id)  
      let likesSpan = upvote.parentNode.parentNode.childNodes[13]
      let likes = parseInt(likesSpan.innerText) + 1   
      
      
      let drinkLikes = {
        "likes": likes
        }
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }, body: JSON.stringify(drinkLikes)
      }
      fetch(`http://localhost:3000/cocktails/${cocktailId}`, configObj)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        likesSpan.innerText = `${likes} likes`
      }).catch(error => {
        console.log("error", error)
      })
    }
    else if (e.target.id === "downvote") {
      let downvote = e.target
        let cocktailId = parseInt(downvote.parentNode.parentNode.childNodes[9].id)
        let likesSpan = downvote.parentNode.parentNode.childNodes[13]
        let likes = parseInt(likesSpan.innerText) - 1
        
        let drinkLikes = {
          "likes": likes
          }
        let configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }, body: JSON.stringify(drinkLikes)
        }
        fetch(`http://localhost:3000/cocktails/${cocktailId}`, configObj)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          likesSpan.innerText = `${likes} likes`
        }).catch(error => {
          console.log("error", error)
        })
    }
      else if (e.target.id === "create") {
        e.preventDefault()
        console.log(e.target)
        let formHolder = document.querySelector(".my-4")
        formHolder.style.height = "auto"
        let form = document.createElement("form")
        form.className = "drink-form"
        form.innerHTML = `
  <fieldset>
    <legend>Let's mix!</legend>
    <div class="form-group">
      <label for="Name">Drink</label>
      <input type="email" class="form-control" id="DrinkName" aria-describedby="emailHelp" placeholder="What do you call your cocktail?">
    </div>
    <div class="form-group">
      <label for="Ingredient1">First Ingredient</label>
      <input type="Ingredient1" class="form-control" id="Ingredient1" aria-describedby="emailHelp" placeholder="First ingredient...">
    </div>
    <div class="form-group">
    <label for="Ingredient2">Second Ingredient</label>
    <input type="Ingredient2" class="form-control" id="Ingredient2" aria-describedby="emailHelp" placeholder="Second ingredient...">
  </div>
  <div class="form-group">
      <label for="Ingredient3">Third Ingredient</label>
      <input type="Ingredient3" class="form-control" id="Ingredient3" aria-describedby="emailHelp" placeholder="Third ingredient...">
    </div>
    <div class="form-group">
      <label for="exampleTextarea">Bio</label>
      <small id="emailHelp" class="form-text text-muted">Short and sweet.</small>
      <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label for="exampleInputFile">Upload Image</label>
      <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
      <small id="fileHelp" class="form-text text-muted">Click below to see your creation.</small>
    </div>
    </fieldset>
    <fieldset>
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
        `
        formHolder.append(form)
      }
    })
}









 
