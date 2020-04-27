import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '../../../../components/button';

import { createUseStyles, useTheme } from 'react-jss';
import { useSpring, animated, config, useTransition } from 'react-spring';

const useStyles = createUseStyles(theme => ({
  waitingArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    textAlign: "center",
  },
  container: {
    marginTop: "10%",
    position: "relative"
  },
  title: {
    fontWeight: "100",
    fontSize: "4em",
    padding: theme.spacing.default,
    color: theme.colorTitle
  },
  input: {
    padding: theme.spacing.default,
    display: "inline-block",
    borderRadius: "10px",
    borderStyle: "solid",
    backgroundColor: theme.colorBackground,
    color: theme.colorPrimary,
    width: "225px",
    margin: "10px",
    fontSize: "1.5em",
    fontWeight: "100",
    cursor: "pointer",
  },
  button: {
    padding: theme.spacing.default,
    display: "inline-block",
    borderRadius: "10px",
    borderStyle: "solid",
    backgroundColor: theme.colorBackground,
    color: "white",
    width: "225px",
    margin: theme.spacing.default,
    fontSize: "1.5em",
    fontWeight: "100",
    cursor: "pointer",
  },
  leave: {
    border: `2px solid ${theme.colorA}`,
    color: theme.colorA
  },
  start: {
    border: `2px solid ${theme.colorD}`,
    color: theme.colorD
  },
  invite: {
    fontWeight: "bold",
    border: `2px solid ${theme.colorSecondary}`,
    padding: theme.spacing.default,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colorSecondary,
    margin: theme.spacing.default,
    cursor: "pointer"
  },
  user: {
    padding: theme.spacing.cozy,
    fontSize: "1.3em",
    textAlign: "left"
  },
  userList: {
    padding: theme.spacing.default,
    backgroundColor: theme.colorDark,
    borderRadius: theme.borderRadius,
    width: "30%",
    transition: "500ms ease-in-out height",
    '@media screen and (max-width: 1400px)': {
      width: "50%"
    },
    '@media screen and (max-width: 900px)': {
      width: "90%"
    }
  },
  header: {
    textAlign: "left",
    fontWeight: "100"
  },
  userArea: {
    padding: theme.spacing.default
  },
  you: {
    fontSize: "1.5em",
    color: theme.colorTitle,
  },
  host: {
    fontSize: "0.75em",
    fontWeight: "100"
  }
}));

function WaitingArea({
  joinedRoom,
  leaveRoom,
  clientId,
  startGame,
  ...props
}) {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });

  const containerAnimations = useSpring({
    opacity: 1,
    bottom: 0,
    from: {
      opacity: 0,
      bottom: -300
    },
    config: config.gentle
  });

  return (
    <animated.div
      style={containerAnimations}
      className={classes.container}
    >
      <div className={classes.waitingArea}>
        <InviteLink
          roomId={joinedRoom.id}
        />
        <UserList
          users={joinedRoom.users}
          clientId={clientId}
        />
        <div>
          <Button
            className={`${classes.button} ${classes.start}`}
            onClick={startGame}
            label={"Start Game"}
          />
          <Button
            className={`${classes.button} ${classes.leave}`}
            onClick={leaveRoom}
            label={"Leave Room"}
          />
        </div>
      </div>
    </animated.div>
  );
}

const UserList = ({ users, clientId }) => {
  const classes = useStyles();
  const [items, setItems] = useState(users);

  useEffect(() => {
    setItems(users)
  }, [users])

  const transitions = useTransition(items, item => item.id, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  return (
    <div className={classes.userList}>
      <div className={classes.header}>Lobby</div>
      <div className={classes.userArea}>
        {transitions.map(({ item: user, props, key }) => {
          const isHost = user.host;
          const isYou = user.id === clientId;

          return (
            <animated.div key={key} style={props} className={isYou ? `${classes.user} ${classes.you}` : classes.user}>
              {user.username}
              {isHost && <span className={classes.host}> is the host.</span>}
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}

const InviteLink = ({ roomId }) => {
  const classes = useStyles();

  const joinableLink = `${window.location.host}/?room=${roomId}`;
  const [copied, setCopied] = useState(false);

  return (
    <div className={classes.invite}>
      <CopyToClipboard text={joinableLink}
        onCopy={() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 500);
        }}>
        <span>{copied ? 'Copied to clipboard!' : `Invite Your Friends: ${joinableLink}`}</span>
      </CopyToClipboard>
    </div>
  );
}

export default WaitingArea;