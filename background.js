chrome.webNavigation.onCompleted.addListener(function (details) {
    var wordToHide = 'example';
    chrome.storage.local.get('word', function (obj) {
        if (obj.word) {
            wordToHide = obj.word;
        }
        chrome.tabs.executeScript(details.tabId, {
            code: `
            var elements = document.getElementsByTagName('*');
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                for (var j = 0; j < element.childNodes.length; j++) {
                    var node = element.childNodes[j];
                    if (node.nodeType === 3) {
                        var text = node.nodeValue;
                        var replacedText = text.replace(new RegExp('${wordToHide}', 'gi'), "***");
                        if (replacedText !== text) {
                            element.replaceChild(document.createTextNode(replacedText), node);
                        }
                    }
                }
            }`
        });
    });
}, { url: [{ urlContains: 'http' }] });
