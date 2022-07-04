import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [     // we are placing this array outside the component becoz every time component is called it will call this card
                        // and i want this card not to create every time. so here is array of object where source property of image is given
  { "src": "/img/helmet-1.png" , matched:false },
  { "src": "/img/potion-1.png" , matched:false },
  { "src": "/img/ring-1.png", matched:false },
  { "src": "/img/scroll-1.png" , matched:false },
  { "src": "/img/shield-1.png" , matched:false },
  { "src": "/img/sword-1.png"  , matched:false},
]

function App() {
  const [cards, setCards]= useState([]) // initially it is an empty array
  const [turns , setTurns] = useState(0) // initially the turns should be zero
  const [choiceOne , setChoiceOne] = useState(null)
  const [choiceTwo , setChoiceTwo] = useState(null)
  const [disabled , setDisabled] = useState(false)


  // shuffle cards
 const shuffleCards = () => {
  const shuffledCards = [...cardImages, ...cardImages] // this will take copy of cardImages and spread them since we require 12 images so 
                                                      //we spread it twice becoz it is set of six images
     .sort(() => Math.random() - 0.5)   //sort will fire the items of array of images so if we return a number grater than 0 the order of items that is comparing                                      
                                        // is same order if less than zero then order of items are shuffled
    .map((card) =>({...card , id: Math.random() }) )     // now we need to map it and give them id property     
    

    setChoiceOne(null) // jb game suru ho to choices null ho jaye
    setChoiceTwo(null)
    setCards(shuffledCards) // here we update the value of Cards
    setTurns(0) // every time when we click on New Game then shuffleCards function will be called and turns should be updated to 0
}

// handle a choice
const handleChoice = (card) => { 
  // console.log(card);
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card) // if choiceOne is true then choice two is to be made else choice one is to be made
                                                      // basically it is done to know whether it is first choice or second
                                                      // yaha pe compare nh kr skte both card ko qki baar baar yeh function update hga jisme time lgega
                                                      // tb tk compare kr lega uske liye useEffect use krenge
}


// compare 2 selected cards
useEffect( () => {                       // useeffect phli baar hmesa update hota h usko rokne ke liye phla if lagaye hai 
 // setDisabled(true)                      // yaha disabled kiye hue sara card. agar disabled yaha rkhenge to sara card disabled hga qki useeffect ek bar render hota h
  if(choiceOne && choiceTwo){
    setDisabled(true)
    if(choiceOne.src === choiceTwo.src){ // agr 1st crd ka location dusre card ke loc se mil jaye tb
      setCards(prevCards => {            // prevCards show kr rha h setCards ka current value 
        return prevCards.map(card => {   // prevCards ko map kiye fr card ka location and choice card ka location ko equate kiye aur fr matched property ko true kr diye
        if(card.src === choiceOne.src){
          return {...card, matched: true} // yaha new object return ho rha jisme matched true ho jayega and pure card ko spread kr denge
        } else {
          return card                     // yaha card object return hga unaffected
        }
      })
    })
      resetTurn()
    } else {
      
      setTimeout(() => resetTurn(), 1000) // jb koi flip match nh krega tb 1 sec lega reset hone me
    }
  }
}, [choiceOne, choiceTwo])  // jb bhi choiceone and choicetwo ka update chnage hga tb useeffct trigger hga fr reset kr dega chocie ko

console.log(cards);

//reset choice & increase turn 
const resetTurn = () => {  // reset kiye qki jb dono choice fill ho jaye tb dodno ko null kr de aur no of turns ko badha de
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false) // disbale band kr dena hai card ka jb comparison khatam ho jayega
}

// start a new game automatically
useEffect( () => {
  shuffleCards()  // jabhi game khole to automaically aa jaye games . new game pe click nh krna pde
}, [])


return (                
    <div className="App">
      <h1>Magic Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        
        {cards.map(card => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice}
          flipped = {card === choiceOne || card === choiceTwo || card.matched} // if we take the card it must be euql to choiceone and it mus be flipped
          // same way second card also flipped  then 3rd condition will be if both card matched then it should be flipped only 
          disabled= {disabled}
          />
          
        ))}

      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
