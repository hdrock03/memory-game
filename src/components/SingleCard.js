import './SingleCard.css'

const SingleCard = ({card , handleChoice , flipped , disabled}) => {

    const handleClick = () => {  // yeh function banaye qki hmlog ko check krna tha ki kon sa card pe click kiye h 
        if (!disabled) {   // jb disabled false rhega tbhi handlechoice trigger hga
            handleChoice(card)       // yeh handleChoice jo call kiye hai iske liyte hi banaye hai app.js me taki card ko direcly pro ke through call kr ske

        }
    }


    return (

        <div className="card">
        <div className={flipped ? "flipped" : "" }>  
        {/* here we write the condition like if flipped is true then flipped class must execute else emty array means this whole div will not show there */}
            <img className='front' src={card.src} alt="card front" /> 
            {/* yeh image front ka hoga aur dynamically le rhe hai cardImages se  */}
            <img className='back' src="./img/cover.png" onClick={handleClick} alt="card back" />
            {/* yeh image back cover hai to iska source likh rhe ki kis file se lana hai isko */}
        </div>
        </div>
     );
}
 
export default SingleCard;