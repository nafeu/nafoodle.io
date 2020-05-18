import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { getPlayer } from '../../tv/services';
import _ from 'lodash';

const useStyles = createUseStyles(theme => ({
  wrapper: {
    position: "absolute",
    bottom: "33vh",
    left: "20%",
    width: "60%",
    height: "50vh",
  },
  messageBuilderContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    fontSize: "0.75em",
    border: "2px solid white"
  },
  messageBuilder: {
    width: "100%",
  },
  finalMessagePreview: {
    backgroundColor: "blue",
    position: "absolute",
    bottom: "0px",
    width: "70%",
    left: "15%",
    height: "5vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  recipientPreview: {
    backgroundColor: "green",
    position: "absolute",
    bottom: "0px",
    left: "0px",
    width: "15%",
    height: "5vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cancelButton: {
    backgroundColor: "red",
    position: "absolute",
    bottom: "0px",
    left: "85%",
    width: "15%",
    height: "5vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  recipientOptions: {
    backgroundColor: "orange",
    position: "absolute",
    top: "0px",
    width: "100%",
    height: "45vh"
  },
  messageOptions: {
    backgroundColor: "pink",
    position: "absolute",
    top: "0px",
    width: "100%",
    height: "45vh"
  },
  targetOptions: {
    backgroundColor: "black",
    position: "absolute",
    top: "0px",
    width: "100%",
    height: "45vh"
  },
}));

const insertTargetMacro = (message, target) => {
  return message.replace('______', `[${target}]`);
}

const interpolateTargetMacro = (players, message) => {
  if (!message) {
    return '';
  }

  const numberPattern = /(?<=\[)(.*?)(?=\])/g;
  const bracketPattern = /[[\]]/g;

  const idMatch = message.match(numberPattern);

  if (!idMatch || idMatch.length === 0) {
    return message;
  }

  const { username } = getPlayer(players, idMatch[0]);

  return message.replace(numberPattern, username).replace(bracketPattern, '');
}

const getPlayerName = (players, id) => {
  if (!id) {
    return '';
  }
  return getPlayer(players, id).username;
}

function MessageBuilder({ players, messageOptions, handleConfirm, handleCancel, show }) {
  const classes = useStyles();

  const initState = {
    step: 'recipient',
    recipient: null,
    message: null
  }

  const [state, setState] = useState(initState);

  if (!show) {
    return '';
  }

  const { step, recipient, message } = state;

  const handleSelectRecipient = selection => {
    setState({ ...state, recipient: selection, step: 'message' });
  }

  const handleSelectMessage = selection => {
    setState({ ...state, message: selection, step: _.includes(selection, '______') ? 'target' : 'finalize' });
  }

  const handleSelectTarget = selection => {
    setState({ ...state, message: insertTargetMacro(state.message, selection), step: 'finalize' });
  }

  let options;

  if (step === 'recipient') {
    options = <RecipientOptions recipientOptions={players} handleSelectRecipient={handleSelectRecipient} />
  } else if (step === 'message') {
    options = <MessageOptions messageOptions={messageOptions} handleSelectMessage={handleSelectMessage} />
  } else if (step === 'target') {
    options = <TargetOptions targetOptions={players} handleSelectTarget={handleSelectTarget} />
  } else {
    options = <FinalizeMessage
      players={players}
      message={message}
      handleCancel={() => { setState(initState); handleCancel(); }}
      handleConfirm={handleConfirm}
    />
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.messageBuilderContainer}>
        <div className={classes.messageBuilder}>
          {options}
          {step !== 'finalize' &&
            (
              <React.Fragment>
                <RecipientPreview players={players} recipient={recipient} />
                <FinalMessagePreview players={players} message={message} />
                <CancelButton handleCancel={() => { setState(initState); handleCancel(); }} />
              </React.Fragment>
            )
          }
        </div>
      </div>
    </div>
  );
}

function RecipientPreview({ players, recipient }) {
  const classes = useStyles();

  return (
    <div className={classes.recipientPreview}>{getPlayerName(players, recipient)}</div>
  );
}

function FinalMessagePreview({ players, message }) {
  const classes = useStyles();

  return (
    <div className={classes.finalMessagePreview}>{interpolateTargetMacro(players, message)}</div>
  );
}

function CancelButton({ handleCancel }) {
  const classes = useStyles();

  return (
    <div onClick={handleCancel} className={classes.cancelButton}>Cancel</div>
  );
}

function RecipientOptions({ recipientOptions, handleSelectRecipient }) {
  const classes = useStyles();

  return (
    <div className={classes.recipientOptions}>
      {recipientOptions.map(({ id, username }) => {
        return (
          <div onClick={() => handleSelectRecipient(id)}>{username}</div>
        );
      })}
    </div>
  )
}

function MessageOptions({ messageOptions, handleSelectMessage }) {
  const classes = useStyles();

  return (
    <div className={classes.messageOptions}>
      {messageOptions.map(option => {
        return (
          <div onClick={() => handleSelectMessage(option)}>{option}</div>
        );
      })}
    </div>
  )
}

function TargetOptions({ targetOptions, handleSelectTarget }) {
  const classes = useStyles();

  return (
    <div className={classes.targetOptions}>
      {targetOptions.map(({ id, username }) => {
        return (
          <div onClick={() => handleSelectTarget(id)}>{username}</div>
        );
      })}
    </div>
  );
}

function FinalizeMessage({ players, message, handleCancel, handleConfirm }) {
  const classes = useStyles();

  return (
    <div class={classes.finalMessage}>{interpolateTargetMacro(players, message)}</div>
  );
}

export default MessageBuilder;