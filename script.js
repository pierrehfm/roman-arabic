const romanMap = {
  I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
};

function parseRomanChunk(roman) {
  let total = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanMap[roman[i]];
    const next = romanMap[roman[i + 1]];
    if (!current) return NaN;
    total += next > current ? -current : current;
  }
  return total;
}

function romanToArabic(roman) {
  if (!roman) return "";
  roman = roman.toUpperCase().replace(/\s+/g, "");

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
      return romanToArabic(inner) * 1000;
    } else {
      return romanMap[block] ?? NaN;
    }
  });

  let total = 0;
  for (let k = 0; k < values.length; k++) {
    const current = values[k];
    const next = values[k + 1];
    if (isNaN(current)) return "⚠️ Symbole inconnu";
    total += next > current ? -current : current;
  }

  return total;
}

function arabicToRoman(num) {
  num = parseInt(num, 10);
  if (isNaN(num) || num <= 0) return "";
  if (num > 1000000000) return "⚠️ Limite : 1 milliard";

  if (num >= 1000) {
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;
    return `(${arabicToRoman(thousands)})${arabicToRoman(remainder)}`;
  }

  const values = Object.entries(romanMap).sort((a, b) => b[1] - a[1]);
  let result = "";
  for (let [symbol, value] of values) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}

const romanInput = document.getElementById("roman");
const arabicInput = document.getElementById("arabic");

romanInput.addEventListener("input", () => {
  const result = romanToArabic(romanInput.value);
  arabicInput.value = result || "";
});

arabicInput.addEventListener("input", () => {
  const result = arabicToRoman(arabicInput.value);
  romanInput.value = result || "";
});
