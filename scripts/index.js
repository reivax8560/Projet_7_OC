////////////////////////////////////////////////////////////////// AFFICHAGE INITIAL RECETTES ///////////////////////////////////////////////////////////////
const recipesSection = document.getElementById('recipes_section')
displayRecipes(recipes, recipesSection)
/////////////////////////// paragraphe pour avoir le nb de recettes à l'écran
const nbRecettesAffichees = document.createElement('span')
nbRecettesAffichees.textContent = recipes.length
const main = document.getElementById('main')
main.prepend(nbRecettesAffichees)
////////////////////////////////////////////////////////////////// AFFICHAGE INITIAL TAGS ///////////////////////////////////////////////////////////////
const ingredients = []
const appliance = []
const ustensils = []

for (let i = 0; i < recipes.length; i++) {
    ///////////////////////////////////////////////////////// TAGS INGREDIENTS
    for (let j = 0; j < recipes[i].ingredients.length; j++) {
        if (!ingredients.includes(recipes[i].ingredients[j].ingredient.toLowerCase())) {
            ingredients.push(recipes[i].ingredients[j].ingredient.toLowerCase())
        }
    }
    ////////////////////////////////////////////////////////// TAGS APPAREILS
    if (!appliance.includes(recipes[i].appliance.toLowerCase())) {
        appliance.push(recipes[i].appliance.toLowerCase())
    }
    for (let j = 0; j < recipes[i].ustensils.length; j++) {
        if (!ustensils.includes(recipes[i].ustensils[j].toLowerCase())) {
            ustensils.push(recipes[i].ustensils[j].toLowerCase())
        }
    }
}
const ingredientsBox = document.getElementById('ingredientsBox')
displayTags(ingredients, ingredientsBox)
const applianceBox = document.getElementById('applianceBox')
displayTags(appliance, applianceBox)
const ustensilsBox = document.getElementById('ustensilsBox')
displayTags(ustensils, ustensilsBox)

//////////////////////////////////////////////////////////////////// BARRE DE RECHERCHE /////////////////////////////////////////////////////////////////

const searchBar = document.getElementById('searchBar')
let filteredRecipes = []
let filteredIngredients = []
let filteredAppliance = []
let filteredUstensils = []
searchBar.addEventListener('input', () => {
    ////////////////////////////////////////////////////////// SI MIN 3 CARACTERES DANS BARRE RECHERCHE /////////////////////////////////////////////////
    if (searchBar.value.length > 2) {
        filteredRecipes = []
        filteredIngredients = []
        filteredAppliance = []
        filteredUstensils = []
        ////////////////////////////////////////////////////// SI MOT CLE DANS TITRE OU DESCRIPTION => AFFICHER RECETTE ET APPAREIL
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].name.toLowerCase().includes(searchBar.value.toLowerCase()) || recipes[i].description.toLowerCase().includes(searchBar.value.toLowerCase())) {
                filteredRecipes.push(recipes[i])
                if (!filteredAppliance.includes(recipes[i].appliance.toLowerCase())) {
                    filteredAppliance.push(recipes[i].appliance.toLowerCase())
                }
            }
            ////////////////////////////////////////////////// SI MOT CLE DANS TITRE OU DESCRIPTION => AFFICHER INGREDIENT
            for (let j = 0; j < recipes[i].ingredients.length; j++) {
                if (recipes[i].name.toLowerCase().includes(searchBar.value.toLowerCase()) || recipes[i].description.toLowerCase().includes(searchBar.value.toLowerCase())) {
                    filteredIngredients.push(recipes[i].ingredients[j].ingredient.toLowerCase())
                }
            }
            ////////////////////////////////////////////////// SI MOT CLE DANS TITRE OU DESCRIPTION => AFFICHER USTENSILE
            for (let j = 0; j < recipes[i].ustensils.length; j++) {
                if (recipes[i].name.toLowerCase().includes(searchBar.value.toLowerCase()) || recipes[i].description.toLowerCase().includes(searchBar.value.toLowerCase()) && !filteredUstensils.includes(recipes[i].ustensils[j].toLowerCase())) {
                    filteredUstensils.push(recipes[i].ustensils[j].toLowerCase())
                }
            }
        }
        filteredAppliance = [...new Set(filteredAppliance)]
        filteredIngredients = [...new Set(filteredIngredients)]
        filteredUstensils = [...new Set(filteredUstensils)]
        ////////////////////////////////////////////////////// AFFICHAGE DES RECETTES ET TAGS FILTRÉS
        recipesSection.innerHTML = ""
        displayRecipes(filteredRecipes, recipesSection)
        ingredientsBox.innerHTML = ""
        displayTags(filteredIngredients, ingredientsBox)
        applianceBox.innerHTML = ""
        displayTags(filteredAppliance, applianceBox)
        ustensilsBox.innerHTML = ""
        displayTags(filteredUstensils, ustensilsBox)

        nbRecettesAffichees.textContent = filteredRecipes.length
    }


    ////////////////////////////////////////////////////// SI MOINS DE 3 CARACTERES SAISIS & TABLEAU DEJA FILTRE ////////////////////////////////////////////
    else if (filteredRecipes.length < recipes.length) {
        // filteredRecipes = [...recipes]  // permet de faire une copie de recipes dans filteredRecipes => utilité ????????
        ////////////////////////////////////////////////////// AFFICHAGE TOUTES RECETTES ET TAGS
        recipesSection.innerHTML = ""
        displayRecipes(recipes, recipesSection)
        ingredientsBox.innerHTML = ""
        displayTags(ingredients, ingredientsBox)
        applianceBox.innerHTML = ""
        displayTags(appliance, applianceBox)
        ustensilsBox.innerHTML = ""
        displayTags(ustensils, ustensilsBox)
    }

})



