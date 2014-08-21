var Stork = (function(window, undefined) {

  function getWidgetParams() {
    return Stork;
  }

  function loadSupportingFiles (){  
    var params = getWidgetParams();
    appendWidgetMarkup(params);
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
    var entry = document.getElementsByTagName('script')[0];
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

  loadScript("http://widget.dev/widget/catalog.js", loadSupportingFiles);
  loadStylesheet("http://widget.dev/widget/style.css");

  window.onload = function() {
    var messageEle = document.getElementById('message');

    function receiver(ev) {
      alert("receiver");
      if (ev.origin !== 'http://widget.dev') {
        alert("wrong origin");
        return;
      }
      alert(ev.data);

      if (ev.data === 'hello') {      
         messageEle.innerHTML = "Message Received: " + ev.data;
        alert("if");
      }
      else {
        alert("nista");
      }
      return;
    }
    
    if (window.addEventListener) {
      window.addEventListener('message', receiver, false);
      alert("added");
    } 
    else {
      window.attachEvent('onmessage', receiver);
    }
  }

  return Stork;
})(window);