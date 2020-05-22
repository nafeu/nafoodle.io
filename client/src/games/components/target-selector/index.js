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
  targetSelectorContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    fontSize: "0.75em",
    border: "2px solid white"
  },
  targetSelector: {
    width: "100%",
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
  finalTarget: {
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

function TargetSelector({
  players,
  onConfirm,
  onCancel,
  show,
  actionDesc,
  actionPrompt,
  action
}) {
  const classes = useStyles();

  const initState = {
    step: 'target',
    target: null
  }

  const [state, setState] = useState(initState);

  if (!show) {
    return '';
  }

  const { step, target } = state;

  const handleSelectTarget = selection => {
    setState({ ...state, target: selection, step: 'finalize' });
  }

  const handleCancel = () => {
    setState(initState);
    onCancel();
  }

  const handleConfirm = ({ target, action }) => {
    setState(initState);
    onConfirm({ target, action });
  }

  let options;

  if (step === 'target') {
    options = <TargetOptions targetOptions={players} handleSelectTarget={handleSelectTarget} actionPrompt={actionPrompt}/>
  } else {
    options = <FinalizeMessage
      players={players}
      target={target}
      handleCancel={handleCancel}
      handleConfirm={handleConfirm}
      actionDesc={actionDesc}
      action={action}
    />
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.targetSelectorContainer}>
        <div className={classes.targetSelector}>
          {options}
          {step !== 'finalize' &&
            (
              <React.Fragment>
                <CancelButton handleCancel={() => { setState(initState); handleCancel(); }} />
              </React.Fragment>
            )
          }
        </div>
      </div>
    </div>
  );
}

function CancelButton({ handleCancel }) {
  const classes = useStyles();

  return (
    <div onClick={handleCancel} className={classes.cancelButton}>CANCEL</div>
  );
}

function TargetOptions({ targetOptions, handleSelectTarget, actionPrompt }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.stepTitle}>{actionPrompt}</div>
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
  target,
  handleCancel,
  handleConfirm,
  action,
  actionDesc
}) {
  const classes = useStyles();

  const { username } = getPlayer(players, target);

  return (
    <div className={classes.finalStep}>
      <div className={classes.finalTarget}>{actionDesc.replace('%TARGET%', username)}.</div>
      <div>
        <div className={classes.finalConfirm} onClick={() => handleConfirm({ target, action })}>CONFIRM</div>
        <div className={classes.finalCancel} onClick={handleCancel}>CANCEL</div>
      </div>
    </div>
  );
}

export default TargetSelector;