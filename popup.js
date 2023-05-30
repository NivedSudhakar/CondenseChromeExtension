let changeColor = document.getElementById("changeColor");
let table = document.getElementById("linkTable");
let test = document.getElementById("test");



changeColor.addEventListener("click", async() => {

  
  let inputtag = "a";
  chrome.storage.sync.set({ inputtag: inputtag });

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  let url = (new URL(tab.url));

  url = url.hostname.replace('www.','');





  let elements = chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getLinks,
    })
    .then(injectionResults => {
      for (var i = table.rows.length-1; i >= 0 ; i--) { 
        table.removeChild(table.rows[i]); 
        
      } 
      
      for (const {frameId, result} of injectionResults) {
        
        for (i in result) { 

          

          let resultUrl = (new URL(result[i][1].toString()));

          resultUrl = resultUrl.hostname.replace('www.','');

          let color = "";
          
          if(url === resultUrl) {
            color = "white";
          } else {
            color = "red";
          }


          var row = table.insertRow(0);

          // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);

          // Add some text to the new cells:
          cell1.innerHTML = result[i][0];
          cell2.innerHTML = result[i][1];

          row.style.backgroundColor = color;
        }
      }

    });

  });




  



function getLinks() {

  let aLinks = [];

  let links = new Promise(function(resolve) {
    chrome.storage.sync.get("inputtag", ({ inputtag }) => {

      links = [];
  
      document.querySelectorAll(inputtag).forEach((element) => {
        temp = [];
        temp[0] = element.innerHTML;
        temp[1] = element.href;

        links.push(temp);
  
      });
  
      resolve(links);
  
    });

  }); 

  aLinks = links.then(
    function(value) {  
      return value;
    },
    function(error) {console.log("amongus");}
  );


  return aLinks;

  

  }

  

 