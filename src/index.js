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
      
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }, body: JSON.stringify({"likes": likes})
      }
      fetch(`http://localhost:3000/cocktails/${cocktailId}`, configObj)
      .then(response => response.json())
      .then(
        likesSpan.innerText = `${likes} likes`
      ).catch(console.log)
    }
    else if (e.target.id === "downvote") {
      console.log(e.target)
      let downvote = e.target
        let cocktailId = parseInt(downvote.parentNode.parentNode.childNodes[9].id)
        let likesSpan = downvote.parentNode.parentNode.childNodes[13]
        let likes = parseInt(likesSpan.innerText) - 1
        
        let configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }, body: JSON.stringify({"likes": likes})
        }
        fetch(`http://localhost:3000/cocktails/${cocktailId}`, configObj)
        .then(response => response.json())
        .then(
          likesSpan.innerText = `${likes} likes`
        ).catch(console.log)
    }
  })
        
      
}









 
