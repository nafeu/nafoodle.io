import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Game({
  clientId,
  joinedRoom,
  leaveRoom,
  leaveHostlessRoom,
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
    </React.Fragment>
  );
}

export default Game;