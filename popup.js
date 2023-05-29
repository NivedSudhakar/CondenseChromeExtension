let changeColor = document.getElementById("changeColor");
let table = document.getElementById("linkTable");



changeColor.addEventListener("click", async() => {
  console.log(typeof table);
  let inputtag = "a";
  chrome.storage.sync.set({ inputtag: inputtag });

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  let elements = chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: displayLinks,
    args: [table]
  });


});

function displayLinks(linkTable) {
  console.log(typeof linkTable);

  let links = [];


   chrome.storage.sync.get("inputtag", ({ inputtag }) => {

    document.querySelectorAll(inputtag).forEach((element) => {
   
      links.push(element.href);

    });

    console.log(links.toString());


  });



}