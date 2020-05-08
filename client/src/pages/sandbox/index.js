import React, { useState } from 'react';
import _ from 'lodash';

import Hand from '../../games/components/hand';
import Board from '../../games/components/board';
import Deck from '../../games/components/deck';
import Role from '../../games/components/role';
import Actions from '../../games/components/actions';
import Inbox from '../../games/components/inbox';
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

  return (
    <React.Fragment>
      <Board>
        <button onClick={() => setHandA([...handA, { id: getNewDate(), cardId: _.random(0, 2) }])}>Pick Up</button>
        <button onClick={() => setHandA(handA.length > 0 ? handA.slice(0, handA.length - 1) : [])}>Drop</button>
        <Hand
          hand={handA}
          owner={true}
          handleCardClick={handleOwnerCardClick}
          getCard={getCard}
          canClick={true}
        />
        <Deck
          deck={handA}
          position={'middle'}
        />
        <Inbox
          messages={[
            { sender: '1', text: 'I think %TARGET% is innocent', target: '3' },
            { sender: '2', text: 'Lets protect %TARGET%', target: '1'},
            { sender: '1', text: 'Lets protect %TARGET%', target: '3'},
          ]}
          players={[
            { id: '1', username: 'nafeu', color: 'blue'},
            { id: '2', username: 'mariam', color: 'green'},
            { id: '3', username: 'saba', color: 'orange'}
          ]}
        />
        <Actions
          actions={[
            {
              id: 1,
              name: 'Send Private Message',
              desc: 'Send another villager a private message.'
            },
            {
              id: 2,
              name: 'Switch Target',
              desc: 'Switch targets if needed during a standoff.'
            },
            {
              id: 3,
              name: 'Silent Protection',
              desc: 'Save someone or yourself from taking 1 dmg.'
            },
            {
              id: 4,
              name: 'Check Body',
              desc: 'Check a dead body to confirm their role.'
            },
          ]}
          handleClick={(item) => console.log(`Perform action: ${item}`)}
          disabled={true}
        />
        <Role
          gamerole={'traitor'}
          codeword={'pickle'}
          color={'red'}
        />
        <PlayerInfo
          player={player}
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