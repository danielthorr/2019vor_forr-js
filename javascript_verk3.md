## Verkefni 3. Prototype (5%) JavaScript
### 1. Útskýrðu hvernig `objectar` tengjast í `JavaScript`.

  - Allt í Javascript erfist í gegnum `objecta`. Efst í "`inheritance` keðjunni" er einfaldlega null, en fyrir neðan það er `object prototype` og allir aðrir `object-ar` í javascript erfa frá þessum `object prototype`.

### 2. Útskýrðu kóðann línu fyrir línu.

```
  // This function works as a constructor for the Book prototype
  function Book(isbn) { 
    this.isbn = isbn; // Here we assign a "class variable" to the instanced child object. And we pass in the value from the "new Book(isbn)" parameter.
    // the "this" keyword points to whatever object was instanced along with it. That is, for each instance of an object, "this" points to that specific object.
  }

  // here we assign a function to the Book prototype that its' children can access.
  Book.prototype.getIsbn = function () {
    return "Isbn is " + this.isbn; // Simply returns the object's isbn value (see "this" keyword above)
  };

  // Instantiate a new object whose isbn is "12345", which gets passed on to our "constructor function", which then assigns it to a "class variable" called isbn.
  let bookObject = new Book(12345);

```

### 3. `Prototypal pattern`

#### a) Búðu til þrjár geimflauga `objecta` (f1,f2,f3) með `function smið` sem hafa mismunandi heiti. Geimflaugarnar eiga einnig að hafa `eigindin` speed og life með upphafsgildinu 10. Spaceship-name generator: http://www.fantasynamegenerators.com/spaceshipnames.php#.WnQsPqhl-M8

#### b) Gefðu geimflaugunum mismunandi speed `gildi`.

#### c) Notaðu `Prototype` til að bæta við nýrri `method` fly sem hækkar `gildið` speed um 1. Þetta fá allar flaugarnar (f1,f2,f3).

#### d) Láttu flaug f1 hafa `setLife()` sem hækkar life um 1. Þessa `aðferð` eiga hinar flaugarnar ekki að hafa.
```
  function SpaceShip(name,speed=10, life=10) {
    this.name = name;
    this.speed = speed;
    this.life = life;
  }

  let f1 = new SpaceShip("The Delorean");
  let f2 = new SpaceShip("Epona");
  let f3 = new SpaceShip("S.S. stands for SpaceShip");

  f1.speed = 88;
  f2.speed = 45;
  f3.speed = 65;

  SpaceShip.prototype.fly = function() { this.speed++; }

  f1.setLife = function() { this.life++; }
```
### 4. Gerðu það sama (sambærilegt) og síðasta lið en með notkun `class`. Notaðu eftir þörfum; `constructor`, `get`, `set`, `static`, `extends`, `super`, `mix-ins`.
```
  class SpaceShip 
  {
    constructor(name, speed=10, life=10){
      this.name = name;
      this.speed = speed;
      this.life = life;
    }
    fly() {
      this.speed++;
    }
  }

  let f1 = new SpaceShip("The Delorean", 88);
  let f2 = new SpaceShip("Epona", 45);
  let f3 = new SpaceShip("S.S. stands for SpaceShip", 65);

  f1.setLife = function() { this.life++; }
```
### 5. Hver er munurinn á `Class` og `Prototype`?

Námsmat og skil.
Skilaðu github slóð með lausnum á Innu.
Gefið er full fyrir rétt og fullnægjandi lausn eða svar, hálft ef lausn eða svar er ábótavant.
