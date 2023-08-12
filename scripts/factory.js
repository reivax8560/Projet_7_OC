const main = document.querySelector('main');
const nbRecettes = document.createElement('h2');
main.prepend(nbRecettes);
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
        recipe.ingredients.forEach(element => {
            const ingredient = document.createElement('p');
            ingredient.append(element.ingredient);
            if (element.quantity) {
                ingredient.append(" : ");
                ingredient.append(element.quantity);
            }
            if (element.unit) {
                ingredient.append(" ");
                ingredient.append(element.unit);
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

    nbRecettes.textContent = `${recipes.length} recettes`;
}
/////////////////////////////////////////////////////////////////// AFFICHAGE ITEMS ////////////////////////////////////////////////////////////////
let ingredientsTags = [];
let applianceTags = [];
let ustensilsTags = [];

function displayItems(items, itemsBox) {
    itemsBox.innerHTML = "";
    ///////////////////////////////////////////////// CREATION DE CHAQUE ITEM
    items.forEach(element => {
        const item = document.createElement('li');
        item.className = "item";
        item.textContent = element;
        itemsBox.append(item);
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////// FILTRE PAR ITEM ///////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////// AU "CLICK" SUR UN ITEM
        item.addEventListener('click', () => {
            noResultMessage.style.display = 'none';
            displayTag(element, itemsBox);

            const tempFilteredRecipes = [];
            ///////////////////////////////// ITEM INGREDIENT
            if (itemsBox == ingredientsBox) {
                filteredRecipes.forEach(recipe => {
                    recipe.ingredients.forEach(ingredient => {
                        if (ingredient.ingredient.toLowerCase() === element) {
                            tempFilteredRecipes.push(recipe);
                        }
                    })
                })
                ingredientsTags.push(element);
            }
            //////////////////////////////////// ITEM APPAREIL
            else if (itemsBox == applianceBox) {
                filteredRecipes.forEach(recipe => {
                    if (recipe.appliance.toLowerCase() === element) {
                        tempFilteredRecipes.push(recipe);
                    }
                })
                applianceTags.push(element);
            }
            //////////////////////////////////// ITEM USTENSILE
            else if (itemsBox == ustensilsBox) {
                filteredRecipes.forEach(recipe => {
                    recipe.ustensils.forEach(ustensil => {
                        if (ustensil.toLowerCase() === element) {
                            tempFilteredRecipes.push(recipe);
                        }
                    })
                })
                ustensilsTags.push(element);
            }
            if (tempFilteredRecipes.length === 0) {
                noResultMessage.style.display = 'block';
            }
            filteredRecipes = [...tempFilteredRecipes];
            recipesSection.innerHTML = "";
            displayRecipes(filteredRecipes, recipesSection);
            inititems(filteredRecipes);
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

    /////////////////////////////////////////////////////// AU "CLICK" POUR SUPPRIMER UN TAG ///////////////////////////////////////////////////////
    deleteTagIcon.addEventListener('click', () => {
        ////////////////////////////////////// SUPPRESSION DU BOUTON
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
        //////////////////////////////////////////////////////////////////////////
        noResultMessage.style.display = 'none';
        let tempFilteredRecipes = [];
        let noFilter = true;
        //////////////////////////////////// SI TAG INGREDIENT ACTIF => REFILTRER
        if (ingredientsTags.length > 0) {
            recipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredients => {
                    if (ingredientsTags.includes(ingredients.ingredient.toLowerCase())) {
                        tempFilteredRecipes.push(recipe);
                    }
                })
            })
            noFilter = false;
        }
        //////////////////////////////////// SI TAG APPAREIL ACTIF => REFILTRER
        if (applianceTags.length > 0) {
            recipes.forEach(recipe => {
                if (applianceTags.includes(recipe.appliance.toLowerCase())) {
                    tempFilteredRecipes.push(recipe);
                }
            })
            noFilter = false;
        }
        //////////////////////////////////// SI TAG USTENSILE ACTIF => REFILTRER
        if (ustensilsTags.length > 0) {
            recipes.forEach(recipe => {
                recipe.ustensils.forEach(ustensil => {
                    if (ustensilsTags.includes(ustensil.toLowerCase())) {
                        tempFilteredRecipes.push(recipe);
                    }
                })
            })
            noFilter = false;
        }
        if (noFilter) {
            tempFilteredRecipes = [...recipes];
        }

        //////////////////////////////////// SI SEARCHBAR > 2 => FILTRER SUR LE MOT CLÉ
        if (searchBar.value.length > 2) {
            // tempFilteredRecipes = filterByText(tempFilteredRecipes, searchBar.value.toLowerCase());
            tempFilteredRecipes = recipes.filter(searchByText);
        }
        /////////// SUPPR DOUBLONS
        tempFilteredRecipes = [...new Set(tempFilteredRecipes)];
        ///////////////////////////////////////////////////// ACTUALISATION DE L'AFFICHAGE
        if (tempFilteredRecipes.length === 0) {
            noResultMessage.style.display = 'block';
        }
        filteredRecipes = [...tempFilteredRecipes];
        recipesSection.innerHTML = "";
        displayRecipes(filteredRecipes, recipesSection);
        inititems(filteredRecipes);
    })
}

