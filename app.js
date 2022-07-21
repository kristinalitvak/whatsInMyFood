// ------------------------- Creating responsive nav menu ----------------------------------------------
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

function toggleFunction() {
    nav.classList.toggle('nav-active');
}

// -------------------- Closes the nav bar after clicking on link --------------------------------------
function toggleClose() {
    nav.classList.toggle('nav-active');
}

burger.addEventListener('click', toggleFunction);   // On click of burger, toggle the menu
nav.addEventListener('click', toggleClose);         // Once link inside menu is clicked, close the menu
// ----------------------------------------------------------------------------------------------------

var productNameOutput = document.getElementById('product-name');
var allergenOutput = document.getElementById('allergens');
var nutrientOutput = document.getElementById('nutrient-info');
var veganOutput = document.getElementById('vegan-status');
var palmOilOutput = document.getElementById('palm-oil-content');

function clearData() {                          
    productNameOutput.innerHTML = '';
    allergenOutput.innerHTML = '';
    nutrientOutput.innerHTML = '';
    veganOutput.innerHTML = '';
    palmOilOutput.innerHTML = '';
}

function fetchData() {
    clearData();
    productNameOutput.innerHTML = 'Loading...';
    let userInputValue = document.getElementById('input-field').value;
    let api_url = `https://world.openfoodfacts.org/api/v0/product/${userInputValue}.json`;
    fetch(api_url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        if(data.status===0){
            productNameOutput.innerHTML = (`Sorry, product ${userInputValue} not found! Enter another barcode.`);
        }   
        var productData = data.product;
        var productName = productData.product_name_en;
        var allergens = productData.allergens;
        var ingredientTags = productData.ingredients_analysis_tags;
        var veganStatus = ingredientTags[1];
        var palmOilStatus = ingredientTags[0];
        var nutrients = productData.nutriments;

        printProductName(productName);
        checkAllergens(allergens);    
        checkNutrients(nutrients);
        checkIfVegan(veganStatus);
        checkPalmOil(palmOilStatus);
    })
}

// ------------------------------- PRINT PRODUCT NAME -------------------------------------------
function printProductName(productName) {
    if(productName === undefined || productName === '') {
        productNameOutput.innerHTML = "Product name: N/A";

    }else {
        productNameOutput.innerHTML = "Product name: " + productName;}
}

// ------------------------CHECK FOR COMMON ALLERGENS -------------------------------------------
function checkAllergens(allergens) {
    allergenOutput.innerHTML = "common allergens: " + (allergens === "" ? "none found" : allergens);
}

// ------------------------CHECK FOR FATS,CARBS,SUGARS -------------------------------------------
function checkNutrients(nutrients) {
    if((nutrients.fat && nutrients.carbohydrates && nutrients.sugars) != undefined) {
        nutrientOutput.innerHTML = "Fat: " + nutrients.fat + "g |" + " Carbs: " + nutrients.carbohydrates + "g |" +  " Sugars: " + nutrients.sugars + "g";
    }else {
        nutrientOutput.innerHTML = "Fat: n/a" + " |" +" Carbs: n/a" + " |" +  " Sugars: n/a ";}
}

// ---------------------------- CHECK IF VEGAN --------------------------------------------------
function checkIfVegan(veganStatus) {
    if((veganStatus.toString()) === "en:vegan-status-unknown" || "en:maybe-vegan") {
        veganOutput.innerHTML = "vegan status: unknown :(";
    }else if((veganStatus.toString()) === "en:vegan") {
        veganOutput.innerHTML = "vegan status: vegan &#x2714;";
    }else if((veganStatus.toString()) === "en:non-vegan") {
        veganOutput.innerHTML = "vegan status: non-vegan &#10008;";}
}

// ------------------ CHECK IF PRODUCT CONTAINS PALM OIL ----------------------------------------
function checkPalmOil(palmOilStatus) {
    if((palmOilStatus.toString()) === "en:palm-oil") {
        palmOilOutput.innerHTML = "Contains Palm oil";
    }else if((palmOilStatus.toString()) === "en:palm-oil-free") {
        palmOilOutput.innerHTML= "Palm Oil Free";}
}
