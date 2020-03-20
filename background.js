window.tmpTitle;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  window.tmpTitle = request.title;
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({ url: "popup.html" });
});
