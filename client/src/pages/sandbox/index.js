import React, { useState } from 'react';
import _ from 'lodash';

import Hand from '../home/game/components/hand';
import Board from '../home/game/components/board';
import Deck from '../home/game/components/deck';
import Pile from '../home/game/components/pile';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function Sandbox() {
  const [handA, setHandA] = useState([
    {
      id: uuidv4(),
      cardId: 1
    }
  ]);

  const handleOwnerCardClick = (card, index) => {
    console.log(`Card is ${JSON.stringify(card)} with index of ${index}`)
  }

  const handleOpponentCardClick = (card, index) => {
    console.log(`Opponents card with index of ${index}`)
  }

  return (
    <React.Fragment>
      <Board>
        <button onClick={() => setHandA([...handA, { id: uuidv4(), cardId: _.random(0, 2) }])}>Pick Up</button>
        <button onClick={() => setHandA(handA.length > 0 ? handA.slice(0, handA.length - 1) : [])}>Drop</button>
        <Hand
          hand={handA}
          owner={true}
          handleCardClick={handleOwnerCardClick}
          canClick={true}
        />
        <Hand
          hand={handA}
          owner={false}
          position={'top'}
          handleCardClick={handleOpponentCardClick}
        />
        <Hand
          hand={handA}
          owner={false}
          position={'left'}
          handleCardClick={handleOpponentCardClick}
        />
        <Hand
          hand={handA}
          owner={false}
          position={'right'}
          handleCardClick={handleOpponentCardClick}
        />
        <Deck
          deck={handA}
          position={'middle'}
        />
        <Pile
          pile={handA}
          position={'middle'}
          player={'top'}
          messiness={5}
        />
        <Pile
          pile={handA}
          position={'middle'}
          player={'bottom'}
          messiness={5}
        />
      </Board>
    </React.Fragment>
  );
}

export default Sandbox;