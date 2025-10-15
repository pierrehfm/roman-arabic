const romanMap = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
  };
  
  function validateRomanString(roman) {
    if (!roman) return null;
    if (/[^IVXLCDM()\s]/i.test(roman)) return "Caractères invalides détectés.";
  
    let depth = 0;
    for (let ch of roman) {
      if (ch === "(") depth++;
      if (ch === ")") {
        depth--;
        if (depth < 0) return "Parenthèses mal fermées.";
      }
    }
    if (depth !== 0) return "Parenthèses non fermées.";
  
    roman = roman.toUpperCase().replace(/\s+/g, "");
  
    if (/(IIII|XXXX|CCCC|MMMM)/.test(roman))
      return "Trop de répétitions.";
    if (/(VV|LL|DD)/.test(roman))
      return "Trop de répétitions.";
  
    const validSubtractions = ["IV", "IX", "XL", "XC", "CD", "CM"];
    const pattern = /I[VXLCDM]|X[LCDM]|C[DM]/g;
    const matches = roman.match(pattern) || [];
    for (const pair of matches) {
      if (!validSubtractions.includes(pair)) {
        return "Soustraction invalide";
      }
    }
  
    if (/(IV|IX|XL|XC|CD|CM).*\1/.test(roman))
      return "Soustraction incohérente";
  
    if (/(IV|IX|XL|XC|CD|CM)[IVXLCDM]/.test(roman) && !/(IX$|IV$|XC$|XL$|CM$|CD$)/.test(roman))
      return "Structure incohérente";
  
    return null;
  }
  
  function romanToArabic(roman) {
    if (!roman) return "";
    roman = roman.toUpperCase().replace(/\s+/g, "");
  
    const validErr = validateRomanString(roman);
    if (validErr) return `⚠️ ${validErr}`;
  
    const blocks = [];
    let i = 0;
    while (i < roman.length) {
      if (roman[i] === "(") {
        let depth = 1;
        let j = i + 1;
        while (j < roman.length && depth > 0) {
          if (roman[j] === "(") depth++;
          else if (roman[j] === ")") depth--;
          j++;
        }
        if (depth !== 0) return "⚠️ Parenthèse non fermée";
        blocks.push(roman.slice(i, j));
        i = j;
      } else {
        blocks.push(roman[i]);
        i++;
      }
    }
  
    const values = blocks.map(block => {
      if (block.startsWith("(")) {
        const inner = block.slice(1, -1);
        const innerVal = romanToArabic(inner);
        if (typeof innerVal === "string" && innerVal.startsWith("⚠️")) {
          return NaN;
        }
        return innerVal * 1000;
      } else {
        return romanMap[block] ?? NaN;
      }
    });
  
    for (let v of values) {
      if (isNaN(v)) return "⚠️ Symbole inconnu ou bloc invalide.";
    }
  
    let total = 0;
    for (let k = 0; k < values.length; k++) {
      const current = values[k];
      const next = values[k + 1];
      total += (next !== undefined && next > current) ? -current : current;
    }
  
    return total;
  }
  
  function arabicToRoman(num) {
    num = parseInt(num, 10);
    if (isNaN(num) || num <= 0) return "";
    if (num > 1_000_000_000) return "⚠️ Limite : 1 milliard";
  
    if (num > 3999) {
      const thousands = Math.floor(num / 1000);
      const remainder = num % 1000;
      return `(${arabicToRoman(thousands)})${arabicToRoman(remainder)}`;
    }
  
    const romanPairs = [
      ["M", 1000],
      ["CM", 900],
      ["D", 500],
      ["CD", 400],
      ["C", 100],
      ["XC", 90],
      ["L", 50],
      ["XL", 40],
      ["X", 10],
      ["IX", 9],
      ["V", 5],
      ["IV", 4],
      ["I", 1],
    ];
  
    let result = "";
    for (let [symbol, value] of romanPairs) {
      while (num >= value) {
        result += symbol;
        num -= value;
      }
    }
  
    return result;
  }
  
  module.exports = { romanToArabic, arabicToRoman, validateRomanString };
  