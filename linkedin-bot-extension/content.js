// Function to simulate a click event
function simulateClick(element) {
  if (!element) return; // Exit if the element doesn't exist
  element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
}

// Function to find and click the "Like" button
function findAndClickLikeButton() {
  // Update the selector as needed to match LinkedIn's markup
  const likeButtons = document.querySelectorAll('button[aria-label="React Like"][aria-pressed="false"]');
  if (likeButtons.length > 0) {
    simulateClick(likeButtons[0]);
    console.log("Clicked a 'Like' button.");
  } else {
    console.log("No unliked 'Like' buttons found at the moment.");
  }
}

// Function to automatically scroll the page
function autoScroll() {
  let lastHeight = document.body.scrollHeight, newHeight;
  let scrollInterval = setInterval(() => {
    window.scrollTo(0, document.body.scrollHeight);
    newHeight = document.body.scrollHeight;
    if (newHeight === lastHeight) {
      clearInterval(scrollInterval); // Stop scrolling if the page height hasn't changed
      console.log("Reached the bottom or no new content is loading.");
    } else {
      lastHeight = newHeight;
    }
  }, 5000); // Adjust as needed for a suitable scroll frequency

  // Optionally, restart scrolling when new content is detected
  // This part can be customized based on specific needs or behaviors observed on LinkedIn
}

// Main function to control the auto-like feature and auto-scrolling based on user settings
function main() {
  chrome.storage.sync.get(['autoLikeEnabled'], function(result) {
    if (result.autoLikeEnabled) {
      console.log("Auto-Liker and Auto-Scroll: Enabled");
      setInterval(findAndClickLikeButton, 100); // Attempt to click like buttons periodically
      autoScroll(); // Start auto-scrolling to load new content
    } else {
      console.log("Auto-Liker: Disabled");
    }
  });
}

// Execute the main function when the content script loads
main();
