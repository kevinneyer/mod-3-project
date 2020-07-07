const COCKTAIL_URL = "http://localhost:3000/cocktail_ingredients"

document.addEventListener("DOMContentLoaded", function(){
  fetchUp()
})

function fetchUp(){
fetch("http://localhost:3000/cocktails")
.then(response => response.json())
.then(data => {
  // console.log(data)
  data.forEach(cocktail => {
    // console.log(cocktailIngredient.cocktail)
    renderCocktail(cocktail)
    console.log(cocktail.ingredients)
    cocktail.ingredients.forEach(ingredient => {
      renderIngredients(ingredient)
    })
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
    <ul class="list-group list-group-flush">
      <li class="list-group-item">1</li>
      <li class="list-group-item">2</li>
      <li class="list-group-item">3</li>
    </ul>
    <div class="card-body">
      <button type="button" class="btn btn-outline-secondary">Upvote</button>
      <button type="button" class="btn btn-outline-secondary">Downvote</button>
     </div>
    <div class="card-footer text-muted">
      2 days ago
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

function renderIngredients(ingredient) {

    let ingredientUl = document.querySelector('body > main > div.cards > div:nth-child(1) > ul')
    let ingredientLi = document.createElement("li")
    ingredientLi.className = "list-group-item"
    ingredientLi.innerText = `${ingredient.name} - ${ingredient.amount}`
    ingredientUl.append(ingredientLi)

 
}

   








 
