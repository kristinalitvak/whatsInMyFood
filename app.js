function fetchData() {
    let userInputValue = document.getElementById('input-field').value;
    console.log(userInputValue);

    let api_url = `https://world.openfoodfacts.org/api/v0/product/${userInputValue}.json`;

    fetch(api_url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        if(data.status===0){
            document.getElementById('product-name').innerHTML = (`Sorry, product ${userInputValue} not found! Enter another barcode.`);
        }   
        
        var productData = data.product;
        var allergens = productData.allergens;
        var ingredientTags = productData.ingredients_analysis_tags;
        var veganStatus = ingredientTags[1];
        var palmOilStatus = ingredientTags[0];
        var nutrients = productData.nutriments;

        // ------------------------------- PRINT PRODUCT NAME -------------------------------------------
        document.getElementById('product-name').innerHTML = "Product name: " + productData.product_name_en;

        // ------------------------CHECK FOR COMMON ALLERGENS -------------------------------------------
        document.getElementById('allergens').innerHTML = "common allergens:" + (allergens === "" ? "none found" : allergens)

        // ------------------------CHECK FOR FATS,CARBS,SUGARS -------------------------------------------
        let nutrientOutput = document.getElementById('nutrient-info');

        if((nutrients.fat && nutrients.carbohydrates && nutrients.sugars) != undefined) {
            nutrientOutput.innerHTML = "Fat: " + nutrients.fat + "g |" + " Carbs: " + nutrients.carbohydrates + "g |" +  " Sugars: " + nutrients.sugars + "g";
        }
        else {
            nutrientOutput.innerHTML = "Fat: n/a" + " |" +" Carbs: n/a" + " |" +  " Sugars: n/a ";
        }

        // ---------------------------- CHECK IF VEGAN --------------------------------------------------
        let veganOutput = document.getElementById('vegan-status');

        if((veganStatus.toString()) === "en:vegan-status-unknown") {
            veganOutput.innerHTML = "vegan status: unknown :(";
        }else if((veganStatus.toString()) === "en:vegan") {
            veganOutput.innerHTML = "vegan status: vegan &#x2714;";
        }else if((veganStatus.toString()) === "en:non-vegan") {
            veganOutput.innerHTML = "vegan status: non-vegan &#10008;";}

        // ------------------ CHECK IF PRODUCT CONTAINS PALM OIL ----------------------------------------
        let palmOilOutput = document.getElementById('palm-oil-content');

        if((palmOilStatus.toString()) === "en:palm-oil") {
            palmOilOutput.innerHTML = "Contains Palm oil";
        }else if((palmOilStatus.toString()) === "en:palm-oil-free") {
            palmOilOutput.innerHTML= "Palm Oil Free";
        }else if((palmOilStatus.toString()) === "en:palm-oil-content-unknown") {
            palmOilOutput.innerHTML = "";}
    })
}

