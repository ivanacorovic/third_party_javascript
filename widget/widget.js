function loadSupportingFiles (url){  
  loadScript(url, undefined);
}

function loadStylesheet(url) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  var entry = document.getElementsByTagName('script')[0];
  entry.parentNode.insertBefore(link, entry);
}


function loadScript(url, callback) {
  var script = document.createElement('script');
  script.async = true;
  script.src = url;
  $("body").append(script);
  script.onload = script.onreadystatechange = function() {
    var rdyState = script.readyState;
    if (!rdyState || /complete|loaded/.test(script.readyState)) {
      callback();
      script.onload = null;
      script.onreadystatechange = null;
    }
  }
}

var ideus_url = "http://localhost:3000/products";
var id = $("#test1").attr("data-ideus-product");
ideus_url = ideus_url + '/'+id+'.jsonp?callback=parseProduct';

loadStylesheet("http://widget.dev/widget/nutritionLabel.css");
loadScript(ideus_url, loadSupportingFiles("http://widget.dev/widget/nutritionLabel.js"));

function Ingredients(data){
    var i;
    var names = '';
    for(i = 0; i < data.length-1; i++) {
      names = names + data[i].name;
      names = names + ', ';
    }
    names = names + data[i].name;
    return names;
  }

function parseProduct(json) {
  var product = json;
  var ingredients = product.ingredients;
  var nutrients = product.product_nutrients;
  var i;
  var valueCalories, valueFatCalories, valueTotalFat, valueSatFat, valueTransFat, valueMonoFat;
  var valuePolyFat, valueTotalCarb, valueSugars, valueFibers, valueProteins;

  for(i = 0; i < nutrients.length; i++) {
    if (nutrients[i].amount) {
      switch(nutrients[i].name) {
        case "Energetska vrijednost":
          valueCalories = nutrients[i].amount;
          break;
        case "Masti":
          valueFatCalories = nutrients[i].amount*9;
          valueTotalFat = nutrients[i].amount;
          break;
        case "Zasićene masti":
          valueSatFat =  nutrients[i].amount;
          break;
        case "Omega-3 masne kisjeline":
          valueTransFat = nutrients[i].amount;
          break;
        case "Jednostruko nezasićene masne kisjeline":
          valueMonoFat = nutrients[i].amount;
          break;
        case "Višestruko nezasićene masne kisjeline":
          valuePolyFat = nutrients[i].amount;
          break;
        case "Ugljeni hidrati":
          valueTotalCarb = nutrients[i].amount;
          break;
        case "Šećeri":
          valueSugars = nutrients[i].amount;
          break;
        case "Vlakna":
          valueFibers = nutrients[i].amount;
          break;
        case "Proteini":
          valueProteins = nutrients[i].amount;
          break;
      }
    }
  }

  $('#test1').nutritionLabel({
    'hideTextboxArrows' : true,
      'showItemName' : false,
      'showServingsPerContainer' : false,
      'showServingUnitQuantity' : false,
      'ingredientList' : Ingredients(ingredients),
      'showSodium' : false,
      'showCholesterol' : false,
      'showPolyFat' : true,
      'showMonoFat' : true,
      'showFibers' : true,
      'showTransFat' : true,
      'showVitaminA' : false,
      'showVitaminC' : false,
      'showCalcium' : false,
      'showIron' : false,
      'valueCalories': valueCalories,
      'valueFatCalories': valueFatCalories,
      'valueTotalFat': valueTotalFat,
      'valueSatFat': valueSatFat,
      'valueTransFat': valueTransFat,
      'valueMonoFat': valueMonoFat,
      'valuePolyFat': valuePolyFat,
      'valueTotalCarb': valueTotalCarb,
      'valueSugars': valueSugars,
      'valueFibers': valueFibers,
      'valueProteins': valueProteins     
  });
}