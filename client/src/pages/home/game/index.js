import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Graphics } from 'pixi.js';
import { PixiComponent, Stage } from '@inlet/react-pixi';

const Rectangle = PixiComponent('Rectangle', {
  create: props => new Graphics(),
  applyProps: (instance, _, props) => {
    const { x, y, width, height, fill } = props;

    instance.clear();
    instance.beginFill(fill);
    instance.drawRect(x, y, width, height);
    instance.endFill();
  },
});

function WaitingArea({
  joinedRoom,
  leaveRoom,
  clientId,
  startGame
}) {
  const joinableLink = `${window.location.host}/?room=${joinedRoom.id}`;
  const [copied, setCopied] = useState(false);

  return (
    <React.Fragment>
      <h2>Game</h2>
      <p>
        <strong>Link: </strong>
        <CopyToClipboard text={joinableLink}
          onCopy={() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 500);
          }}>
          <span>{copied ? 'Copied to clipboard!' : joinableLink}</span>
        </CopyToClipboard>
      </p>
      <p><strong>Status:</strong> {joinedRoom.status}</p>
      <p><strong>Users:</strong></p>
      <ul>
        {joinedRoom.users.map((user, index) => (
          <li key={index}>{clientId === user.id ? '(you) ' : ''}{user.username}{user.host ? ' is the host.' : ''}</li>
        ))}
      </ul>
      <button onClick={leaveRoom}>
        Leave Room
      </button>
      <button onClick={startGame}>
        Start Game
      </button>
    </React.Fragment>
  );
}

function PlayArea({
  joinedRoom
}) {
  return (
    <div>
      <Stage>
        <Rectangle x={100} y={100} width={500} height={300} fill={0xff0000} />
      </Stage>
    </div>
  )
}

function Game({
  clientId,
  joinedRoom,
  leaveRoom,
  startGame
}) {
  return (
    <React.Fragment>
      {joinedRoom.status === 'PLAYING' ? (
        <PlayArea
          joinedRoom={joinedRoom}
        />
      ) : (
        <WaitingArea
          clientId={clientId}
          joinedRoom={joinedRoom}
          leaveRoom={leaveRoom}
          startGame={startGame}
        />
      )}
    </React.Fragment>
  );
}

export default Game;