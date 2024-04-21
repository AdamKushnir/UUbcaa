// Funkce pro ověření, zda id ještě neexistuje
function validateId(id, existingIds) {
    // Kontrola, zda id již existuje v seznamu existujících id
    const exists = existingIds.includes(id);
  
    // Vrácení true, pokud id neexistuje, jinak false
    return !exists;
  }
  
  module.exports = validateId;
  