document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('toggleAutoLike');
  chrome.storage.sync.get(['autoLikeEnabled'], function(result) {
    checkbox.checked = !!result.autoLikeEnabled;
  });

  checkbox.onchange = function() {
    chrome.storage.sync.set({autoLikeEnabled: this.checked});
  };
});
