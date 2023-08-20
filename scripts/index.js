///////////////////////////////////////////////////////////////////////// ELEMENTS DOM //////////////////////////////////////////////////////////////////
const recipesSection = document.getElementById('recipes_section');
const ingredientsBox = document.getElementById('ingredientsBox');
const applianceBox = document.getElementById('applianceBox');
const ustensilsBox = document.getElementById('ustensilsBox');
const searchBar = document.getElementById('searchBar');
const noResultMessage = document.getElementById('noResultMessage');
////////////////////////////////////////////////////////////////// AFFICHAGE INITIAL RECETTES ///////////////////////////////////////////////////////////////
displayRecipes(recipes, recipesSection);
////////////////////////////////////////////////////////////////// AFFICHAGE INITIAL ITEMS ///////////////////////////////////////////////////////////////
let ingredients = [];
let appliance = [];
let ustensils = [];

const tags = inititems(recipes);
ingredients = tags._ingredients;
appliance = tags._appliances;
ustensils = tags._ustensils;

let filteredIngredients = [...ingredients];
let filteredAppliance = [...appliance];
let filteredUstensils = [...ustensils];
//////////////////////////////////////////////////////////// FONCTION GESTION DES ITEMS
function inititems(_recipes) {
    let _ingredients = [];
    let _appliances = [];
    let _ustensils = [];
    ////////////////////////////////////// RECUPERATION DES ITEMS
    for (let i = 0; i < _recipes.length; i++) {
        for (let j = 0; j < _recipes[i].ingredients.length; j++) {
            if (!_ingredients.includes(_recipes[i].ingredients[j].ingredient.toLowerCase())) {
                _ingredients.push(_recipes[i].ingredients[j].ingredient.toLowerCase());
            }
        }
        if (!_appliances.includes(_recipes[i].appliance.toLowerCase())) {
            _appliances.push(_recipes[i].appliance.toLowerCase());
        }
        for (let j = 0; j < _recipes[i].ustensils.length; j++) {
            if (!_ustensils.includes(_recipes[i].ustensils[j].toLowerCase())) {
                _ustensils.push(_recipes[i].ustensils[j].toLowerCase());
            }
        }
    }
    //////////////////////// SUPPR DOUBLONS
    _appliances = [...new Set(_appliances)];
    _ingredients = [...new Set(_ingredients)];
    _ustensils = [...new Set(_ustensils)];
    /////////////////////////////////////////// AFFICHAGE DES ITEMS
    displayItems(_ingredients, ingredientsBox);
    displayItems(_appliances, applianceBox);
    displayItems(_ustensils, ustensilsBox);

    return { _appliances, _ustensils, _ingredients };
}

///////////////////////////////////////////////////////////// BARRE DE RECHERCHE PRINCIPALE //////////////////////////////////////////////////////////
let filteredRecipes = [...recipes];
let ingredientsTags = [];
let applianceTags = [];
let ustensilsTags = [];
let caractersCount = 0;
///////////////////////////////////////////////////// FONCTIONS DE FILTRE
function checkIngredients(ingredients) {
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].ingredient.toLowerCase().includes(searchBar.value.toLowerCase())) {
            return true;
        }
    }
    return false;
}
function byMainSearch(recipes) {
    const recipesOutput = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        if (recipe.name.toLowerCase().includes(searchBar.value.toLowerCase()) || recipe.description.toLowerCase().includes(searchBar.value.toLowerCase()) || checkIngredients(recipe.ingredients)) {
            recipesOutput.push(recipe);
        }
    }
    return recipesOutput;
}

