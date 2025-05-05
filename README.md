# Sharky Itemlist

Egy script, mely megjeleníti az összes regisztrált itemet a szervereden, és lehetővé teszi az adminok számára, hogy itemeket adjanak játékosoknak.

## Funkciók
- Összes item megjelenítése képekkel
- Keresés funkció az itemek között
- Admin funkció: itemek adása játékosoknak
- Reszponzív, modern felület

## Követelmények

- ox_inventory
- es_extended

## Használat

A `/openItems` paranccsal nyithatod meg az item listát.

### Admin funkciók

Ha admin vagy (admin vagy superadmin jogosultsággal rendelkezel), akkor:

1. Kattints egy itemre a listában
2. Add meg a cél játékos ID-jét
3. Add meg a mennyiséget
4. Kattints az "Átadás" gombra

## Telepítés

1. Töltsd le a scriptet
2. Helyezd el a resources mappában
3. Add hozzá a `server.cfg` fájlhoz: `ensure sharky_itemlist`
