# Verkefni 4:

## Pages:

### Verkefni4: Þetta er verkefnið sem ég skilaði inn fyrir miðnætti. Ég hafði ekki tíma til þess að vinna meira í því.
  * Pages: https://danielthorr.github.io/2019vor_forr-js/Verkefni4/
  * Github: https://github.com/danielthorr/2019vor_forr-js/tree/master/Verkefni4
  
### Verkefni4_completed: Ég hélt aðeins áfram í verkefninu eftir miðnætti til þessa að hreinsa upp kóða, bæta við fleiri athugasemdum og laga nokkrar litlar villur í kóðanum.
  * Pages: https://danielthorr.github.io/2019vor_forr-js/Verkefni4_completed/
  * Github: https://github.com/danielthorr/2019vor_forr-js/tree/master/Verkefni4_completed


### Uppsetning:
* Í **index.html** er hægt að sjá uppsetningu javascript skjalanna. 
  * Javascript skjölinn okkar eru: **input.js**, **managers.js**, **gameobjects.js** og **main.js* og þeim er hlaðað inn í þessari sömu röð.

### Virkni js skjalanna:

#### input.js:
* Þetta skjal sér um "notanda-input" sem, í þessu tilfelli, er bara lyklaborðið.
* Klasi: `Inputs`
  * Þessi klasi inniheldur tvær breytur, `left` og `right` sem eru notaðar til þess að hreyfa brettið til hægri og vinstri
* Klasi: InputHandler
  * Hér er bætt við `eventListener` og gefið honum `keyDown` og `keyUp` aðferðir sem og skilgreint hvaða takka á lyklaborðinu virkja breyturnar í `Input` klasanum
  
#### managers.js:
* Við erum með `LevelManager` klasa sem býr til og heldur utan um borðin í leiknum og sér um að búa þau til.
  * Klasinn býr til borðin með því að fylla fylki af tölum. 0 stendur fyrir autt bil, 1 stendur fyrir venjulegan "brick" og síðan væri hægt að færa inn fleiri tölur sem samsvara þá öðruvísi týpum af "bricks"
* Við erum líka með `BrickHandler` klasa sem sér um það að búa til "brick-ana"
  * Þessi klasi inniheldur fylkið `bricks` sem er notað síðan til þess að kalla í aðferðir þeirra allra
  * Aðferðin `makeBricks()` sér um það að ná í fylkið úr `LevelManager` til þess að lesa yfir það og fylla `bricks` fylkið með þeim týpum af "bricks" sem eiga við
  
#### gameobjects.js:
* Hér eru klasarnir fyrir öll `gameobjects` í leiknum. Fyrsta ætla ég að sýna hvernig þau tengjast og síðan fara nánar út í það hvernig allt virkar.

```
  GameObjects
      |
      |---> RectObject ---> Paddle
      |                |
      |                |--> Brick
      |
      |---> Ball
```
* Allir `gameobjects` tengjast í gegnum klasan `GameObject` sem hefur ekki margar aðferðir eða breytur en þar væri hægt að bæta þeim við ef þörf væri á því.
  * `RectOBject` er bara einföld aðferð til þess að búa til kassalaga `gameobjects`sem inniheldur fleiri breytur, sem og `draw()` aðferðina sem teiknar `gameobject`-ið og `getBounds`, sem auðveldar aðeins læsileika kóðans seinnameir.
    * `Paddle` er "brettið" sem leikmaðurinn stýrir. Það inniheldur einhvarjar auka breytur sem stjórna hraða og aðferðir til þess að hreyfa brettið og passar að brettið fari ekki útaf skjánum.
    * `Brick` eru kassarnir sem leikmaðurinn er að reyna að útrýma með boltanum. Eina aðferðin sem þessi klasi þarf sem hann fær ekki úr inheritance er `collidedWith()` sem færir kassan útaf skjánum þegar boltinn lendir í kassanum. Síðan erum við reyndar líka að yfirskrifa aðeins `draw()` aðferðina frá `RectObject` til þess að sleppa því að teikna kassann. Í þessari útgáfu er klasin með aðferina `makeBricks()` sem átti ekki að vera með og ég fjarlægði það í verkefni4_completed. 
  * `Ball` er boltinn sem leikmaðurinn má ekki láta sleppa niður fyrir skjáinn og reynir að fá boltann til þess að lenda í "bricks". `Ball` virkar ekki eins og hann á að gera (lagað í verkefni4_completed), þar sem að boltinn skoppar upp frá botninum á leiksvæðinu. Annars hefur boltinn aðferðina `draw()` rétt eins og aðrir `gameobjects`, aðferð til þess að hreyfa sig og síðan "collision" aðferðir sem eru of flóknar til þess að útskýra hér í stuttu máli.

#### main.js:
* Þetta er klasinn sem sér um að binda restina af skjölunum saman:
  * Við skilgreinum alla klasa hér (undartekningin er `Input` klasinn sem var skilgreindur í `input.js` skránni. Ég hefði átt að laga það uppá samræmi).
  * Við erum með aðal lykkjuna hér. Lykkjan gerir...
    * Við köllum í aðferðir boltans til þess að framkvæma "collision detection"
    * Við köllum í aðferðir allra `gameobjects` til þess að teikna þá og við uppfærum stöðu þeirra.
    
## References & inspiraton    
* `input.js`:		kom að miklu leiti út frá þessu myndbandi: [Intro to Game Development with JavaScript - Full Tutorial](https://www.youtube.com/watch?v=3EMxBkqC4z0&t=2490s). Það var þetta myndband sem lét mig detta í hug að gera svona "breakout" leik.
* `managers.js`: 	kom frá sama myndbandi og ég benti á hér að ofan nema ég breytti því og hafði hugsað mér að bæta fleiri hlutum við, t.d. mismunandi "bricks" sem hefðu mismunandi eiginleika og fleiri "levels" sem yrðu sótt í `LevelManager` klasann. `BrickHandler` klasinn kom út frá því að endurhanna eitthvað nokkrum sinnum og ég man hreinlega ekki hvaðan það kom upprunalega.
* `gameobjects.js`: Ég notaði wall collision frá þessari mdn æfingu [mdn-Object building practice](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice). Ég notaði mikið af mismunandi aðferðum og skoðaði endalaust af vefsíðum og myndböndum fyrir aðferðina `collisionDetection()` á `Ball` klasanum. Hluti af því kom frá youtube myndbandinu sem ég talaði um hér efst en það sem endaði á því að leysa collision vandamálið fyrir mig var þessi grein [Rectangle-circle intersection test](https://yal.cc/rectangle-circle-intersection-test/)
* `main.j`s: 		upprunalega setti ég það upp eftir mdn æfingunni sem ég benti á áðan [mdn-Object building practice](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice) en restin kom saman annaðhvort frá mörgum mismunandi stöðum eða hefur breyst bara í gegnum debug og testing.

Það er eflaust eitthvað sem ég er að gleyma hér en ég myndi segja að meirihlutinn af þessu hafi komið frá sjálfum mér með þetta hér fyrir ofan sem innblástur eða notað til þess að hjálpa mér að fá þetta allt saman til þess að virka.
