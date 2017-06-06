# Kolesar Solver
Ez a projekt két szkriptet tartalmaz: az egyik (Node.js alkalmazás) letölti a válaszokat az oldalról, a másik (Chrome bővítmény) pedig az quiz oldalra való navigáláskor megjelöli a helyes megoldást (amit a letöltött megoldások közül keres ki). A bővítmény mappában megtalálható egy előre letöltött megoldásokat tartalmazó JSON fájl, tehát a bővítmény önmagában is működik, a Node.js alkalmazást csak akkor kell futtatni, ha frissíteni akarod ezt a listát.

A térképek esetében nem tudja megjelölni a jó megoldást.

## Chrome bővítmény telepítése
1. Töltsd le a projekt fájlokat.
2. Nyisd meg a Google Chrome bővítmények oldalát (chrome://extensions/).
3. Pipád ki a "Fejlesztői mód" lehetőséget a jobb felső sarokban.
4. Kattints a "Kicsomagolt bővítmények betöltése..." gombra.
5. Válaszd ki az "extension" mappát a projekt mappáján belül (**ne a projekt mappát magát**).
6. Navigálj a quiz oldalára és a helyes megoldás szaggatottan be lesz keretezve.

## Node.js alkalmazás futtatása
Az alkalmazást csak akkor kell futtatni, ha frissíteni akarod a válasz listát. A futtatáshoz a [Node.js](https://nodejs.org/en/download/current/) programra lesz szükséged. 
1. Telepítsd a fent említett programot.
2. Töltsd le a projekt fájlokat.
3. Navigálj a projekt fájlokhoz egy parancssori segédprogram segítségével (például cmd).
4. Futtasd a `npm install` parancsot, hogy telepísd a szükséges csomagokat.
5. Futtasd a `npm start` parancsot, hogy elindísd a megoldások letöltését.

A megoldásokat az extension mappába, "answers.json" néven menti el.

## Hibák
Ha bármilyen hibát észlelsz az alkalmazással kapcsolatban, vagy kérésed van, nyiss egy új kérelmet [itt](https://github.com/geiszla/KolesarSolver/issues).
