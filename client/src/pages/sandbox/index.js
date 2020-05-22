import React, { useState } from 'react';
import _ from 'lodash';

import Hand from '../../games/components/hand';
import Board from '../../games/components/board';
import Deck from '../../games/components/deck';
import Role from '../../games/components/role';
import Help from '../../games/components/help';
import Actions from '../../games/components/actions';
import Inbox from '../../games/components/inbox';
import PlayerInfo from '../../games/components/player-info';
import SmallAlert from '../../games/components/small-alert';
import MessageBuilder from '../../games/components/message-builder';
import TargetSelector from '../../games/components/target-selector';
import ResultsTable from '../../games/components/results-table';

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
  const [showBuilder, setShowBuilder] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showTargetSelector, setShowTargetSelector] = useState(false);
  const [targetSelector, setTargetSelector] = useState({
    action: '',
    actionDesc: '',
    actionPrompt: ''
  });

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

  const players = [
    { id: '1', username: 'nafeu', color: 'blue'},
    { id: '2', username: 'mariam', color: 'green'},
    { id: '3', username: 'saba', color: 'orange'}
  ];

  const handleOwnerCardClick = (card, index) => {
    console.log(`Card is ${JSON.stringify(card)} with index of ${index}`)
  }

  const handleAction = action => {
    if (action === 1) {
      setShowBuilder(true);
    }
    if (action === 3) {
      setTargetSelector({
        'action': 'SILENT_PROTECTION',
        'actionDesc': 'Protect %TARGET% from recieving 1 damage',
        'actionPrompt': 'Select a player to anonymously protect from 1 damage:'
      });
      setShowTargetSelector(true);
    }
    if (action === 4) {
      setTargetSelector({
        'action': 'CHECK_BODY',
        'actionDesc': 'Check %TARGET%\'s body to reveal their role',
        'actionPrompt': 'Select a dead body to check their role:'
      });
      setShowTargetSelector(true);
    }
  }

  return (
    <React.Fragment>
      <Board>
        <button onClick={() => setHandA([...handA, { id: getNewDate(), cardId: _.random(0, 2) }])}>Pick Up</button>
        <button onClick={() => setHandA(handA.length > 0 ? handA.slice(0, handA.length - 1) : [])}>Drop</button>
        <button onClick={() => setShowResults(!showResults)}>Drop</button>
        <Hand
          hand={handA}
          owner={true}
          handleCardClick={handleOwnerCardClick}
          getCard={getCard}
          canClick={true}
          position={'bottom-middle-right'}
        />
        <Deck
          deck={handA}
          position={'bottom-right'}
        />
        <Inbox
          messages={[
            { sender: '1', text: 'I think %TARGET% is innocent', target: '3' },
            { sender: '2', text: 'Lets protect %TARGET%', target: '1'},
            { sender: '1', text: 'Lets protect %TARGET%', target: '3'},
          ]}
          players={players}
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
          handleClick={(item) => handleAction(item)}
          disabled={true}
        />
        <Help />
        <MessageBuilder
          messageOptions={[
            'I\'m with you.',
            'Lets kill ______.',
            'I think ______ is a traitor.',
            'I think ______ is innocent.',
            'You can\'t fool me.',
            'Let\'s do that again.',
            'Lets protect ______.',
            'I need you to protect me.'
          ]}
          players={players}
          onConfirm={({ recipient, message }) => { setShowBuilder(false); console.log({ type: 'SEND_MESSAGE', payload: { recipient, message } }); }}
          onCancel={() => setShowBuilder(false)}
          show={showBuilder}
        />
        <ResultsTable
          results={[
            {
              title: 'Something happened',
              desc: 'It was not as good as expected.',
              icon: '😡'
            },
            {
              title: 'Something else happened',
              desc: 'It was alright.',
              icon: '🙁'
            },
            {
              title: 'Espionage Detected',
              desc: 'I promise this isn\'t some lame cashgrab.',
              icon: '🙏'
            },
            {
              title: 'Test Notes',
              desc: 'This is for testing.',
              icon: '👀'
            },
            {
              title: 'Someone Did Silent Damage',
              desc: 'Someone took damage from a traitor.',
              icon: '👺'
            },
            {
              title: 'Finish Game',
              desc: 'Lets just get this over with.',
              icon: '💻'
            },
          ]}
          show={showResults}
        />
        <TargetSelector
          players={players}
          action={targetSelector.action}
          actionDesc={targetSelector.actionDesc}
          actionPrompt={targetSelector.actionPrompt}
          onConfirm={({ action, target }) => { setShowTargetSelector(false); console.log({ type: 'PERFORM_ACTION', payload: { action, target } }); }}
          onCancel={() => setShowTargetSelector(false)}
          show={showTargetSelector}
        />
        <Role
          gamerole={'traitor'}
          codeword={'pickle'}
          color={'red'}
        />
        <PlayerInfo
          player={player}
          position={'bottom-middle-right'}
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