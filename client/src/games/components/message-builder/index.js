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
    position: "absolute",
    bottom: "0px",
    left: "85%",
    width: "15%",
    height: "5vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    '&:active': { opacity: "0.2" },
    '&:hover': { opacity: "0.5" },
  },
  recipientOptions: {
    position: "absolute",
    top: "0px",
    width: "100%",
    height: "45vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  recipientOption: {
    fontSize: "2em",
    padding: "10px",
    cursor: "pointer",
    '&:active': { opacity: "0.2" },
    '&:hover': { opacity: "0.5" },
  },
  messageOptions: {
    position: "absolute",
    top: "0px",
    width: "100%",
    height: "45vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  messageOption: {
    fontSize: "1.4em",
    padding: "5px",
    cursor: "pointer",
    '&:active': { opacity: "0.2" },
    '&:hover': { opacity: "0.5" },
  },
  targetOptions: {
    position: "absolute",
    top: "0px",
    width: "100%",
    height: "45vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  targetOption: {
    fontSize: "2em",
    padding: "5px",
    cursor: "pointer",
    '&:active': { opacity: "0.2" },
    '&:hover': { opacity: "0.5" },
  },
  stepTitle: {
    padding: "20px",
    fontSize: "1.5em"
  },
  finalStep: {
    position: "absolute",
    top: "0px",
    width: "100%",
    height: "45vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  finalRecipient: {
    fontSize: "1.7em",
    padding: "5px",
  },
  finalMessage: {
    fontSize: "1.7em",
    padding: "5px",
  },
  finalCancel: {
    display: "inline-block",
    fontSize: "1.7em",
    cursor: "pointer",
    padding: "15px",
    '&:active': { opacity: "0.2" },
    '&:hover': { opacity: "0.5" },
  },
  finalConfirm: {
    display: "inline-block",
    fontSize: "1.7em",
    cursor: "pointer",
    padding: "15px",
    '&:active': { opacity: "0.2" },
    '&:hover': { opacity: "0.5" },
  }
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

function MessageBuilder({ players, messageOptions, onConfirm, onCancel, show }) {
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

  const handleCancel = () => {
    setState(initState);
    onCancel();
  }

  const handleConfirm = ({ recipient, message }) => {
    setState(initState);
    onConfirm({ recipient, message });
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
      recipient={recipient}
      message={message}
      handleCancel={handleCancel}
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
    <div className={classes.recipientPreview}>TO: {recipient ? getPlayerName(players, recipient) : '___'}</div>
  );
}

function FinalMessagePreview({ players, message }) {
  const classes = useStyles();

  return (
    <div className={classes.finalMessagePreview}>MESSAGE: {message ? interpolateTargetMacro(players, message) : '...'}</div>
  );
}

function CancelButton({ handleCancel }) {
  const classes = useStyles();

  return (
    <div onClick={handleCancel} className={classes.cancelButton}>CANCEL</div>
  );
}

function RecipientOptions({ recipientOptions, handleSelectRecipient }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.stepTitle}>Select recipient:</div>
      <div className={classes.recipientOptions}>
        {recipientOptions.map(({ id, username }) => {
          return (
            <div className={classes.recipientOption} onClick={() => handleSelectRecipient(id)}>{username}</div>
          );
        })}
      </div>
    </React.Fragment>
  )
}

function MessageOptions({ messageOptions, handleSelectMessage }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.stepTitle}>Select your message:</div>
      <div className={classes.messageOptions}>
        {messageOptions.map(option => {
          return (
            <div className={classes.messageOption} onClick={() => handleSelectMessage(option)}>{option}</div>
          );
        })}
      </div>
    </React.Fragment>
  )
}

function TargetOptions({ targetOptions, handleSelectTarget }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.stepTitle}>Select your target:</div>
      <div className={classes.targetOptions}>
        {targetOptions.map(({ id, username }) => {
          return (
            <div className={classes.targetOption} onClick={() => handleSelectTarget(id)}>{username}</div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

function FinalizeMessage({
  players,
  message,
  recipient,
  handleCancel,
  handleConfirm
}) {
  const classes = useStyles();

  const interpolatedMessage = interpolateTargetMacro(players, message);
  const { username } = getPlayer(players, recipient);

  return (
    <div className={classes.finalStep}>
      <div className={classes.finalRecipient}>TO: {username}</div>
      <div className={classes.finalMessage}>MESSAGE: {interpolatedMessage}</div>
      <div>
        <div className={classes.finalConfirm} onClick={() => handleConfirm({ recipient, message: interpolatedMessage })}>SEND</div>
        <div className={classes.finalCancel} onClick={handleCancel}>CANCEL</div>
      </div>
    </div>
  );
}

export default MessageBuilder;