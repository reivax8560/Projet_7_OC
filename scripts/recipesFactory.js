function displayRecipes(recipes, recipesSection) {
    for (let i = 0; i < recipes.length; i++) {
        //////////////////////////////////////////////////////// TITRE RECETTE
        const title = document.createElement('h2')
        title.textContent = recipes[i].name
        //////////////////////////////////////////////////////// TEMPS RECETTE
        const icon = document.createElement('i')
        icon.className = "fa-regular fa-clock"
        const time = document.createElement('p')
        time.textContent = recipes[i].time
        time.append(' min')
        //////////////////////////////////////////////////////// TITRE + TEMPS
        const titleDIv = document.createElement('div')
        titleDIv.append(title)
        titleDIv.append(icon)
        titleDIv.append(time)
        titleDIv.className = "titleDIv"
        /////////////////////////////////////// ZONE INGREDIENTS + DESCRIPTION
        const descriptionDiv = document.createElement('div')
        descriptionDiv.className = "descriptionDiv"
        ///////////////////////////////////////////////////// ZONE INGREDIENTS
        const ingredientsDiv = document.createElement('div')
        ingredientsDiv.className = "ingredientsDiv"
        ////////////////////////////////////////////////// INGREDIENTS RECETTE
        // tester boucle pour 7 tours
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            const ingredient = document.createElement('p')
            ingredient.append(recipes[i].ingredients[j].ingredient)
            if (recipes[i].ingredients[j].quantity) {
                ingredient.append(" : ")
                ingredient.append(recipes[i].ingredients[j].quantity)
            }
            if (recipes[i].ingredients[j].unit) {
                ingredient.append(" ")
                ingredient.append(recipes[i].ingredients[j].unit)
            }
            ingredient.className = "ingredient"
            ingredientsDiv.append(ingredient)
        }
        descriptionDiv.append(ingredientsDiv)
        ////////////////////////////////////////////////// DESCRIPTION RECETTE
        const description = document.createElement('p')
        description.textContent = recipes[i].description
        description.className = "description"
        descriptionDiv.append(description)
        //////////////////////////////////////////////// PARTIE BASSE VIGNETTE
        const textArea = document.createElement('div')
        textArea.append(titleDIv)
        textArea.append(descriptionDiv)
        textArea.className = "textArea"
        //////////////////////////////////////////////// PARTIE HAUTE VIGNETTE
        const picture = document.createElement('div')
        picture.className = "picture"
        ///////////////////////////////////////////////////////////// VIGNETTE
        const recipeCard = document.createElement('a')
        recipeCard.append(picture)
        recipeCard.append(textArea)
        recipeCard.className = 'recipeCard'
        recipeCard.href = "#"

        recipesSection.append(recipeCard)
    }
}

function displayTags(tags, tagsContainer) {
    for (let i = 0; i < tags.length; i++) {
        // console.log(tags[i])
        const tagItem = document.createElement('li')
        tagItem.className = "tagItem"
        tagItem.textContent = tags[i]
        tagsContainer.append(tagItem)
    }
}