searchBar.addEventListener('input', () => {
    ////////////////////////////////////////////////////////////////////////////////////// A PARTIR DE 3 CARACTERES => FILTRER RECETTES
    if (searchBar.value.length > 2) {
        noResultMessage.style.display = 'none';
        ///////////////////////////////////////////////////////////////////// SI SUPPRESSION DE CARACTERES
        if (searchBar.value.length < caractersCount) {

            filteredRecipes = [];
            let noFilter = true;
            //////////////////////////////////// RECUPERATION DES TAGS INGREDIENT ACTIFS
            if (ingredientsTags.length > 0) {
                for (let i = 0; i < recipes.length; i++) {
                    for (let j = 0; j < recipes[i].ingredients.length; j++) {
                        if (ingredientsTags.includes(recipes[i].ingredients[j].ingredient.toLowerCase())) {
                            filteredRecipes.push(recipes[i]);
                        }
                    }
                }
                noFilter = false;
            }
            //////////////////////////////////// RECUPERATION DES TAGS APPAREIL ACTIFS
            if (applianceTags.length > 0) {
                for (let i = 0; i < recipes.length; i++) {
                    if (applianceTags.includes(recipes[i].appliance.toLowerCase())) {
                        filteredRecipes.push(recipes[i]);
                    }
                }
                noFilter = false;
            }
            //////////////////////////////////// RECUPERATION DES TAGS USTENSILE ACTIFS
            if (ustensilsTags.length > 0) {
                for (let i = 0; i < recipes.length; i++) {
                    for (let j = 0; j < recipes[i].ustensils.length; j++) {
                        if (ustensilsTags.includes(recipes[i].ustensils[j].toLowerCase())) {
                            filteredRecipes.push(recipes[i]);
                        }
                    }
                }
                noFilter = false;
            }
            //////////////////////// SI AUCUN TAG => RECUPERER RECETTES GLOBALES
            if (noFilter) {
                filteredRecipes = [...recipes];
            }
            //////////////////////////////// FILTRE SUR LA RECHERCHE PRINCIPALE
            filteredRecipes = byMainSearch(recipes);
            ////////////////////////////////////// SUPPR DOUBLONS
            filteredRecipes = [...new Set(filteredRecipes)];
        }
        ///////////////////////////////////////////////////////////////////////////// SI AJOUT DE CARACTERES
        else {
            //////////////////////////////// FILTRE SUR LA RECHERCHE PRINCIPALE
            filteredRecipes = byMainSearch(filteredRecipes);
            caractersCount = searchBar.value.length;
        }
        ///////////////////////////////////////////////////////////////// SI AUCUN RESULTAT => MESSAGE ERREUR
        if (filteredRecipes.length === 0) {
            noResultMessage.style.display = 'block';
        }
        /////////////////////////////////////////////////////////////////////////// ACTUALISATION AFFICHAGE
        recipesSection.innerHTML = "";
        displayRecipes(filteredRecipes, recipesSection);
        const filterTags = inititems(filteredRecipes);
        filteredIngredients = filterTags._ingredients;
        filteredAppliance = filterTags._appliances;
        filteredUstensils = filterTags._ustensils;
    }
    ///////////////////////////////////////////////////////////////////////// EN DESSOUS DE 3 CARACTERES => AFFICHER RECETTES GLOBALES
    else {
        noResultMessage.style.display = 'none';

        filteredRecipes = [...recipes];
        filteredIngredients = [...ingredients];
        filteredAppliance = [...appliance];
        filteredUstensils = [...ustensils];

        recipesSection.innerHTML = "";
        displayRecipes(filteredRecipes, recipesSection);
        const filterTags = inititems(filteredRecipes);
        filteredIngredients = filterTags._ingredients;
        filteredAppliance = filterTags._appliances;
        filteredUstensils = filterTags._ustensils;
    }
});
/////////////////////////////////////////////////////////////////// CHAMPS DE RECHERCHE AVANCEE //////////////////////////////////////////////////////////////
const ingredientsInput = document.getElementById('ingredientsInput');
const ingredientsBtn = document.getElementById('ingredientsBtn');
const ingredientsChevron = document.getElementById('ingredientsChevron');
const applianceInput = document.getElementById('applianceInput');
const applianceBtn = document.getElementById('applianceBtn');
const applianceChevron = document.getElementById('applianceChevron');
const ustensilsInput = document.getElementById('ustensilsInput');
const ustensilsBtn = document.getElementById('ustensilsBtn');
const ustensilsChevron = document.getElementById('ustensilsChevron');
////////////////////////////////////////////////////////////////// GESTION AFFICHAGE BOUTONS DE RECHERCHE PAR ITEM
ingredientsBtn.addEventListener('click', () => {
    ingredientsBtn.style.display = 'none';
    ingredientsInput.style.display = 'flex';
    ingredientsBox.style.display = 'grid';
    ingredientsChevron.style.display = 'flex';
    applianceBtn.style.display = 'flex';
    applianceInput.style.display = 'none';
    applianceBox.style.display = 'none';
    applianceChevron.style.display = 'none';
    ustensilsBtn.style.display = 'flex';
    ustensilsInput.style.display = 'none';
    ustensilsBox.style.display = 'none';
    ustensilsChevron.style.display = 'none';
})
applianceBtn.addEventListener('click', () => {
    applianceBtn.style.display = 'none';
    applianceInput.style.display = 'flex';
    applianceBox.style.display = 'grid';
    applianceChevron.style.display = 'flex';
    ingredientsBtn.style.display = 'flex';
    ingredientsInput.style.display = 'none';
    ingredientsBox.style.display = 'none';
    ingredientsChevron.style.display = 'none';
    ustensilsBtn.style.display = 'flex';
    ustensilsInput.style.display = 'none';
    ustensilsBox.style.display = 'none';
    ustensilsChevron.style.display = 'none';
})
ustensilsBtn.addEventListener('click', () => {
    ustensilsBtn.style.display = 'none';
    ustensilsInput.style.display = 'flex';
    ustensilsBox.style.display = 'grid';
    ustensilsChevron.style.display = 'flex';
    ingredientsBtn.style.display = 'flex';
    ingredientsInput.style.display = 'none';
    ingredientsBox.style.display = 'none';
    ingredientsChevron.style.display = 'none';
    applianceBtn.style.display = 'flex';
    applianceInput.style.display = 'none';
    applianceBox.style.display = 'none';
    applianceChevron.style.display = 'none';
})
////////////////////////////////////////////////////////////////// GESTION DU CLIC SUR LES CHEVRONS
ingredientsChevron.addEventListener('click', () => {
    ingredientsBtn.style.display = 'flex';
    ingredientsInput.style.display = 'none';
    ingredientsBox.style.display = 'none';
    ingredientsChevron.style.display = 'none';
})
applianceChevron.addEventListener('click', () => {
    applianceBtn.style.display = 'flex';
    applianceInput.style.display = 'none';
    applianceBox.style.display = 'none';
    applianceChevron.style.display = 'none';
})
ustensilsChevron.addEventListener('click', () => {
    ustensilsBtn.style.display = 'flex';
    ustensilsInput.style.display = 'none';
    ustensilsBox.style.display = 'none';
    ustensilsChevron.style.display = 'none';
})
/////////////////////////////////////// FONCTIONS DE RECHERCHE PAR ITEMS
function filterByIngredients(searchIngredients, searchText) {
    const output = [];
    for (let i = 0; i < searchIngredients.length; i++) {
        const ingredient = searchIngredients[i];
        if (ingredient.includes(searchText)) {
            output.push(ingredient);
        }
    }
    return output;
}
function filterByAppliance(searchAppliance, searchText) {
    const output = [];
    for (let i = 0; i < searchAppliance.length; i++) {
        const appliance = searchAppliance[i];
        if (appliance.includes(searchText)) {
            output.push(appliance);
        }
    }
    return output;
}
function filterByUstensils(searchUstensils, searchText) {
    const output = [];
    for (let i = 0; i < searchUstensils.length; i++) {
        const ustensil = searchUstensils[i];
        if (ustensil.includes(searchText)) {
            output.push(ustensil);
        }
    }
    return output;
}
///////////////////////////////////////////////////// RECHERCHE DANS CHAMP INGREDIENTS
ingredientsInput.addEventListener('input', () => {
    const searchedIngredients = filterByIngredients(filteredIngredients, ingredientsInput.value.toLowerCase());
    ingredientsBox.innerHTML = "";
    displayItems(searchedIngredients, ingredientsBox);
})
///////////////////////////////////////////////////// RECHERCHE DANS CHAMP APPAREILS
applianceInput.addEventListener('input', () => {
    const searchedAppliance = filterByAppliance(filteredAppliance, applianceInput.value.toLowerCase());
    applianceBox.innerHTML = "";
    displayItems(searchedAppliance, applianceBox);
})
///////////////////////////////////////////////////// RECHERCHE DANS CHAMP USTENSILES
ustensilsInput.addEventListener('input', () => {
    const searchedUstensils = filterByUstensils(filteredUstensils, ustensilsInput.value.toLowerCase());
    ustensilsBox.innerHTML = "";
    displayItems(searchedUstensils, ustensilsBox);
})
