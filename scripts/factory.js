const main = document.querySelector('main');                                                // à supprimer
const nbRecettes = document.createElement('h2');                                            // à supprimer
main.prepend(nbRecettes);                                                                   // à supprimer

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

    nbRecettes.textContent = `${recipes.length} recettes`;                                          // à supprimer
}
/////////////////////////////////////////////////////////////////// AFFICHAGE ITEMS ////////////////////////////////////////////////////////////////
function displayItems(items, itemsBox) {
    itemsBox.innerHTML = "";
    ///////////////////////////////////////////////// CREATION DE CHAQUE ITEM
    for (let i = 0; i < items.length; i++) {
        const item = document.createElement('li');
        item.className = "item";
        item.textContent = items[i];
        itemsBox.append(item);

        /////////////////////////////////////////////////////////// AU "CLICK" SUR UN ITEM => FILTRER RECETTES
        item.addEventListener('click', () => {
            noResultMessage.style.display = 'none';
            displayTag(item, itemsBox);
            const tempFilteredRecipes = [];
            ///////////////////////////////// ITEM INGREDIENT
            if (itemsBox == ingredientsBox) {
                for (let a = 0; a < filteredRecipes.length; a++) {
                    for (let j = 0; j < filteredRecipes[a].ingredients.length; j++) {
                        if (filteredRecipes[a].ingredients[j].ingredient.toLowerCase() === items[i]) {
                            tempFilteredRecipes.push(filteredRecipes[a]);
                        }
                    }
                }
                ingredientsTags.push(items[i]);
            }
            //////////////////////////////////// ITEM APPAREIL
            else if (itemsBox == applianceBox) {
                for (let a = 0; a < filteredRecipes.length; a++) {
                    if (filteredRecipes[a].appliance.toLowerCase() === items[i]) {
                        tempFilteredRecipes.push(filteredRecipes[a]);
                    }
                }
                applianceTags.push(items[i]);
            }
            //////////////////////////////////// ITEM USTENSILE
            else if (itemsBox == ustensilsBox) {
                for (let a = 0; a < filteredRecipes.length; a++) {
                    for (let j = 0; j < filteredRecipes[a].ustensils.length; j++) {
                        if (filteredRecipes[a].ustensils[j].toLowerCase() === items[i]) {
                            tempFilteredRecipes.push(filteredRecipes[a]);
                        }
                    }
                }
                ustensilsTags.push(items[i]);
            }
            ///////////////////////////////////////////////
            filteredRecipes = [...tempFilteredRecipes];
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
    }
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
        let tempFilteredRecipes = [];
        ////////////////////////////////////////////////////// SUPPRESSION DU TAG
        selectedTagsArea.removeChild(tagBtn);
        ///////////////// SUPPRESSION DE L'ITEM DANS LE ARRAY CORRESPONDANT
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
            for (let a = 0; a < recipes.length; a++) {
                for (let j = 0; j < recipes[a].ingredients.length; j++) {
                    if (ingredientsTags.includes(recipes[a].ingredients[j].ingredient.toLowerCase())) {
                        tempFilteredRecipes.push(recipes[a]);
                    }
                }
            }
            noFilter = false;
        }
        //////////////////////////////////// SI TAG APPAREIL ACTIF
        if (applianceTags.length > 0) {
            for (let a = 0; a < recipes.length; a++) {
                if (applianceTags.includes(recipes[a].appliance.toLowerCase())) {
                    tempFilteredRecipes.push(recipes[a]);
                }
            }
            noFilter = false;
        }
        //////////////////////////////////// SI TAG USTENSILE ACTIF
        if (ustensilsTags.length > 0) {
            for (let a = 0; a < recipes.length; a++) {
                for (let j = 0; j < recipes[a].ustensils.length; j++) {
                    if (ustensilsTags.includes(recipes[a].ustensils[j].toLowerCase())) {
                        tempFilteredRecipes.push(recipes[a]);
                    }
                }
            }
            noFilter = false;
        }
        ///////////////////////////////////////////////
        filteredRecipes = [...tempFilteredRecipes];
        ///////////////////////////////// SI PAS DE TAG ACTIF => RECUP RECETTES GLOBALES
        if (noFilter) {
            filteredRecipes = [...recipes];
        }
        //////////////////////////////////// SI RECHERCHE PRINCIPALE ACTIVE => FILTRER SUR LE MOT CLÉ
        if (searchBar.value.length > 2) {
            filteredRecipes = byMainSearch(filteredRecipes);
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

