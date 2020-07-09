const COCKTAILINGREDIENT_URL = "http://localhost:3000/cocktail_ingredients"
const COCKTAILS = "http://localhost:3000/cocktails"

document.addEventListener("DOMContentLoaded", function(){
  fetchUp()
  clickHandler()
  toggleForm()
  submitForm()
  submitComment()
})

function fetchUp(){
fetch("http://localhost:3000/cocktails")
.then(response => response.json())
.then(data => {
  data.forEach(cocktail => {
    renderCocktail(cocktail)
    renderIngredients(cocktail)
    console.log(cocktail.comments)
    renderComments(cocktail)
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
      <button type="button" id="delete" class="btn btn-outline-danger">Delete</button>
      </div>
    <div class="card-footer text-muted">
      ${cocktail.likes} likes
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Comments</h4>
      <h6 id="comment-container" class="card-subtitle mb-2 text-muted">Let us know what you think.</h6>
      <form id="comment-form">
      <div class="form-group">
      <input id="new-comment" type="text" name="comment" class="form-control" aria-describedby="emailHelp" placeholder="New Comment">
      <input id="submit-comment" type="submit" class="btn btn-primary" value="Submit"></input>
      </div>
      </form>
    </div>
    `
    cards.prepend(cocktailCard)
}



function renderIngredients(cocktail) {
  cocktail.ingredients.forEach(ingredient => {
    let ingredientUl = document.getElementById(`${cocktail.id}`)
    let ingredientLi = document.createElement("li")
    ingredientLi.className = "list-group-item"
    ingredientLi.innerText = `${ingredient.name}`
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
    else if (e.target.id === "delete") {
      let deleteBtn = e.target
      let cocktail = e.target.parentNode.parentNode
      let cocktailId = parseInt(deleteBtn.parentNode.parentNode.childNodes[9].id)
      cocktail.remove()
      let configObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }

      fetch(`http://localhost:3000/cocktails/${cocktailId}`, configObj)
      .then(response => response.json())
      .then(console.log)
      .catch(error => {
        console.log("error", error)
      })
    }
    })
}

function toggleForm() {
  document.addEventListener("click", function(e) {
    if (e.target.id === "create") {
      e.preventDefault()
      let button = e.target
      console.log(e.target)
      let formHolder = document.querySelector(".my-4")
      formHolder.style.height = "auto"
      let form = document.createElement("form")
      form.id = "drink-form"
      form.innerHTML = `
    <fieldset>
    <legend>Let's mix!</legend>
    <div class="form-group">
    <label for="name">Drink</label>
    <input type="text" name="name" class="form-control" id="DrinkName" aria-describedby="emailHelp" placeholder="What do you call your cocktail?">
    </div>
    <div class="form-group">
    <label for="Ingredient1">First Ingredient</label>
    <input type="text" name="ingredient1" class="form-control" id="Ingredient1" aria-describedby="emailHelp" placeholder="First ingredient...">
    </div>
    <div class="form-group">
    <label for="Ingredient2">Second Ingredient</label>
    <input type="text" name="ingredient2" class="form-control" id="Ingredient2" aria-describedby="emailHelp" placeholder="Second ingredient...">
    </div>
    <div class="form-group">
    <label for="Ingredient3">Third Ingredient</label>
    <input type="text" name="ingredient3" class="form-control" id="Ingredient3" aria-describedby="emailHelp" placeholder="Third ingredient...">
    </div>
    <div class="form-group">
    <label for="exampleTextarea">Bio</label>
    <small id="emailHelp" class="form-text text-muted">Short and sweet.</small>
    <input type="textarea" name="bio" class="form-control" id="bio" rows="3">
    </div>
    <div class="form-group">
    <label for="Image">Image Link</label>
    <input type="text" name="image" class="form-control" id="image" aria-describedby="emailHelp" placeholder="Image URL">
    <small id="emailHelp" class="form-text text-muted">Click below to see your creation.</small>
    </div>
    </fieldset>
    <fieldset>
    <input id="submit-drink" type="submit" class="btn btn-primary" value="Submit"></input>
    </fieldset>
      `
      formHolder.append(form)
      button.innerText = "Hide Menu"
      button.id = "hide-menu"
    }
    else if (e.target.id === "hide-menu") {
      e.preventDefault()
      let button = e.target
      console.log(button)
      button.innerText = "Create"
      button.id = "create"
      let form = document.querySelector(".drink-form")
      form.remove()
    }
  })
}


function submitForm() {
  document.addEventListener("submit", function(e) {
    if (e.target.id === "drink-form"){
      e.preventDefault()
    console.log("success")
    let name = document.querySelector("input#DrinkName").value
    let ingredients = []
    let ingredient1 = document.querySelector("input#Ingredient1").value
    ingredients.push(ingredient1)
    let ingredient2 = document.querySelector("input#Ingredient2").value
    ingredients.push(ingredient2)
    let ingredient3 = document.querySelector("input#Ingredient3").value
    ingredients.push(ingredient3)
    let image = document.querySelector("input#image").value
    let bio = document.querySelector("input#bio").value
    
    let newCocktail = {
      name: name,
      ingredients: ingredients,
      image: image,
      bio: bio
    }
    
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, body: JSON.stringify(newCocktail)
    }

    fetch(COCKTAILS, configObj)
    .then(response => response.json())
    .then(cocktail => {
      console.log(newCocktail)
      renderCocktail(cocktail)
      renderIngredients(cocktail)
    })
    let form = document.querySelector("#drink-form")
    form.remove()
    let button = document.querySelector("#hide-menu")
    button.innerText = "Create"
    button.id = "create"
  }
})


}

function submitComment() {
   document.addEventListener('submit', function(e){
    if (e.target.id === "comment-form"){
      e.preventDefault()
      let cocktailId = parseInt(e.target.parentNode.parentNode.parentNode.childNodes[9].id) 
      let drinkComment = e.target.parentNode.childNodes[5][0].value     
      let newComment = {comment: drinkComment}
      
      let configObj =  {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }, body: JSON.stringify(newComment)
      }

      fetch(`http://localhost:3000/cocktails/${cocktailId}`, configObj)
      .then(response => response.json())
      .then(cocktail => {
        console.log(cocktail)
        renderComment(cocktail)
        let cocktailCard = document.getElementById(`${cocktail.id}`)
        let input = cocktailCard.parentNode.childNodes[15].childNodes[1].childNodes[5].childNodes[1].childNodes[1]
        input.value = " "
      })
    }
  })
}

function renderComments(cocktail) {
  let cocktailCard = document.getElementById(`${cocktail.id}`)
  let commentContainer = cocktailCard.parentNode.childNodes[15].childNodes[1].children[1]
  cocktail.comments.forEach(comment => {
      let commentP = document.createElement("p")
      commentP.className = "card-text"
      if (comment.content !== false) {
        commentP.innerText = comment.content
        commentContainer.append(commentP)
    }
  }) 
}

function renderComment(cocktail) {
  let cocktailCard = document.getElementById(`${cocktail.id}`)
  let commentContainer = cocktailCard.parentNode.childNodes[15].childNodes[1].children[1]
  
  let comment = cocktail.comments[cocktail.comments.length - 1]
  let commentP = document.createElement("p")
  commentP.className = "card-text"
      if (comment.content !== false) {
        commentP.innerText = comment.content
        commentContainer.append(commentP)
    }
}











 
