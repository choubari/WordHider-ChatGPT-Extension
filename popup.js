document.getElementById("hide-button").addEventListener("click", function () {
    var wordToHide = document.getElementById("word-input").value;
    chrome.storage.local.set({ 'word': wordToHide });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, { code: 'location.reload();' });
    });
});
