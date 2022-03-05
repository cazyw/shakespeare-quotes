export const errorHighlighting = (showError, field, suffix, errorText) => {
  if (showError) {
    document.getElementById(`${field}-${suffix}`).classList.add('field-blank');
  } else {
    document.getElementById(`${field}-${suffix}`).classList.remove('field-blank');
  }
  document.getElementById(`help-${field}-${suffix}`).textContent = errorText;
};

export const resetWarnings = suffix => {
  const inputFields = ['work', 'act', 'scene', 'quote', 'tags'];
  for (let field of inputFields) {
    errorHighlighting(false, field, suffix, '');
  }
  document.querySelector('.reset-button').blur();
};

export const checkIfPreviousFieldBlank = (field, suffix) => {
  const fieldValue = document.getElementById(`${field}-${suffix}`).value;
  if (fieldValue === null || fieldValue === '') {
    errorHighlighting(true, field, suffix, 'Required');
  } else {
    errorHighlighting(false, field, suffix, '');
  }
};

export const inputHasErrors = (data, titleOfWorks, suffix) => {
  resetWarnings(suffix);
  document.querySelector('.submit-button').blur();
  return (
    workHasErrors(titleOfWorks, data.work, suffix) ||
    actHasErrors(data.act, data.scene, suffix) ||
    sceneHasErrors(data.scene, data.act, suffix) ||
    quoteHasErrors(data.quote, suffix) ||
    tagHasErrors(data.tags, suffix)
  );
};

const workHasErrors = (titleOfWorks, workEntered, suffix) => {
  if (titleOfWorks.indexOf(workEntered) === -1) {
    errorHighlighting(true, 'work', suffix, 'Invalid input');
    return true;
  }
};

const actHasErrors = (actEntered, sceneEntered, suffix) => {
  if (!/^[1-9]{0,1}$/.test(actEntered)) {
    errorHighlighting(true, 'act', suffix, 'Invalid input');
    return true;
  }
  if (actEntered === '' && sceneEntered !== '') {
    errorHighlighting(true, 'act', suffix, 'Required');
    return true;
  }
};

const sceneHasErrors = (sceneEntered, actEntered, suffix) => {
  if (!/^[1-9]{0,2}$/.test(sceneEntered)) {
    errorHighlighting(true, 'scene', suffix, 'Invalid input');
    return true;
  }
  if (actEntered === '' && sceneEntered !== '') {
    errorHighlighting(true, 'acene', suffix, 'Required');
    return true;
  }
};

const quoteHasErrors = (quoteEntered, suffix) => {
  if (quoteEntered.length < 1) {
    errorHighlighting(true, 'quote', suffix, 'Required');
    return true;
  }
};

const tagHasErrors = (tagsEntered, suffix) => {
  if (tagsEntered.length < 1) {
    errorHighlighting(true, 'tags', suffix, 'Required');
    return true;
  }
};
