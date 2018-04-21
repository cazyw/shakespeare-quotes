export const openElement = (sectionToOpen) => {
  document.getElementById(sectionToOpen).classList.add('open');
};

export const closeElement = (sectionToClose) => {
  document.getElementById(sectionToClose).classList.remove('open');
};

export const toggleSections = (sectionToOpen, sectionToClose1, sectionToClose2) => {
  const timeOut = document.getElementById(sectionToClose1).classList.contains('open') || 
document.getElementById(sectionToClose2).classList.contains('open') ? 750 : 0;
  
  closeElement(sectionToClose1);
  closeElement(sectionToClose2);
  setTimeout(() => {
    openElement(sectionToOpen);
  }, timeOut);
};

export const errorHighlighting = (showError, field, errorText) => {
  if (showError) {
    document.getElementById(field).classList.add('field-blank');
  } else {
    document.getElementById(field).classList.remove('field-blank');
  }
  document.getElementById(`help-${field}`).textContent = errorText;
};

export const resetWarnings = () => {
  const inputFields = ['work', 'act', 'scene', 'quote', 'tags'];
  for(let field of inputFields) {
    errorHighlighting(false, field, '');
  }
};

export const tweetUrl = (quote, work, act, scene) => {
  const tweet = encodeURIComponent(`"${quote}" - ${work} (Act ${act}, Sc ${scene})`);
  return `https://twitter.com/intent/tweet?text=${tweet}&hashtags=ShakespeareSunday`;
};

export const checkInputs = (inputs, dataWorks) => {
  resetWarnings();
  let errors = 0;

  // check work
  if(dataWorks.indexOf(inputs.work) === -1){
    errorHighlighting(true, 'work', 'Invalid input');
    errors += 1;
  }

  // check act
  if(!/^[1-9]{0,1}$/.test(inputs.act)){
    errorHighlighting(true, 'act', 'Invalid input');
    errors += 1;
  }
  if(inputs.act === '' && inputs.scene !== ''){
    errorHighlighting(true, 'scene', 'Required');
    errors += 1;
  }

  // check scene
  if(!/^[1-9]{0,1}[0-9]{0,1}$/.test(inputs.scene)){
    errorHighlighting(true, 'scene', 'Invalid input');
    errors += 1;
  }
  if(inputs.scene === '' && inputs.act !== ''){
    errorHighlighting(true, 'scene', 'Required');
    errors += 1;
  }

  // check quote
  if(inputs.quote.length < 1){
    errorHighlighting(true, 'quote', 'Required');
    errors += 1;
  }

  // check tags
  if(inputs.tags.length < 1){
    errorHighlighting(true, 'tags', 'Required');
    errors += 1;
  }
  document.querySelector('.submit-button').blur();

  if(errors > 0) return false;
  return true;
};

export const shakespeareWorks = [
  'All\'s Well That Ends Well',
  'As You Like It',
  'The Comedy of Errors',
  'Cymbeline',
  'Love\'s Labours Lost',
  'Measure for Measure',
  'The Merry Wives of Windsor',
  'The Merchant of Venice',
  'A Midsummer Night\'s Dream',
  'Much Ado About Nothing',
  'Pericles, Prince of Tyre',
  'Taming of the Shrew',
  'The Tempest',
  'Troilus and Cressida',
  'Twelfth Night',
  'Two Gentlemen of Verona',
  'Winter\'s Tale',
  'Henry IV, part 1',
  'Henry IV, part 2',
  'Henry V',
  'Henry VI, part 1',
  'Henry VI, part 2',
  'Henry VI, part 3',
  'Henry VIII',
  'King John',
  'Richard II',
  'Richard III',
  'Antony and Cleopatra',
  'Coriolanus',
  'Hamlet',
  'Julius Caesar',
  'King Lear',
  'Macbeth',
  'Othello',
  'Romeo and Juliet',
  'Timon of Athens',
  'Titus Andronicus'
];