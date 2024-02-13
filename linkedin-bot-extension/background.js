chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "getStatus") {
    chrome.storage.local.get("extensionEnabled", (data) => {
      sendResponse({status: data.extensionEnabled});
    });
    return true; // Keep the message channel open for asynchronous response
  }
});
