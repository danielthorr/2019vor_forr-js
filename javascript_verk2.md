Verkefni 2 - Objects (5%)
### 1. Búðu til object með upplýsingar um þig; nafn, kennitala, heimilsfang, heimasími og gsm.

```
let me = {
    name: {firstName: "Jón", middleName: "J", lastName: "Jónsson"},
    age: 25,
    kennitala: "0102427789",
    heimilisfang: "Street Str 001",
    heimasími: "N/A - outdated",
    gsm: ["354 1234567", "354 9876543"]
}
```

### 2. Notaðu for…in lykkjuna til að birta öll eigindin (e. property) ásamt gildum í objectinu í lið 1.

```
//Notum "me" sem ég bjó til í dæmi 1
for (let prop in me){
    //prentum út í console property heitið og property gildið
    console.log(prop + ": " + me[prop]);
    
    //Af því að ég ákvað að nota object í property þá þurfum við að taka smá nested loop hér
    //Ég myndi gera þetta öðruvísi ef þetta væri annað verkefni en ég hef þetta svona til þess að lengja ekki svarið
    if (prop === "name"){
        for (let nestedProp in me[prop]){
            console.log(nestedProp + ": " + me[prop][nestedProp]);
        }
    }
}
```

### 3. Bættu við aðferð í objectið sem þú gerðir í lið 1. Aðferðin á að skila streng sem inniheldur nafn og aldur.  

    ```me.showInfo = function(){ return this.name.firstName + " " + this.age }```

### 4. Prentaðu út með console.log() Nonni.

```
    let family = {
      "parents":
      {
        "fathers": [{"name":"Jakob"},{"name":"Nonni"}],
        "mothers":[{"name":"Rakel"},{"name":"Sara"}]
      }
    };


    console.log(family.parents.fathers[1].name);
```
 
### 5. Leystu lið 8 í lesson 7 - Objects á Udacity

```
    let breakfast = {
        name: "The Lumberjack",
        price: 9.95,
        ingredients: ["eggs", "sausage", "toast", "hashbrowns", "pancakes"]
    }
```

### 6. Leystu lið 9 í lesson 7 - Objects á Udacity

```
    var savingsAccount = {
    balance: 1000,
    interestRatePercent: 1,
    
    //Removed unneeded code for a cleaner look
    
    //My code goes here
    printAccountSummary: function(){
        return "Welcome!\nYour balance is currently $" + this.balance + " and your interest rate is " + this.interestRatePercent + "%.";
    }
};

console.log(savingsAccount.printAccountSummary());
```

### 7. Leystu lið 12 í lesson 7 - Objects á Udacity

```
    let donuts = [
        { type: "Jelly", cost: 1.22 },
        { type: "Chocolate", cost: 2.45 },
        { type: "Cider", cost: 1.59 },
        { type: "Boston Cream", cost: 5.99 }
    ];

    // your code goes here
    donuts.forEach(function(donut){
        console.log(donut.type + " donuts cost $" + donut.cost + " each");
    });
```

### 8. Eru öll eigindi (e. properties) í sömu röð og þeim var bætt í object, rökstuddu?

  - Það virðist vera að Javascript raði upp `canonical numeric strings` í talnaröð, þar sem lægsta talan er fyrst - eftir það raðar það `string`-keyed `properties` í þeirri röð sem því var bætt inn og seinast `symbol`-keyed `properties` í þeirri röð sem þeim var bætt inn.
    - (Ég datt ofan í "the rabbit hole" og ég týndist þar í margar klukkustundir, ég vona að ég hafi skilið eitthvað af þessu rétt).
    - Ég fann ekkert um það hvernig `javascript` kallar í eða notfærir sér `internal methods` eða `internal slots` (frá `ecmascript`) en það sem ég skildi útfrá `ecmascript 6` þá eru `properties` raðað í `object` í þeirri röð sem þeim var bætt við í `object`-ið jafnvel þó svo að `javascript` virðist ekki hegða sér þannig.  
    - Þegar þú kallar á `aðferð` eins og `for-in`, þá sýnist mér að `ecmascript` kóðinn `destructure`-i `object`-ið, athugar hvort að `strengurinn` fyrir `property name` sé `canonical numeric string` (með aðferðinni `CanonicalNumericIndexString()` sem skilar `boolean`). 
    - Kóðinn flokkar þá fyrst þau `property` sem eru `canonical numeric strings`, síðan öll önnur `property` heiti sem eru `strengir` eftir þeirri röð sem þeim var bætt inn og síðan öllum `properties` sem eru `symbols` í þeirri röð sem þeim var bætt inn.  
    - Hins vegar er það ekki endilega eins með öllum `aðferðum` hvort að því sé raðað í þessari röð eða ekki. - Sérstaklega þá hvort að aðferðin kallar í `internal method` á `property`-inu sem kallast `[[OwnPropertyKeys()]]`. 

### 9. Útskýrðu hvað eftirfarandi kóði gerir.

```
    let user = { name: "John" };  
    let admin = user;
```
  - `let admin = user;` býr til `reference` sem bendir á staðinn í minninu þar sem `object`-ið er geymt. Þegar kallað er í `user` eða `admin` er okkur í rauninni bent á þann stað í minninu sem inniheldur `object`-ið og við lesum það.
  - Það þýðir að ef við breytum `property`-inu `"name"`, breytist það líka ef við köllum í það í gegnum admin:
```
  let user = {name:"John"};
  let admin = user;
  
  //Hér sýnir admin breytan okkur að hún bendir á object sem inniheldur property-ið "name" með gildinu "John"
  console.log(admin);
  
  //Við breytum gildinu fyrir name property-ið í gegnum user
  user.name = "Daniel";
  //Jafnvel þó svo að við höfum ekki breytt neinu í gegnum admin breytuna, 
  //kallar hún á sama stað í minninu og var breytt af user breytunni
  console.log(admin);
```

  - Það þýðir það líka að ef breytan `user` er fjarlægð úr minni, bendir `admin` ennþá á sama stað í minninu eins og það sem gerist hér:
```
  //Við búum til admin sem undefined breytu.
  let admin;
  function init(){
    //Búum til admin sem object með property-inu "name" og látum admin benda á það
  	let user = {name:"John"};
    admin = user;
  }
  
  init();
  
  //Eftir að function-ið er búið að keyra, er user breytan ekki lengur til og við fáum ReferenceError þegar við köllum í það
  //Hins vegar object-ið í ennþá til í minninu þannig að admin getur ennþá kallað á það
  console.log(admin);
  console.log(user);
```

### 10. Afhverju virkar eftirfarandi?

```
    const user = {
     name: "John"
    };  
    user.age = 25;
    alert(user.age); // 25
```

  - `const` breytur eru kallaðar `immutable` sem þýðir það að þú verður að gefa þeim gildi um leið og þær eru búnar til og það er ekki hægt að breyta gildinu á þeim. Hins vegar eru breyturnar sjálfar bara `immutable` í `ecmascript` en ekki gildin sem breyturnar benda á (breyturnar innihalda `reference` á gildið, þetta `reference` er immutable). 
  - Þ.e.a.s. þegar þú býrð til `object` af týpunni  `const` er breytan að "benda" á `object`-ið sjálft, en ekki `property`-in sem `object`-ið inniheldur. Þess vegna er hægt að breyta og bæta við `properties` á `const object`s.

Námsmat og skil:
Gefið er fullt fyrir rétt og fullnægjandi svar og skýringu þegar það á við, hálft ef svar eða skýring
er ábótavant.