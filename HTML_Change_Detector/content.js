chrome.runtime.sendMessage({
    action: 'compareHTML',
    url: window.location.href,
    html: document.documentElement.outerHTML
}, function(response) {
    // You could display the response message to the user here.
    console.log(response.status);
});
