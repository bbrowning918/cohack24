// utils/extractSection.js
export const extractSection = (response, sectionTitle) => {
    const sectionStart = response.indexOf(`**${sectionTitle}:**`);
    if (sectionStart === -1) return '';
  
    const nextSectionStart = response.indexOf('**', sectionStart + 1);
    return nextSectionStart !== -1 
      ? response.substring(sectionStart, nextSectionStart).trim() 
      : response.substring(sectionStart).trim();
  };
  