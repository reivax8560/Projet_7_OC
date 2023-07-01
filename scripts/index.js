////////////////////////////////////////////////////////////////// AFFICHAGE INITIAL RECETTES ///////////////////////////////////////////////////////////////
const recipesSection = document.getElementById('recipes_section');
displayRecipes(recipes, recipesSection);
////////////////////////////////////////////////////////////////// FONCTION GESTION TAGS
const ingredientsBox = document.getElementById('ingredientsBox');
const applianceBox = document.getElementById('applianceBox');
const ustensilsBox = document.getElementById('ustensilsBox');

function initTags(_recipes) {
    let _ingredients = [];
    let _appliances = [];
    let _ustensils = [];
    for (let i = 0; i < _recipes.length; i++) {
        ///////////////////////////////////////////////////////// TAGS INGREDIENTS
        for (let j = 0; j < _recipes[i].ingredients.length; j++) {
            if (!_ingredients.includes(_recipes[i].ingredients[j].ingredient.toLowerCase())) {
                _ingredients.push(_recipes[i].ingredients[j].ingredient.toLowerCase());
            }
        }
        ////////////////////////////////////////////////////////// TAGS APPAREILS
        if (!_appliances.includes(_recipes[i].appliance.toLowerCase())) {
            _appliances.push(_recipes[i].appliance.toLowerCase());
        }
        ////////////////////////////////////////////////////////// TAGS USTENSILES
        for (let j = 0; j < _recipes[i].ustensils.length; j++) {
            if (!_ustensils.includes(_recipes[i].ustensils[j].toLowerCase())) {
                _ustensils.push(_recipes[i].ustensils[j].toLowerCase());
            }
        }
    }
    /////////// SUPPR DOUBLONS
    _appliances = [...new Set(_appliances)];
    _ingredients = [...new Set(_ingredients)];
    _ustensils = [...new Set(_ustensils)];
    ////////////////////////////////////////////////////////// MAJ AFFICHAGE
    // const ingredientsBox = document.getElementById('ingredientsBox');
    displayTags(_ingredients, ingredientsBox);
    // const applianceBox = document.getElementById('applianceBox');
    displayTags(_appliances, applianceBox);
    // const ustensilsBox = document.getElementById('ustensilsBox');
    displayTags(_ustensils, ustensilsBox);

    return { _appliances, _ustensils, _ingredients };
}
////////////////////////////////////////////////////////////////// AFFICHAGE INITIAL TAGS ///////////////////////////////////////////////////////////////
let ingredients = [];
let appliance = [];
let ustensils = [];
const tags = initTags(recipes);
ingredients = tags._ingredients;
appliance = tags._appliances;
ustensils = tags._ustensils;
//////////////////////////////////////////////////////////////////// BARRE DE RECHERCHE PRINC /////////////////////////////////////////////////////////////////
function checkIngredients(ingredients, text) {
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].ingredient.toLowerCase().includes(text)) {
            return true;
        }
    }
    return false;
}
function filterByText(searchRecipes, searchText) {
    const recipesOutput = [];
    for (let i = 0; i < searchRecipes.length; i++) {
        const recipe = searchRecipes[i];
        if (recipe.name.toLowerCase().includes(searchText) || recipe.description.toLowerCase().includes(searchText) || checkIngredients(recipe.ingredients, searchText)) {
            recipesOutput.push(recipe);
        }
    }
    return recipesOutput;
}

const searchBar = document.getElementById('searchBar');
let filteredRecipes = [...recipes];
let filteredIngredients = [...ingredients];
let filteredAppliance = [...appliance];
let filteredUstensils = [...ustensils];

let caractersCount = 0;
const noResultMessage = document.getElementById('noResultMessage');

