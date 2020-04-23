import React, { useState } from 'react';
import _ from 'lodash';

import Hand from '../home/game/components/hand';
import Board from '../home/game/components/board';
import Deck from '../home/game/components/deck';
import Pile from '../home/game/components/pile';
import PlayerInfo from '../home/game/components/player-info';
import BigAlert from '../home/game/components/big-alert';

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

  const [alert, setAlert] = useState(false);

  const showAlert = (aliveMs) => {
    if (!alert) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, aliveMs);
    }
  }

  const player = {
    id: 'a',
    username: 'Nafeu',
    action: null,
    actionCount: 0,
    hp: 20,
    hand: [handA],
    pile: []
  }

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
        <button onClick={() => showAlert(1000)}>Toggle</button>
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
          hideTop={true}
        />
        <Pile
          pile={handA}
          position={'middle'}
          player={'bottom'}
          messiness={5}
        />
        <PlayerInfo
          player={player}
        />
        <PlayerInfo
          player={player}
          position={'left'}
        />
        <PlayerInfo
          player={player}
          position={'right'}
        />
        <PlayerInfo
          player={player}
          position={'top'}
        />
        <BigAlert
          title={'Test Big Alert'}
          type={'success'}
          body={'Testing...'}
          show={alert}
          alive={1000}
        />
      </Board>
    </React.Fragment>
  );
}

export default Sandbox;