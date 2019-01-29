chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.insertCSS({ file: 'selector.css' });
    chrome.tabs.executeScript({ file: 'selector.js' });
});

chrome.commands.onCommand.addListener(command => {
    console.log(command);
})
