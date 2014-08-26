function loadSupportingFiles (){  
  loadScript("http://localhost:3000/products/5.jsonp?callback=parseProduct", undefined);
}

function loadStylesheet(url) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  var entry = document.getElementsByTagName('script')[1];
  entry.parentNode.insertBefore(link, entry);
}


function loadScript(url, callback) {
  var script = document.createElement('script');
  script.async = true;
  script.src = url;
  var entry = document.getElementsByTagName('script')[1];
  entry.parentNode.insertBefore(script, entry);
  script.onload = script.onreadystatechange = function() {
    var rdyState = script.readyState;
    if (!rdyState || /complete|loaded/.test(script.readyState)) {
      callback();
      script.onload = null;
      script.onreadystatechange = null;
    }
  }
}

function appendWidgetMarkup(params) {
  jQuery('[data-stork-product]').each(function() {
    var location = jQuery(this);
    var id = location.attr('data-stork-product');

    location.removeAttr('data-stork-product'); 
    var html = 
      '<div class = "stork-container">' +
      '<h3>' + params.catalog[id].name + '</h3>' +
      '<p>' + params.catalog[id].company + '</p>' +
      '<p>' + params.catalog[id].price + '</p>' +
      '</div>';
    location.append(html);
    });
  }

loadStylesheet("http://widget.dev/widget/nutritionLabel.css");
loadScript("http://widget.dev/widget/nutritionLabel.js", loadSupportingFiles);

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

  function valueCalories(data){
    var i;
    var result = '';
    for(i = 0; i < data.length; i++) {
      if (data[i].amount){
        if (data[i].name == 'Energetska vrijednost') {
          result = data[i].amount;
        }
      }
    }
    return result;
  }

  function valueSatFat(data){
    var i;
    var result = '';
    for(i = 0; i < data.length; i++) {
      if (data[i].amount){
        if (data[i].name == 'Zasićene masti') {
          result = data[i].amount;
        }
      }
    }
    return result;
  }

  function parseProduct(json) {
    var product = json;
    var ingredients = product.ingredients;
    var nutrients = product.product_nutrients;
    var i;

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
      'valueCalories': valueCalories(nutrients),
      'valueSatFat': valueSatFat(nutrients)
       
 });
  
  }