var Keywords = new Array;

loadKeywords();


function loadKeywords()
{
  var keystring;
  chrome.storage.local.get("filterKeywords", function(data){
    keystring = data.filterKeywords;
    var keyarray = keystring.split(',');
    Keywords = new Array;
    for (var i = 0; i < keyarray.length; i++)
    {
        Keywords.push(keyarray[i]);
    }
   });
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    update(request.message);

  }
);

function update(res){
  chrome.storage.local.set({filterKeywords:res}, function(){ 
    loadKeywords();
   });
}

function filter(target)
{
    
    for (var i = 0; i < Keywords.length; i++)
      {
        if (target.innerHTML.indexOf(Keywords[i]) !== -1)
        {
          target.style.display = "none";
          console.log(Keywords[i]);

          break;
        }
      }        
}


function nodeInsertedCallback(event) {
  var tar = event.target;
  if (tar.className == '_4-u2 mbm _4mrt _5v3q _7cqq _4-u8') //news feed post class name feb 2020
  {
    filter(tar)
  }
};
document.addEventListener('DOMNodeInserted', nodeInsertedCallback);
