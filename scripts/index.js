////////////////////////////////////////////////////////////////// AFFICHAGE INITIAL RECETTES ///////////////////////////////////////////////////////////////
const recipesSection = document.getElementById('recipes_section');
displayRecipes(recipes, recipesSection);
////////////////////////////////////////////////////////////////// FONCTION GESTION DES ITEMS
const ingredientsBox = document.getElementById('ingredientsBox');
const applianceBox = document.getElementById('applianceBox');
const ustensilsBox = document.getElementById('ustensilsBox');
////////////////////////////// extraction des ingrédients/appareils/ustensiles des recettes fournies + affichage des items recettes en cours
function inititems(_recipes) {
    let _ingredients = [];
    let _appliances = [];
    let _ustensils = [];

    _recipes.forEach(_recipe => {
        _recipe.ingredients.forEach(ingredients => {
            if (!_ingredients.includes(ingredients.ingredient.toLowerCase())) {
                _ingredients.push(ingredients.ingredient.toLowerCase());
            }
        })
        if (!_appliances.includes(_recipe.appliance.toLowerCase())) {
            _appliances.push(_recipe.appliance.toLowerCase());
        }
        _recipe.ustensils.forEach(ustensil => {
            if (!_ustensils.includes(ustensil.toLowerCase())) {
                _ustensils.push(ustensil.toLowerCase());
            }
        })
    })
    /////////// SUPPR DOUBLONS
    _appliances = [...new Set(_appliances)];
    _ingredients = [...new Set(_ingredients)];
    _ustensils = [...new Set(_ustensils)];
    ////////////////////////////////////////////////////////// MAJ AFFICHAGE
    displayItems(_ingredients, ingredientsBox);
    displayItems(_appliances, applianceBox);
    displayItems(_ustensils, ustensilsBox);

    return { _appliances, _ustensils, _ingredients };
}
////////////////////////////////////////////////////////////////// AFFICHAGE INITIAL ITEMS ///////////////////////////////////////////////////////////////
let ingredients = [];
let appliance = [];
let ustensils = [];
const tags = inititems(recipes);
ingredients = tags._ingredients;
appliance = tags._appliances;
ustensils = tags._ustensils;
/////////////////////////////////////////////////////////////////// FONCTIONS BARRE DE RECHERCHE PRINC //////////////////////////////////////////////////////////
function checkIngredients(ingredients) {
    let output = false;
    ingredients.forEach(ingredient => {
        if (ingredient.ingredient.toLowerCase().includes(searchBar.value.toLowerCase())) {
            output = true;
        }
    })
    return output;
}
function searchByText(recipe) {
    if (recipe.name.toLowerCase().includes(searchBar.value.toLowerCase()) || recipe.description.toLowerCase().includes(searchBar.value.toLowerCase()) || checkIngredients(recipe.ingredients)) {
        return recipe;
    }
}
const searchBar = document.getElementById('searchBar');
let filteredRecipes = [...recipes];
let filteredIngredients = [...ingredients];
let filteredAppliance = [...appliance];
let filteredUstensils = [...ustensils];

let caractersCount = 0;
const noResultMessage = document.getElementById('noResultMessage');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////// BARRE DE RECHERCHE PRINCIPALE //////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
searchBar.addEventListener('input', () => {
    ///////////////////////////////////////////////// A PARTIR DE 3 CARACTERES => FILTRER RECETTES & TAGS
    if (searchBar.value.length > 2) {
        noResultMessage.style.display = 'none';
        //////////////////////////////////// SI SUPPRESSION DE CARACTERES => FILTRER A PARTIR DES RECETTES GLOBALES
        if (searchBar.value.length < caractersCount) {
            filteredRecipes = recipes.filter(searchByText);
            const filterTags = inititems(filteredRecipes);
            filteredIngredients = filterTags._ingredients;
            filteredAppliance = filterTags._appliances;
            filteredUstensils = filterTags._ustensils;
            recipesSection.innerHTML = "";
            displayRecipes(filteredRecipes, recipesSection);
        }
        //////////////////////////////////// SI AJOUT DE CARACTERES => FILTRER filteredRecipes AU FUR ET A MESURE
        else {
            filteredRecipes = filteredRecipes.filter(searchByText);
            const filterTags = inititems(filteredRecipes);
            filteredIngredients = filterTags._ingredients;
            filteredAppliance = filterTags._appliances;
            filteredUstensils = filterTags._ustensils;
            recipesSection.innerHTML = "";
            displayRecipes(filteredRecipes, recipesSection);
        }
        //////////////////////////////////// SI AUCUN RESULTAT => MESSAGE ERREUR
        if (filteredRecipes.length === 0) {
            noResultMessage.style.display = 'block';
        }
    }
    //////////////////////////////////////////////////////// EN DESSOUS DE 3 CARACTERES => AFFICHER TOUTES LES RECETTES
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

///////////////////////////////////////////////////// SAISIE DANS CHAMP DE RECH INGREDIENTS => FILTRAGE DES TAGS
ingredientsInput.addEventListener('input', () => {
    const tempFilteredIngredients = filteredIngredients.filter(function (ingredient) {
        return ingredient.includes(ingredientsInput.value.toLowerCase())
    });
    ingredientsBox.innerHTML = "";
    displayItems(tempFilteredIngredients, ingredientsBox);
})
///////////////////////////////////////////////////// SAISIE DANS CHAMP DE RECH APPAREILS => FILTRAGE DES TAGS
applianceInput.addEventListener('input', () => {
    const tempFilteredAppliance = filteredAppliance.filter(appliance => {
        if (appliance.includes(applianceInput.value.toLowerCase())) {
            return true;
        }
        return false
    });
    applianceBox.innerHTML = "";
    displayItems(tempFilteredAppliance, applianceBox);
})
///////////////////////////////////////////////////// SAISIE DANS CHAMP DE RECH USTENSILES => FILTRAGE DES TAGS 
ustensilsInput.addEventListener('input', () => {
    const tempFilteredUstensils = filteredUstensils.filter(ustensil => ustensil.includes(ustensilsInput.value.toLowerCase()));
    ustensilsBox.innerHTML = "";
    displayItems(tempFilteredUstensils, ustensilsBox);
})

