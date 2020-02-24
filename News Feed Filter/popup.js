
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', clickHandler);
    main();
 });

 window.onload = function() {

    chrome.storage.local.get("filterKeywords", function(data){
     var storedKeywords = data.filterKeywords;
        if (storedKeywords != null)
        {
            document.getElementById('keywords').value = storedKeywords;
        }
    });

  }

  function clickHandler(element) {
      var keywords = document.getElementById('keywords').value;
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": keywords});
            window.close();
           });
  }

  function main() {
      // Initialization work goes here.
  }