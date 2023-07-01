///////////////////////////////////////////////////////////////// AFFICHAGE RECETTES ////////////////////////////////////////////////////////////////
function displayRecipes(recipes, recipesSection) {
    for (let i = 0; i < recipes.length; i++) {
        //////////////////////////////////////////////////////// TITRE RECETTE
        const title = document.createElement('h2');
        title.textContent = recipes[i].name;
        //////////////////////////////////////////////////////// TEMPS RECETTE
        const icon = document.createElement('i');
        icon.className = "fa-regular fa-clock";
        const time = document.createElement('p');
        time.textContent = recipes[i].time;
        time.append(' min');
        //////////////////////////////////////////////////////// TITRE + TEMPS
        const titleDIv = document.createElement('div');
        titleDIv.append(title);
        titleDIv.append(icon);
        titleDIv.append(time);
        titleDIv.className = "titleDIv";
        /////////////////////////////////////// ZONE INGREDIENTS + DESCRIPTION
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = "descriptionDiv";
        ///////////////////////////////////////////////////// ZONE INGREDIENTS
        const ingredientsDiv = document.createElement('div');
        ingredientsDiv.className = "ingredientsDiv";
        ////////////////////////////////////////////////// INGREDIENTS RECETTE
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            const ingredient = document.createElement('p');
            ingredient.append(recipes[i].ingredients[j].ingredient);
            if (recipes[i].ingredients[j].quantity) {
                ingredient.append(" : ");
                ingredient.append(recipes[i].ingredients[j].quantity);
            }
            if (recipes[i].ingredients[j].unit) {
                ingredient.append(" ");
                ingredient.append(recipes[i].ingredients[j].unit);
            }
            ingredient.className = "ingredient";
            ingredientsDiv.append(ingredient);
        }
        descriptionDiv.append(ingredientsDiv);
        ////////////////////////////////////////////////// DESCRIPTION RECETTE
        const description = document.createElement('p');
        description.textContent = recipes[i].description;
        description.className = "description";
        descriptionDiv.append(description);
        //////////////////////////////////////////////// PARTIE BASSE VIGNETTE
        const textArea = document.createElement('div');
        textArea.append(titleDIv);
        textArea.append(descriptionDiv);
        textArea.className = "textArea";
        //////////////////////////////////////////////// PARTIE HAUTE VIGNETTE
        const picture = document.createElement('div');
        picture.className = "picture";
        ///////////////////////////////////////////////////////////// VIGNETTE
        const recipeCard = document.createElement('a');
        recipeCard.append(picture);
        recipeCard.append(textArea);
        recipeCard.className = 'recipeCard';
        recipeCard.href = "#";
        /////////////////////////////////////////// INSERTION DU CONTENU GLOBAL
        recipesSection.append(recipeCard);
    }
}
/////////////////////////////////////////////////////////////////// AFFICHAGE TAGS ////////////////////////////////////////////////////////////////
function displayTags(tags, tagsContainer) {
    tagsContainer.innerHTML = "";
    for (let i = 0; i < tags.length; i++) {
        const tagItem = document.createElement('li');
        tagItem.className = "tagItem";
        tagItem.textContent = tags[i];
        const tagBtn = document.createElement('button');
        tagBtn.className = "tagBtn";
        tagBtn.append(tagItem);
        tagsContainer.append(tagBtn);
        /////////////////////////////////////////////////////////////////////////// AU "CLICK" SUR UN TAG
        const selectedTagsArea = document.getElementById('selectedTagsArea');

        // <i class="fa-regular fa-circle-xmark"></i>
        const tagIcon = document.createElement('i');
        tagIcon.className = "fa-regular fa-circle-xmark close-icon";

        tagBtn.addEventListener('click', () => {
            ////////////////////////////////////////////// SI TAG INGREDIENT
            if (tagsContainer == ingredientsBox) {
                tagBtn.className = "tagBtn_selected ingr_color";
                const tempFilteredRecipes = [];

                for (let a = 0; a < filteredRecipes.length; a++) {
                    for (let j = 0; j < filteredRecipes[a].ingredients.length; j++) {
                        if (filteredRecipes[a].ingredients[j].ingredient.toLowerCase() === tags[i]) {
                            tempFilteredRecipes.push(filteredRecipes[a]);
                        }
                    }
                }
                filteredRecipes = [...tempFilteredRecipes];
                recipesSection.innerHTML = "";
                displayRecipes(filteredRecipes, recipesSection);
                const filterTags = initTags(filteredRecipes);
            }
            ////////////////////////////////////////////// SI TAG APPAREIL
            else if (tagsContainer == applianceBox) {
                tagBtn.className = "tagBtn_selected appli_color";
                const tempFilteredRecipes = [];

                for (let a = 0; a < filteredRecipes.length; a++) {
                    if (filteredRecipes[a].appliance.toLowerCase() === tags[i]) {
                        tempFilteredRecipes.push(filteredRecipes[a]);
                    }
                }
                filteredRecipes = [...tempFilteredRecipes];
                recipesSection.innerHTML = "";
                displayRecipes(filteredRecipes, recipesSection);
                const filterTags = initTags(filteredRecipes);
            }
            ////////////////////////////////////////////// SI TAG USTENSILE
            else if (tagsContainer == ustensilsBox) {
                tagBtn.className = "tagBtn_selected ust_color";
                const tempFilteredRecipes = [];

                for (let a = 0; a < filteredRecipes.length; a++) {
                    for (let j = 0; j < filteredRecipes[a].ustensils.length; j++) {
                        if (filteredRecipes[a].ustensils[j].toLowerCase() === tags[i]) {
                            tempFilteredRecipes.push(filteredRecipes[a]);
                        }
                    }
                }
                filteredRecipes = [...tempFilteredRecipes];
                recipesSection.innerHTML = "";
                displayRecipes(filteredRecipes, recipesSection);
                const filterTags = initTags(filteredRecipes);
            }
            tagBtn.append(tagIcon);
            selectedTagsArea.append(tagBtn);
        })
    }
}