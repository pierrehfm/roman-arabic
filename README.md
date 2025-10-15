# Convertisseur chiffres romains ↔ chiffres arabes

## 1. Présentation du projet
Ce projet a été réalisé dans le cadre d’un travail de **gestion de projet informatique**.  
L’objectif était de développer une **application web simple** permettant de convertir un nombre exprimé en **chiffres romains** vers son équivalent en **chiffres arabes**, et inversement.

Le projet comprend également une **phase de test automatisée** pour valider la fiabilité du code et la gestion des erreurs de saisie.

---

## 2. Structure du dépôt
```
roman-arabic/
│
├── index.html               # Page principale de l'application
├── style.css                # Feuille de style
├── script.js                # Logique d'interface (liée au DOM)
├── src/
│   └── conversion.js        # Fonctions de conversion testables
├── __tests__/
│   └── conversion.test.js   # Tests unitaires Jest
├── package.json             # Fichier de configuration des dépendances
└── README.md                # Présent document
```

---

## 3. Fonctionnement de l’application

### Utilisation
Aucune installation n’est nécessaire pour la partie applicative.  
Il suffit d’ouvrir le fichier **`index.html`** dans un navigateur web (Chrome, Edge, Firefox…).

Deux champs de saisie sont disponibles :
- **Chiffres romains** → conversion automatique vers arabes  
- **Chiffres arabes** → conversion automatique vers romains  

Les **parenthèses** multiplient la valeur par 1 000.  
Exemples :  
- `(V)` = 5 000  
- `((I))` = 1 000 000  

L’application gère les erreurs de saisie et affiche un message ⚠️ en cas d’anomalie.

---

## 4. Partie test

### ⚙️ Technologies utilisées
Les tests unitaires ont été réalisés avec **Jest**, un framework JavaScript simple d’utilisation.  
Ils valident les fonctions principales :
- `romanToArabic()`
- `arabicToRoman()`
- `validateRomanString()`

### Installation
> Ces étapes sont uniquement nécessaires si vous souhaitez exécuter les tests.

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer les tests unitaires
npm test
```

---

## 5. Cas de test principaux

| Type | Exemple | Résultat attendu |
|------|----------|------------------|
| Conversion simple | `XII` → 12 | OK |
| Soustraction | `IV` → 4 | OK |
| Étendue | `(V)` → 5000 | OK |
| Invalide | `IIII` → ⚠️ Trop de répétitions | OK |
| Limite | `1000000001` → ⚠️ Limite : 1 milliard | OK |

Tous les tests ont été validés avec succès.

---

## 6. Auteurs
Projet réalisé par **[Ton Nom / Groupe]**,  
dans le cadre du module *Gestion de projet* – année 2025.  

Encadrant : *[Nom du professeur ou intervenant]*  
Version : 1.0

---

## 7. Licence
Projet à usage pédagogique.  
Libre de réutilisation à des fins d’apprentissage.
