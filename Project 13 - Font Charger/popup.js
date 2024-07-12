document.getElementById('applyButton').addEventListener('click', () => {
    chrome.tabs.executeScript({
      code: `
        const elements = document.querySelectorAll('*');
        for (const element of elements) {
          element.style.fontFamily = 'sans-serif';
        }
      `
    });
  });
  