searchBar.addEventListener('input', () => {
    ///////////////////////////////////////////////// A PARTIR DE 3 CARACTERES => FILTRER RECETTES & TAGS
    if (searchBar.value.length > 2) {
        // si on supprime des caractères => on repart sur l'intégralité des recettes
        if (searchBar.value.length < caractersCount) {
            filteredRecipes = filterByText(recipes, searchBar.value.toLowerCase());
            const filterTags = initTags(filteredRecipes);
            filteredIngredients = filterTags._ingredients;
            filteredAppliance = filterTags._appliances;
            filteredUstensils = filterTags._ustensils;
            recipesSection.innerHTML = "";
            displayRecipes(filteredRecipes, recipesSection);
            if (filteredRecipes.value == undefined) {
                noResultMessage.style.display = 'block';
            } else {
                noResultMessage.style.display = 'none';
            }
        }
        // si on ajoute des caractères => on refiltre filteredRecpies au fur et à mesure
        else {
            caractersCount = searchBar.value.length;
            filteredRecipes = filterByText(filteredRecipes, searchBar.value.toLowerCase());
            const filterTags = initTags(filteredRecipes);
            filteredIngredients = filterTags._ingredients;
            filteredAppliance = filterTags._appliances;
            filteredUstensils = filterTags._ustensils;
            recipesSection.innerHTML = "";
            displayRecipes(filteredRecipes, recipesSection);
            if (filteredRecipes.value == undefined) {
                noResultMessage.style.display = 'block';
            } else {
                noResultMessage.style.display = 'none';
            }
            // console.log(filteredRecipes.value)
        }
    }
    //////////////////////////////////////////////////////// EN DESSOUS DE 3 CARACTERES => AFFICHAGE GLOBAL
    else {
        filteredRecipes = [...recipes];
        filteredIngredients = [...ingredients];
        filteredAppliance = [...appliance];
        filteredUstensils = [...ustensils];

        recipesSection.innerHTML = "";
        displayRecipes(filteredRecipes, recipesSection);
        ingredientsBox.innerHTML = "";
        displayTags(filteredIngredients, ingredientsBox);
        applianceBox.innerHTML = "";
        displayTags(filteredAppliance, applianceBox);
        ustensilsBox.innerHTML = "";
        displayTags(filteredUstensils, ustensilsBox);
    }
});
/////////////////////////////////////////////////////////////////// CHAMPS DE RECHERCHE AVANCEE //////////////////////////////////////////////////////////////
const ingredientsInput = document.getElementById('ingredientsInput');
const applianceInput = document.getElementById('applianceInput');
const ustensilsInput = document.getElementById('ustensilsInput');
const ingredientsBtn = document.getElementById('ingredientsBtn');
const applianceBtn = document.getElementById('applianceBtn');
const ustensilsBtn = document.getElementById('ustensilsBtn');

ingredientsBtn.addEventListener('click', () => {
    ingredientsBtn.style.display = 'none';
    ingredientsInput.style.display = 'flex';
    ingredientsBox.style.display = 'grid';
    applianceBtn.style.display = 'flex';
    applianceInput.style.display = 'none';
    applianceBox.style.display = 'none';
    ustensilsBtn.style.display = 'flex';
    ustensilsInput.style.display = 'none';
    ustensilsBox.style.display = 'none';
})
applianceBtn.addEventListener('click', () => {
    applianceBtn.style.display = 'none';
    applianceInput.style.display = 'flex';
    applianceBox.style.display = 'grid';
    ingredientsBtn.style.display = 'flex';
    ingredientsInput.style.display = 'none';
    ingredientsBox.style.display = 'none';
    ustensilsBtn.style.display = 'flex';
    ustensilsInput.style.display = 'none';
    ustensilsBox.style.display = 'none';
})
ustensilsBtn.addEventListener('click', () => {
    ustensilsBtn.style.display = 'none';
    ustensilsInput.style.display = 'flex';
    ustensilsBox.style.display = 'grid';
    ingredientsBtn.style.display = 'flex';
    ingredientsInput.style.display = 'none';
    ingredientsBox.style.display = 'none';
    applianceBtn.style.display = 'flex';
    applianceInput.style.display = 'none';
    applianceBox.style.display = 'none';
})

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
///////////////////////////////////////////////////// SAISIE DANS CHAMP DE RECH INGREDIENTS => FILTRAGE DES TAGS
ingredientsInput.addEventListener('input', () => {
    const tempFilteredIngredients = filterByIngredients(filteredIngredients, ingredientsInput.value.toLowerCase());
    ingredientsBox.innerHTML = "";
    displayTags(tempFilteredIngredients, ingredientsBox);
})
///////////////////////////////////////////////////// SAISIE DANS CHAMP DE RECH APPAREILS => FILTRAGE DES TAGS
applianceInput.addEventListener('input', () => {
    const tempFilteredAppliance = filterByAppliance(filteredAppliance, applianceInput.value.toLowerCase());
    applianceBox.innerHTML = "";
    displayTags(tempFilteredAppliance, applianceBox);
})
///////////////////////////////////////////////////// SAISIE DANS CHAMP DE RECH USTENSILES => FILTRAGE DES TAGS 
ustensilsInput.addEventListener('input', () => {
    const tempFilteredUstensils = filterByUstensils(filteredUstensils, ustensilsInput.value.toLowerCase());
    ustensilsBox.innerHTML = "";
    displayTags(tempFilteredUstensils, ustensilsBox);
})
