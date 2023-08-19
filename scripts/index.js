///////////////////////////////////////////////////////////////////////// ELEMENTS DOM //////////////////////////////////////////////////////////////////
const recipesSection = document.getElementById('recipes_section');
const ingredientsBox = document.getElementById('ingredientsBox');
const applianceBox = document.getElementById('applianceBox');
const ustensilsBox = document.getElementById('ustensilsBox');
const searchBar = document.getElementById('searchBar');
const noResultMessage = document.getElementById('noResultMessage');
////////////////////////////////////////////////////////////////// AFFICHAGE INITIAL RECETTES /////////////////////////////////////////////////////////////
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
function inititems(recipes) {
    let _ingredients = [];
    let _appliances = [];
    let _ustensils = [];
    ////////////////////////////////////// RECUPERATION DES ITEMS
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredients => {
            if (!_ingredients.includes(ingredients.ingredient.toLowerCase())) {
                _ingredients.push(ingredients.ingredient.toLowerCase());
            }
        })
        if (!_appliances.includes(recipe.appliance.toLowerCase())) {
            _appliances.push(recipe.appliance.toLowerCase());
        }
        recipe.ustensils.forEach(ustensil => {
            if (!_ustensils.includes(ustensil.toLowerCase())) {
                _ustensils.push(ustensil.toLowerCase());
            }
        })
    })
    //////////// suppression des doublons
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
    let output = false;
    ingredients.forEach(ingredient => {
        if (ingredient.ingredient.toLowerCase().includes(searchBar.value.toLowerCase())) {
            output = true;
        }
    })
    return output;
}
function byMainSearch(recipe) {
    if (recipe.name.toLowerCase().includes(searchBar.value.toLowerCase()) || recipe.description.toLowerCase().includes(searchBar.value.toLowerCase()) || checkIngredients(recipe.ingredients)) {
        return recipe;
    }
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
                recipes.forEach(recipe => {
                    recipe.ingredients.forEach(ingredients => {
                        if (ingredientsTags.includes(ingredients.ingredient.toLowerCase())) {
                            filteredRecipes.push(recipe);
                        }
                    })
                })
                noFilter = false;
            }
            //////////////////////////////////// RECUPERATION DES TAGS APPAREIL ACTIFS
            if (applianceTags.length > 0) {
                recipes.forEach(recipe => {
                    if (applianceTags.includes(recipe.appliance.toLowerCase())) {
                        filteredRecipes.push(recipe);
                    }
                })
                noFilter = false;
            }
            //////////////////////////////////// RECUPERATION DES TAGS USTENSILE ACTIFS
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
            //////////////////////// SI AUCUN TAG => RECUPERER RECETTES GLOBALES
            if (noFilter) {
                filteredRecipes = [...recipes];
            }
            //////////////////////////////// FILTRE SUR LA RECHERCHE PRINCIPALE
            filteredRecipes = filteredRecipes.filter(byMainSearch);
            ////////////////////////////////////// SUPPR DOUBLONS
            filteredRecipes = [...new Set(filteredRecipes)];
        }
        ///////////////////////////////////////////////////////////////////////////// SI AJOUT DE CARACTERES
        else {
            //////////////////////////////// FILTRE SUR LA RECHERCHE PRINCIPALE
            filteredRecipes = filteredRecipes.filter(byMainSearch);
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
///////////////////////////////////////////////////// RECHERCHE DANS CHAMP INGREDIENTS
ingredientsInput.addEventListener('input', () => {
    const searchedIngredients = filteredIngredients.filter(function (ingredient) {
        return ingredient.includes(ingredientsInput.value.toLowerCase())
    });
    ingredientsBox.innerHTML = "";
    displayItems(searchedIngredients, ingredientsBox);
})
///////////////////////////////////////////////////// RECHERCHE DANS CHAMP APPAREILS
applianceInput.addEventListener('input', () => {
    const searchedAppliance = filteredAppliance.filter(appliance => {
        if (appliance.includes(applianceInput.value.toLowerCase())) {
            return true;
        }
        return false
    });
    applianceBox.innerHTML = "";
    displayItems(searchedAppliance, applianceBox);
})
///////////////////////////////////////////////////// RECHERCHE DANS CHAMP USTENSILES
ustensilsInput.addEventListener('input', () => {
    const searchedUstensils = filteredUstensils.filter(ustensil => ustensil.includes(ustensilsInput.value.toLowerCase()));
    ustensilsBox.innerHTML = "";
    displayItems(searchedUstensils, ustensilsBox);
})

