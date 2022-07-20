var productNameOutput = document.getElementById('product-name');
var allergenOutput = document.getElementById('allergens');
var nutrientOutput = document.getElementById('nutrient-info');
var veganOutput = document.getElementById('vegan-status');
var palmOilOutput = document.getElementById('palm-oil-content');

function clearData() {
    productNameOutput.innerHTML = '';
    allergens.innerHTML = '';
    nutrientOutput.innerHTML = '';
    veganOutput.innerHTML = '';
    palmOilOutput.innerHTML = '';
}

function fetchData() {
    clearData();
    productNameOutput.innerHTML = 'Loading...'
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
        var allergens = productData.allergens;
        var ingredientTags = productData.ingredients_analysis_tags;
        var veganStatus = ingredientTags[1];
        var palmOilStatus = ingredientTags[0];
        var nutrients = productData.nutriments;

        productNameOutput.innerHTML = "Product name: " + productData.product_name_en;
        checkAllergens(allergens);    
        checkNutrients(nutrients);
        checkIfVegan(veganStatus);
        checkPalmOil(palmOilStatus);
    })
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
