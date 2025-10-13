const romanMap = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
    G: 10000, P: 100000, T: 1000000,
    B: 10000000, N: 100000000, Z: 1000000000
};
const values = Object.entries(romanMap).sort((a, b) => b[1] - a[1]);

function romanToArabic(roman) {
    if (!roman) return "";
    roman = roman.toUpperCase();
    let total = 0;
    for (let i = 0; i < roman.length; i++) {
        const current = romanMap[roman[i]];
        const next = romanMap[roman[i + 1]];
        if (!current) return "⚠️ Symbole inconnu";
        total += next > current ? -current : current;
    }
    return total;
}

function arabicToRoman(num) {
    num = parseInt(num, 10);
    if (isNaN(num) || num <= 0) return "";
    if (num > 1000000000) return "⚠️ Limite : 1 milliard";
    
    let result = "";
    for (let i = 0; i < values.length; i++) {
        const [symbol, value] = values[i];
        const nextValue = values[i + 1] ? values[i + 1][1] : 0;
        
        while (num >= value) {
            result += symbol;
            num -= value;
        }
        
        if (nextValue && num + nextValue >= value - nextValue && num < value) {
            const diff = value - nextValue;
            if (num >= diff) {
                result += values[i + 1][0] + symbol;
                num -= diff;
            }
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