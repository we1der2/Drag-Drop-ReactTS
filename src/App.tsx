import React,{useState} from 'react';
import './App.css';

interface ICard {
  id: number,
  order: number,
  text: string,
}

interface IDragDrop {
  (e: React.DragEvent<HTMLDivElement>, card?: ICard ): void
}
function App() {
   const [cardList, setCardList]= useState<ICard[]>([
        {id: 1, order: 1, text: 'Card 1'},
        {id: 2, order: 2, text: 'Card 2'},
        {id: 3, order: 3, text: 'Card 3'},
        {id: 4, order: 4, text: 'Card 4'},
      ])
      const [currentCard, setCurrentCard] = useState<ICard|null>(null)

      const handlerDragStart:IDragDrop=(e,card)=>{
        if (card!==undefined) {
        setCurrentCard(card)  
        }
      }

      const handlerDragEnd:IDragDrop=(e)=>{

      }
      const handlerDrop:IDragDrop=(e,card)=>{
        e.preventDefault()
        setCardList(cardList.map(c=>{
          if (c.id===card?.id){
            if (currentCard?.order!==undefined)
            return {...c, order: currentCard?.order}
          } 
          if (c.id===currentCard?.id){
            if (card?.order!==undefined)
            return {...c, order: card?.order}
          } 
          return c
        }))
        // if (e.target instanceof HTMLElement)
        // e.target.style.background = 'white'
      }

      const handlerDragOver:IDragDrop=(e)=>{
        e.preventDefault();
        if (e.target instanceof HTMLElement) {
        e.target.style.background = 'lightgrey';}
      }

      const handlerDragLeave:IDragDrop=(e)=>{
        if (e.target instanceof HTMLElement) {
          e.target.style.background = '';}
      }

      const sortCards =(a:ICard,b:ICard): number=>{
        return a.order > b.order ? 1 : -1;
      }

  return (

  
    <div className="App">  
    <h2>Just Drag&Drop IT</h2>
    <div className='cards'>
    {
      cardList.sort(sortCards).map(card=>
        <div 
        key={card.id} 
        className='card'
        draggable
        onDragStart={(e)=>handlerDragStart(e,card)}
        onDragEnd={(e)=>handlerDragEnd(e)}
        onDrop={(e)=>handlerDrop(e,card)}
        onDragOver={(e)=>handlerDragOver(e)}
        onDragLeave={(e)=>handlerDragLeave(e)}
        >
          {card.text}
          </div>
        )
    }
    </div>
    </div>

  );
}

export default App;
