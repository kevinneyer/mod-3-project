const COCKTAIL_URL = "http://localhost:3000/cocktail_ingredients"

fetch(COCKTAIL_URL)
.then(response => response.json())
.then(data => {
  data.map(cocktailIngredient => {
    console.log(cocktailIngredient.cocktail)
    }) 
})
  // cocktails => {
    // cocktails.forEach(cocktail => {
    //   console.log(cocktail)
    //     renderCocktail(cocktail)
    //     renderIngredients(cocktail)
    //     })
    

function renderCocktail(cocktail){
    let cards = document.querySelector('.cards')
    let cocktailCard = document.createElement('div')
    cocktailCard.className = "card mb-3"
    cocktailCard.innerHTML = `
    <h3 class="card-header">${cocktail.name}</h3>
    <div class="card-body">
      <h5 class="card-title">${cocktail.bio}</h5>
    </div>
    <img class="drink-img" style="height: 200px; width: 50%; display: block;" src=${cocktail.image}>
    <div class="card-body">
      <p class="card-text">Ingredients</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">1</li>
      <li class="list-group-item">2</li>
      <li class="list-group-item">3</li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Upvote</a>
      <a href="#" class="card-link">Downvote</a>
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

function renderIngredients(cocktail) {
  cocktail.ingredients.forEach(ingredient => {
    let ingredientUl = document.querySelector("body > main > div.cards > div:nth-child(1) > ul")
    let ingredientLi = document.createElement("li")
    ingredientLi.className = "list-group-item"
    ingredientLi.innerText = `${ingredient.name} - ${ingredient.amount}`
    ingredientUl.append(ingredientLi)
  })
}










 
