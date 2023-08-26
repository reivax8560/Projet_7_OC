///////////////////////////////////////////////////////////////// AFFICHAGE RECETTES ////////////////////////////////////////////////////////////////
function displayRecipes(recipes, recipesSection) {
    recipes.forEach(recipe => {
        //////////////////////////////////////////////////////// TITRE RECETTE
        const title = document.createElement('h2');
        title.textContent = recipe.name;
        //////////////////////////////////////////////////////// TEMPS RECETTE
        const icon = document.createElement('i');
        icon.className = "fa-regular fa-clock";
        const time = document.createElement('p');
        time.textContent = recipe.time;
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
        recipe.ingredients.forEach(ingredients => {
            const ingredient = document.createElement('p');
            ingredient.append(ingredients.ingredient);
            if (ingredients.quantity) {
                ingredient.append(" : ");
                ingredient.append(ingredients.quantity);
            }
            if (ingredients.unit) {
                ingredient.append(" ");
                ingredient.append(ingredients.unit);
            }
            ingredient.className = "ingredient";
            ingredientsDiv.append(ingredient);
        })
        descriptionDiv.append(ingredientsDiv);
        ////////////////////////////////////////////////// DESCRIPTION RECETTE
        const description = document.createElement('p');
        description.textContent = recipe.description;
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
    });
}
/////////////////////////////////////////////////////////////////// AFFICHAGE ITEMS ////////////////////////////////////////////////////////////////
function displayItems(items, itemsBox) {
    itemsBox.innerHTML = "";
    ///////////////////////////////////////////////// CREATION DE CHAQUE ITEM
    items.forEach(item => {
        const DOMitem = document.createElement('li');
        DOMitem.className = "item";
        DOMitem.textContent = item;
        itemsBox.append(DOMitem);

        /////////////////////////////////////////////////////////// AU "CLICK" SUR UN ITEM => FILTRER RECETTES
        DOMitem.addEventListener('click', () => {
            noResultMessage.style.display = 'none';
            displayTag(item, itemsBox);
            //////////////////////////////////////////// ITEM INGREDIENT
            function searchByIngredients(recipe) {
                for (let i = 0; i < recipe.ingredients.length; i++) {
                    if (recipe.ingredients[i].ingredient.toLowerCase() === item) {
                        return true;
                    }
                }
            }
            if (itemsBox == ingredientsBox) {
                filteredRecipes = filteredRecipes.filter(searchByIngredients);
                ingredientsTags.push(item);
            }
            /////////////////////////////////////////// ITEM APPAREIL
            function searchByAppliance(recipe) {
                if (recipe.appliance.toLowerCase() === item) {
                    return true;
                }
            }
            if (itemsBox == applianceBox) {
                filteredRecipes = filteredRecipes.filter(searchByAppliance);
                applianceTags.push(item);
            }
            ////////////////////////////////////////// ITEM USTENSILE
            function searchByUstensils(recipe) {
                for (let j = 0; j < recipe.ustensils.length; j++) {
                    if (recipe.ustensils[j].toLowerCase() === item) {
                        return true;
                    }
                }
            }
            if (itemsBox == ustensilsBox) {
                filteredRecipes = filteredRecipes.filter(searchByUstensils);
                ustensilsTags.push(item);
            }
            ///////////////////////////////////////// SI AUCUN RESULTAT => MESSAGE ERREUR
            if (filteredRecipes.length === 0) {
                noResultMessage.style.display = 'block';
            }
            ////////////////////////////////////////////// ACTUALISATION AFFICHAGE
            recipesSection.innerHTML = "";
            displayRecipes(filteredRecipes, recipesSection);
            const filterTags = inititems(filteredRecipes);
            filteredIngredients = filterTags._ingredients;
            filteredAppliance = filterTags._appliances;
            filteredUstensils = filterTags._ustensils;
        })
    })
}
/////////////////////////////////////////////////////////////////// AFFICHAGE TAGS ////////////////////////////////////////////////////////////////
function displayTag(item, itemsBox) {
    ////////////////////////////////////////////////// CREATION BOUTON + ELEMENT + ICONE "TAG"
    item.className = 'selectedItem';
    const deleteTagIcon = document.createElement('i');
    deleteTagIcon.className = "fa-regular fa-circle-xmark close-icon";
    const tagBtn = document.createElement('button');

    if (itemsBox == ingredientsBox) {
        tagBtn.className = "tagBtn_selected ingr_color";
        tagBtn.dataset.type = 'ingredient';
    }
    else if (itemsBox == applianceBox) {
        tagBtn.className = "tagBtn_selected appli_color";
        tagBtn.dataset.type = 'appliance';
    }
    else if (itemsBox == ustensilsBox) {
        tagBtn.className = "tagBtn_selected ust_color";
        tagBtn.dataset.type = 'ustensil';
    }
    tagBtn.append(item, deleteTagIcon);
    ///////////////////////////////////////////////// INSERTION DANS LA ZONE DES TAGS
    const selectedTagsArea = document.getElementById('selectedTagsArea');
    selectedTagsArea.append(tagBtn);

    ////////////////////////////////////////////////////////////////// AU "CLICK" POUR SUPPRIMER UN TAG => VERIF DES FILTRES ENCORE ACTIFS
    deleteTagIcon.addEventListener('click', () => {
        noResultMessage.style.display = 'none';
        filteredRecipes = [];
        ////////////////////////////////////////////////////// SUPPRESSION DU TAG
        selectedTagsArea.removeChild(tagBtn);
        /////////////////////////// SUPPRESSION DE L'ITEM DANS LE ARRAY CORRESPONDANT
        if (itemsBox == ingredientsBox) {
            ingredientsTags.splice(ingredientsTags.indexOf(item.textContent), 1);
        }
        else if (itemsBox == applianceBox) {
            applianceTags.splice(applianceTags.indexOf(item.textContent), 1);
        }
        else if (itemsBox == ustensilsBox) {
            ustensilsTags.splice(ustensilsTags.indexOf(item.textContent), 1);
        }

        let noFilter = true;
        //////////////////////////////////// SI TAG INGREDIENT ACTIF
        if (ingredientsTags.length > 0) {
            recipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredients => {
                    if (ingredientsTags.includes(ingredients.ingredient.toLowerCase())) {
                        filteredRecipes.push(recipe);
                    }
                })
            })
            noFilter = false;
        }
        //////////////////////////////////// SI TAG APPAREIL ACTIF
        if (applianceTags.length > 0) {
            recipes.forEach(recipe => {
                if (applianceTags.includes(recipe.appliance.toLowerCase())) {
                    filteredRecipes.push(recipe);
                }
            })
            noFilter = false;
        }
        //////////////////////////////////// SI TAG USTENSILE ACTIF
        if (ustensilsTags.length > 0) {
            recipes.forEach(recipe => {
                recipe.ustensils.forEach(ustensil => {
                    if (ustensilsTags.includes(ustensil.toLowerCase())) {
                        filteredRecipes.push(recipe);
                    }
                })
            })
            noFilter = false;
        }
        ///////////////////////////////// SI PAS DE TAG ACTIF => RECUP RECETTES GLOBALES
        if (noFilter) {
            filteredRecipes = [...recipes];
        }
        //////////////////////////////////// SI RECHERCHE PRINCIPALE ACTIVE => FILTRER SUR LE MOT CLÉ
        if (searchBar.value.length > 2) {
            filteredRecipes = filteredRecipes.filter(byMainSearch);
        }
        /////////// SUPPR DOUBLONS
        filteredRecipes = [...new Set(filteredRecipes)];
        ///////////////////////////////////////// SI AUCUN RESULTAT => MESSAGE ERREUR
        if (filteredRecipes.length === 0) {
            noResultMessage.style.display = 'block';
        }
        ///////////////////////////////////////////////////// ACTUALISATION DE L'AFFICHAGE
        recipesSection.innerHTML = "";
        displayRecipes(filteredRecipes, recipesSection);
        const filterTags = inititems(filteredRecipes);
        filteredIngredients = filterTags._ingredients;
        filteredAppliance = filterTags._appliances;
        filteredUstensils = filterTags._ustensils;
    })
}

