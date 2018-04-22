export const openElement = (sectionToOpen) => {
  document.getElementById(sectionToOpen).classList.add('open');
};

export const closeElement = (sectionToClose) => {
  document.getElementById(sectionToClose).classList.remove('open');
};

export const toggleSections = (sectionToOpen, sectionToClose1, sectionToClose2) => {
  const timeOut = document.getElementById(sectionToClose1).classList.contains('open') || 
document.getElementById(sectionToClose2).classList.contains('open') ? 600 : 0;
  
  closeElement(sectionToClose1);
  closeElement(sectionToClose2);
  setTimeout(() => {
    openElement(sectionToOpen);
  }, timeOut);
};