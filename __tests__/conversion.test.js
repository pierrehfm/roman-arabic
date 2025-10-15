// Importation des fonctions à tester
const { romanToArabic, arabicToRoman, validateRomanString } = require("../conversion");

  
  // --- TESTS ROMAIN -> ARABE ---
  describe("Conversion Romain vers Arabe", () => {
    test("I → 1", () => {
      expect(romanToArabic("I")).toBe(1);
    });
  
    test("IV → 4", () => {
      expect(romanToArabic("IV")).toBe(4);
    });
  
    test("MCMXCIV → 1994", () => {
      expect(romanToArabic("MCMXCIV")).toBe(1994);
    });
  
    test("(V) → 5000", () => {
      expect(romanToArabic("(V)")).toBe(5000);
    });
  
    test("((X))(V)I → 10005001", () => {
      expect(romanToArabic("((X))(V)I")).toBe(10005001);
    });
  
    test("Entrée vide → ''", () => {
      expect(romanToArabic("")).toBe("");
    });
  
    test("Parenthèse non fermée → message erreur", () => {
      expect(romanToArabic("(X")).toMatch(/⚠️/);
    });
  });
  
  // --- TESTS ARABE -> ROMAIN ---
  describe("Conversion Arabe vers Romain", () => {
    test("1 → I", () => {
      expect(arabicToRoman(1)).toBe("I");
    });
  
    test("4 → IV", () => {
      expect(arabicToRoman(4)).toBe("IV");
    });
  
    test("3999 → MMMCMXCIX", () => {
      expect(arabicToRoman(3999)).toBe("MMMCMXCIX");
    });
  
    test("4000 → (IV)", () => {
      expect(arabicToRoman(4000)).toBe("(IV)");
    });
  
    test("5000000 → ((V))", () => {
      expect(arabicToRoman(5000000)).toBe("((V))");
    });
  
    test("> 1 milliard → message erreur", () => {
      expect(arabicToRoman(1000000001)).toMatch(/⚠️/);
    });
  });
  
  // --- TESTS DE VALIDATION ---
  describe("Validation des chiffres romains", () => {
    test("IIII → Trop de répétitions", () => {
      expect(validateRomanString("IIII")).toMatch(/Trop de répétitions/);
    });
  
    test("IC → Soustraction invalide", () => {
      expect(validateRomanString("IC")).toMatch(/Soustraction invalide/);
    });
  
    test("(X → Parenthèses non fermées", () => {
      expect(validateRomanString("(X")).toMatch(/non fermées/);
    });
  
    test("Caractères invalides", () => {
      expect(validateRomanString("ABC")).toMatch(/Caractères invalides/);
    });
  });
  