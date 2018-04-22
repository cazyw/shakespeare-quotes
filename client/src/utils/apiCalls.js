import { openElement, closeElements, toggleSections } from './updateDisplay';

export const getRandomQuote = (displaySelected) => {
  fetch('/api/quotes/random')
    .then((res) => res.json())
    .then(json => {
      toggleSections('quote-display-container', 'quote-post-container','quote-search-container', 'quote-update-container');
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
      toggleSections('quote-display-container', 'quote-display-container', 'quote-post-container', 'quote-search-container', 'quote-update-container');
      displaySelected(json);
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
      const timeOut = closeElements('quote-display-container', 'quote-update-container');
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
  fetch(`/api/quotes/${objId}`, { method: 'DELETE' })
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

export const updateQuote = (quote, displayQuotes) => {
  fetch(`/api/quotes/${quote.id}`, { 
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(quote)
  })
    .then((res) => {
      if(res.status === 200) return res.json();
      res.json().then(body => alert(`${body.error}`));
      throw new Error(`unable to update the quote, ${res.status} error`);
    })
    .then((jsonData) => displayQuotes(jsonData))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  toggleSections('quote-update-container', 'quote-display-container', 'quote-post-container', 'quote-search-container');  
};