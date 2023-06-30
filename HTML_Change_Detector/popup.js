// document.addEventListener('DOMContentLoaded', function () {
//     // Get the current date
//     var currentDate = new Date();
//     var dateString = currentDate.toLocaleString();
  
//     // Query the current active tab
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       var url = tabs[0].url;

//       // print the url to the console
//       console.log(url);
  
//       // Get the HTML content of the current tab
//       chrome.tabs.executeScript(tabs[0].id, {code: 'document.documentElement.outerHTML'}, function(results) {
//         var html = results[0];
  
//         // Retrieve the data from the storage, if it exists.
//         chrome.storage.local.get(url, function(data) {
//           // show the data in the console
//           console.log(data);

//           var message = document.getElementById('message'); // Get the message element
//           if (data[url] === undefined) {
//             // If the data is not in the storage, just tell the user that it is not there.
//             message.textContent = 'Website\'s content has never been saved before, there is nothing to compare it to.';
//           } else {
//             // If the data is in the storage, compare the HTML content and tell the user if it has changed.
//             let oldHtml = data[url][0];
//             if (oldHtml !== html) {
//               // Simplified comparison: just checks whether the HTML content has changed.
//               message.textContent = 'Website content has changed as compared to ' + dateString + '.';
//             } else {
//               message.textContent = 'Website content is the same as compared to ' + dateString + '.';
//             }
//           }
//         });
//       });
//     });
//   });


document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('save').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          let url = tabs[0].url;
          chrome.tabs.executeScript(tabs[0].id, {
            code: 'document.documentElement.outerHTML'
          }, function(results) {
            let html = results[0];
            chrome.runtime.sendMessage({
              action: 'saveHTML',
              url: url,
              html: html
            }, function(response) {
              document.getElementById('status').textContent = response.status;
            });
          });
        });
      });
  
    document.getElementById('compare').addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let url = tabs[0].url;
        chrome.tabs.executeScript(tabs[0].id, {
          code: 'document.documentElement.outerHTML'
        }, function(results) {
          let html = results[0];
          chrome.runtime.sendMessage({
            action: 'compareHTML',
            url: url,
            html: html
          }, function(response) {
            document.getElementById('status').textContent = response.status;
          });
        });
      });
    });

});