let recipeBox = document.getElementById("recipeBox");
let recipeBtn = document.getElementById("recipeBtn");
let recipeCards = document.getElementById("recipeCards");
let recipeInfo = document.querySelector(".recipeInfo");
let recipeClose = document.querySelector(".recipeClose");


recipeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let recipeName = recipeBox.value.trim();
    recipeFeach(recipeName);
});

const recipeFeach = async (recipeName) => {
    recipeCards.innerHTML = "<h2>Feaching recipe...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`);
    const response = await data.json();
    recipeCards.innerHTML = "";
    response.meals.forEach(meal => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="">
        <h3>${meal.strMeal}</h3>
        <p>Comes from <b>${meal.strArea}</b> country<p>
        <p><b>${meal.strCategory}</b> category<p>
        `;
        let button = document.createElement("button");
        button.textContent = "View Recipe";
        card.appendChild(button);
        button.addEventListener("click",()=>{
            openRecipeInfo(meal);
        })
        recipeCards.appendChild(card);
    });
}

const ingredients=(meals)=>{
    let ingredientList = "";
    for (let i = 0; i <= 20; i++) {
        const ingredient = meals[`strIngredient${i}`];
        if(ingredient){
            const measure = meals[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

let openRecipeInfo = (meal)=>{
    recipeInfo.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <h2>Ingredients :</h2>
    <ul>${ingredients(meal)}</ul>
    `;

    recipeInfo.parentElement.style.display = "block";
}