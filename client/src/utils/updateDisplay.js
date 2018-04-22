import { TIMEOUT } from './constants';

export const openElement = (sectionToOpen) => {
  document.getElementById(sectionToOpen).classList.add('open');
};

export const closeElements = (...sectionsToClose) => {
  let sectionsClosed = false;
  sectionsToClose.forEach(section => {
    sectionsClosed = sectionsClosed || (document.getElementById(section).classList.contains('open') ? true : false);
    document.getElementById(section).classList.remove('open');
  });
  return sectionsClosed;
};

export const toggleSections = (sectionToOpen, ...sectionsToClose) => {
  const timeOut = closeElements(...sectionsToClose) ? TIMEOUT : 0;
  setTimeout(() => {
    openElement(sectionToOpen);
  }, timeOut);
};