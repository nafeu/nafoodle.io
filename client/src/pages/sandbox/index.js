import React, { useState } from 'react';
import _ from 'lodash';

import Hand from '../../games/components/hand';
import Board from '../../games/components/board';
import Mat from '../../games/components/mat';
import Platform from '../../games/components/platform';
import Deck from '../../games/components/deck';
import Pile from '../../games/components/pile';
import PlayerInfo from '../../games/components/player-info';
import SmallAlert from '../../games/components/small-alert';

import { getCard } from '../../games/rps/services';

const getNewDate = () => {
  const date = new Date();
  return date.toISOString();
}

function Sandbox() {
  const [handA, setHandA] = useState([
    {
      id: getNewDate(),
      cardId: 1,
      face: 'up'
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
        <button onClick={() => setHandA([...handA, { id: getNewDate(), cardId: _.random(0, 2) }])}>Pick Up</button>
        <button onClick={() => setHandA(handA.length > 0 ? handA.slice(0, handA.length - 1) : [])}>Drop</button>
        <button onClick={() => showAlert(1000)}>Toggle</button>
        <Mat />
        <Platform />
        <Platform position={'top'} color={'red'}/>
        <Platform position={'left'} color={'blue'} />
        <Platform position={'right'} color={'green'} />
        <Hand
          hand={handA}
          owner={true}
          handleCardClick={handleOwnerCardClick}
          getCard={getCard}
          canClick={true}
        />
        <Hand
          hand={handA}
          owner={false}
          position={'top'}
          getCard={getCard}
          handleCardClick={handleOpponentCardClick}
        />
        <Hand
          hand={handA}
          owner={false}
          position={'left'}
          getCard={getCard}
          handleCardClick={handleOpponentCardClick}
        />
        <Hand
          hand={handA}
          owner={false}
          position={'right'}
          getCard={getCard}
          handleCardClick={handleOpponentCardClick}
        />
        <Deck
          deck={handA}
          position={'middle'}
        />
        <Pile
          getCard={getCard}
          pile={handA}
          position={'middle'}
          player={'top'}
          messiness={5}
        />
        <Pile
          getCard={getCard}
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
        <SmallAlert
          title={'Nice!'}
          type={'success'}
          position={'left'}
          body={'+10 HP'}
          show={alert}
          alive={500}
        />
      </Board>
    </React.Fragment>
  );
}

export default Sandbox;