## Verkefni 3. Prototype (5%) JavaScript
### 1. Útskýrðu hvernig `objectar` tengjast í `JavaScript`.

### 2. Útskýrðu kóðann línu fyrir línu.

```
  function Book(isbn) {
    this.isbn = isbn;
  }

  Book.prototype.getIsbn = function () {
    return "Isbn is " + this.isbn;
  };

  let bookObject = new Book(12345);

```

### 3. `Prototypal pattern`

#### a) Búðu til þrjár geimflauga `objecta` (f1,f2,f3) með `function smið` sem hafa mismunandi heiti. Geimflaugarnar eiga einnig að hafa `eigindin` speed og life með upphafsgildinu 10. Spaceship-name generator: http://www.fantasynamegenerators.com/spaceshipnames.php#.WnQsPqhl-M8

#### b) Gefðu geimflaugunum mismunandi speed `gildi`.

#### c) Notaðu `Prototype` til að bæta við nýrri `method` fly sem hækkar `gildið` speed um 1. Þetta fá allar flaugarnar (f1,f2,f3).

#### d) Láttu flaug f1 hafa `setLife()` sem hækkar life um 1. Þessa `aðferð` eiga hinar flaugarnar ekki að hafa.

### 4. Gerðu það sama (sambærilegt) og síðasta lið en með notkun `class`. Notaðu eftir þörfum; `constructor`, `get`, `set`, `static`, `extends`, `super`, `mix-ins`.

### 5. Hver er munurinn á `Class` og `Prototype`?

Námsmat og skil.
Skilaðu github slóð með lausnum á Innu.
Gefið er full fyrir rétt og fullnægjandi lausn eða svar, hálft ef lausn eða svar er ábótavant.
