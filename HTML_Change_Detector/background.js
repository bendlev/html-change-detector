chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'saveHTML') {
        // Save HTML content.
        // Get the current date
        var currentDate = new Date();

        var dateString = currentDate.toLocaleString();

        chrome.storage.local.set({[request.url]: [request.html, dateString]}, function() {
            sendResponse({status: 'Saved: Website content saved for today\'s date. ' + dateString + '.'});
        });
        
    } else if (request.action === 'compareHTML') {
        // Retrieve old HTML content and compare it with current one.
        chrome.storage.local.get(request.url, function(data) {
            var oldDate = data[request.url][1];
            let oldHtml = data[request.url][0];
            if (oldHtml !== request.html) {
                // Simplified comparison: just checks whether the HTML content has changed.
                sendResponse({status: 'Changed: Website content has changed as compared to ' + oldDate + '.'});
            } else {
                sendResponse({status: 'Same: Website content is the same as compared to ' + oldDate + '.'});
            }
        });
    }
    // Indicate that we will send a response asynchronously.
    return true;
});
  
