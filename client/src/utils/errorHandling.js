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
  document.querySelector('.reset-button').blur();
};

export const checkIfPreviousFieldBlank = (field) => {
  const fieldValue = document.getElementById(field).value;
  if(fieldValue === null || fieldValue === '') {
    errorHighlighting(true, field, 'Required');
  } else {
    errorHighlighting(false, field, '');
  }
};

export const inputHasErrors = (data, titleOfWorks) => {
  resetWarnings();
  document.querySelector('.submit-button').blur();
  return workHasErrors(titleOfWorks, data.work) ||
  actHasErrors(data.act, data.scene) ||
  sceneHasErrors(data.scene, data.act) ||
  quoteHasErrors(data.quote) ||
  tagHasErrors(data.tags);
};

const workHasErrors = (titleOfWorks, workEntered) => {
  if(titleOfWorks.indexOf(workEntered) === -1){
    errorHighlighting(true, 'work', 'Invalid input');
    return true;
  }
};

const actHasErrors = (actEntered, sceneEntered) => {
  if(!/^[1-9]{0,1}$/.test(actEntered)){
    errorHighlighting(true, 'act', 'Invalid input');
    return true;
  }
  if(actEntered === '' && sceneEntered !== ''){
    errorHighlighting(true, 'act', 'Required');
    return true;
  }
};

const sceneHasErrors = (sceneEntered, actEntered) => {
  if(!/^[1-9]{0,1}$/.test(sceneEntered)){
    errorHighlighting(true, 'scene', 'Invalid input');
    return true;
  }
  if(actEntered === '' && sceneEntered !== ''){
    errorHighlighting(true, 'acene', 'Required');
    return true;
  }
};

const quoteHasErrors = (quoteEntered) => {
  if(quoteEntered.length < 1){
    errorHighlighting(true, 'quote', 'Required');
    return true;
  }
};

const tagHasErrors = (tagsEntered) => {
  if(tagsEntered.length < 1){
    errorHighlighting(true, 'tags', 'Required');
    return true;
  }
};