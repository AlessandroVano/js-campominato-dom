/**
 * JS-CAMPOMINATO-GRID
 * 
 * L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.


  lista cose da fare in sequenza:

  1. inserimento costante bottone
  2. impostazione evento click del bottone
  3. inserimento costante per eliminare l'h2 e successivamente ci servirà per generare la griglia
  4. inserimento regolina per pulire 
  5. creazione costante per impostare il livello di difficoltà
  6. inserimento costante (all'interno del evento click, quindi andrà a cascata) per definirgli che opzione di difficoltà hai scelto
  7. inserimento di due variabili (let) per definire il numero di celle totali ed il numero di celle per lato
  8. inseritmento di uno switch per settare le due variabili
  9. Generazione griglia padre dove inseriremo le griglie figlie
  9 a. selezioniamo la griglia padre per 'appendergli' i figli appena creati 
  11. generare funzione per creare quadratini e numeri all'interno
  12. generare classe e dimensioni dei quadratini
  13. crea un numero da inserire nel nodo precedente e chiudiamo la funzione
  14. ora useremo il for per andare a creare effettivamente i quadratini
  15. creazione variabile con il numerino che cambierà ogni volta
  16. creazione evento per cambiare il quadratino una volta cliccato
  17. rendere visibile i quadratini (con i numeri in cascata già da prima nel DOM)
 */


  /**
   * Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

      lista cose da fare in sequenza:

      18. Generazione tramite computer di 16 bombe random in numeri che vanno da 1 a 100, non far duplicare i numeri
      19. invochiamo la funzione della generazione numero bombe
      20. creiamo un array per tenere traccia di quanti tentativi sono andati a buon fine
      21. funzione per gestire i click sulle celle
          




   */







// 1. inserimento const del bottone 'gioca'
const setBtn = document.getElementById('imposta-difficolta');
console.log(setBtn);
// 3. inserimento costante per eliminare l'h2 e successivamente ci servirà per generare la griglia
const griglia = document.querySelector('.griglia');
console.log(griglia);
// 5. creazione costante per impostare il livello di difficoltà
const difficoltaLivello = document.getElementById('difficolta');
console.log(difficoltaLivello);


// SETTAGGIO GRIGLIA
// 2. impostazione evento bottone click
setBtn.addEventListener('click', () => {
    console.log('click');
    // 4. eliminazione del contenuto dentro 'griglia'
    griglia.innerHTML = '';
    // 6. inserimento costante (all'interno del evento click, quindi andrà a cascata) per definirgli che opzione di difficoltà hai scelto
    const sceltaDifficoltà = difficoltaLivello.value;
    console.log(sceltaDifficoltà);
    // 7. inserimento di due variabili (let) per definire il numero di celle totali ed il numero di celle per lato
    let numeroCelle;
    let cellePerLato;
    //  8. inseritmento di uno switch per settare le due variabili
    /* scelgo (sceltaDifficoltà) perchè è quella dove ho le tre scelte (easy, medium e hard che ho impostato nel punto .6) */

    /* (100, 81, 49) sono il numero di celle per difficoltà impostata
        (10, 9, 7) questo è quello che di solito calcoliamo nel css per ottenere la quantità di celle disposte x lato  */
    
    switch (sceltaDifficoltà) {
        case '1':
            numeroCelle = 100;
            cellePerLato = 10;
            break;
        case '2':
            numeroCelle = 81;
            cellePerLato = 9;
            break;
        case '3':
             numeroCelle = 49;
             cellePerLato = 7;
            
    }
    console.log(numeroCelle);
    console.log(cellePerLato);


    // 19. invochiamo la funzione della generazione numero bombe
    const listaBombe = bombeGenerate( numeroCelle, 16)
    console.log('Bombe', listaBombe);

    //20. creiamo un array per tenere traccia di quanti tentativi sono andati a buon fine
       const tentativi = [];
       // a) numero massimo di tentativi x vincere
       const tentativiMassimi = numeroCelle - listaBombe.length;
       console.log('Numero massimo di tentativi', tentativiMassimi);


    // 9. Generazione griglia padre dove inseriremo le griglie figlie  inseriamo una costante per creare un elemento (questo è un nodo elaborato con una classe)
    const grigliaJS = document.createElement('div');
    grigliaJS.classList.add('grigliaJS');

 
   
    // 14. ora useremo il for per andare a creare effettivamente i quadratini
   for(let i = 1; i <= numeroCelle; i++) {
     
     
     //  15. richiama la funzione della generazione quadratini

     const square = generazioneQuadratini(i, cellePerLato)
    
     // 16. creazione evento per cambiare il quadratino una volta cliccato
     square.addEventListener('click', () => {
       /*   square.classList.add('clicked'); */
       // 21. funzione per gestire i click sulle celle (invocazione)
       gestioneClickQuadratini(square, listaBombe,tentativi, tentativiMassimi)
     });


      // 17. rendere visibile i quadratini (con i numeri in cascata già da prima nel DOM)
      grigliaJS.append(square); 

   } 
 
      // 9 a. selezioniamo la costante (griglia) padre creata all'inizio per 'appendergli' la griglia.
      griglia.append(grigliaJS);
    });









      // 21. funzione per gestire i click sulle celle 
       function gestioneClickQuadratini(square, listaBombe,tentativi, tentativiMassimi) {
           // a) ottenimento numero quadrato cliccato
           const numero = parseInt(square.innerHTML);
           console.log(numero);
          //  b) bomba colpita
          if(listaBombe.includes(numero)) {
              console.log('bomba beccata');
              //  c) numero non cliccato in precedenza e non una bomba (usando ! in questo caso prima di tentativi)
          } else if (!tentativi.includes(numero)) {
              // aggiunta colore del quadratino
              square.classList.add('safe');
              // aggiugere numero alla lista tentativi fatti
              tentativi.push(numero);
              console.log('Tentativi andati a buon fine', tentativi);
              // controllo se numero tentativi è uguale al numero massimo di tentativi possibili
          }
          
       }




     //  18. Generazione tramite computer di 16 bombe random in numeri che vanno da 1 a 100, non far duplicare i numeri

       // a) Creo una funzione
       function bombeGenerate( celleTotali, nBombe) {
           // b) creo una costante per creare le 16 bombe randomiche 
           const bombe = [];
           // c) uso while (con l'attributo length) e non for per far si che non rigeneri un numero creato prima 
           while(bombe.length < nBombe) {
               // d) invocazione numeroRandom all'interno della funzione bombe generate
               const bomba = numeroRandom( 1, celleTotali); 
               if (!bombe.includes(bomba)) {
                   bombe.push(bomba);
               }
               
           }
           return bombe;
       }



       // c) creo una funzione per i numeri random delle bombe (numeri non univoci)
       function numeroRandom(numeroMinimo, numeroMassimo) {
           return Math.floor( Math.random() * (numeroMassimo - numeroMinimo + 1) ) + numeroMinimo;
       }
    






// 11. generare funzione per creare quadratini e numeri all'interno
function generazioneQuadratini (num, celle) {
    const nodo = document.createElement('div');
    
    //  12. generare classe e dimensioni dei quadratini
    nodo.classList.add('square');
    nodo.style.width = `calc(100% / ${celle})`;
    nodo.style.height = `calc(100% / ${celle})`;


    // 13. crea un numero da inserire nel nodo precedente e chiudiamo la funzione
    nodo.append(num);

     return nodo;
}


