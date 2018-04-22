import { openElement, closeElement, toggleSections } from './updateDisplay';

export const getRandomQuote = (displaySelected) => {
  fetch('/api/quotes/random')
    .then((res) => res.json())
    .then(json => {
      toggleSections('quote-display-container', 'quote-post-container','quote-search-container');
      displaySelected(json);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
};

export const getAllQuotes = (displaySelected) => {
  fetch('/api/quotes/')
    .then((res) => res.json())
    .then((json) => {
      const timeOut = document.getElementById('quote-display-container').classList.contains('open') ? 600 : 0;
      closeElement('quote-display-container');
      setTimeout(() => {
        toggleSections('quote-display-container', 'quote-post-container','quote-search-container');
        displaySelected(json);
      }, timeOut);
    });
};

export const postQuote = (data, resetFields, displaySelected) => {
  fetch('/api/quotes', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      if(res.status === 200) {
        resetFields();
        return res.json();
      } else {
        res.json().then(body => alert(`${body.error}`));
        throw new Error(`unable to post, ${res.status} error`);
      }
    })
    .then((jsonData) => displaySelected(jsonData))
    .catch((error) => {
    // eslint-disable-next-line no-console
      console.log(error);
    });
};

export const searchQuotes = (tags, searchResults, resetTags = function(){}) => {
  fetch(`/api/quotes?tags=${encodeURI(tags)}`)
    .then((data) => data.json())
    .then((json) => {
      resetTags();
      const searchFeedback = json.length === 0 ? 'No matches' : '';
      const timeOut = document.getElementById('quote-display-container').classList.contains('open') ? 600 : 0;
      closeElement('quote-display-container');
      setTimeout(() => {
        searchResults(json);
        document.getElementById('searchResultMessage').textContent = searchFeedback;
        openElement('quote-display-container');
      }, timeOut);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
};

export const deleteQuote = (objId, displayQuotes, updatedQuoteList) => {
  fetch(`/api/quotes/${objId}`, { method: 'delete' })
    .then((res) => {
      if(res.status === 200) return res.json();
      res.json().then(body => alert(`${body.error}`));
      throw new Error(`unable to delete, ${res.status} error`);
    })
    .then(() => displayQuotes(updatedQuoteList))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
};