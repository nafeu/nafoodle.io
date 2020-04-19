import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import { createUseStyles, useTheme } from 'react-jss';
import { Button } from '../../../components/button';

const useStyles = createUseStyles(theme => ({
  lobby: {
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
  username: {
    border: `2px solid ${theme.colorA}`,
    '&::placeholder': {
      color: theme.colorA
    }
  },
  room: {
    border: `2px solid ${theme.colorB}`,
    '&::placeholder': {
      color: theme.colorB
    }
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
  join: {
    border: `2px solid ${theme.colorC}`,
    color: theme.colorC
  },
  create: {
    border: `2px solid ${theme.colorD}`,
    color: theme.colorD
  }
}));

const Lobby = ({
  username,
  roomId,
  changeUsername,
  changeRoomId,
  joinRoom,
  createRoom,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });

  const containerAnimations = useSpring({
    opacity: 1,
    top: 0,
    from: {
      opacity: 0,
      top: -300
    },
    config: config.gentle
  });

  return (
    <animated.div
      style={containerAnimations}
      className={classes.container}
    >
      <div className={classes.lobby}>
        <div className={classes.title}>nafoodle games</div>
        <div>
          <input
            className={`${classes.input} ${classes.username}`}
            placeholder="enter username"
            type="text"
            value={username}
            onChange={changeUsername}
          />
          <input
            className={`${classes.input} ${classes.room}`}
            placeholder="enter room id"
            type="text"
            value={roomId}
            onChange={changeRoomId}
          />
          <br/>
          <Button
            className={`${classes.button} ${classes.create}`}
            onClick={createRoom}
            label={"Create Room"}
          />
          <Button
            className={`${classes.button} ${classes.join}`}
            onClick={joinRoom}
            label={"Join Room"}
          />
        </div>
      </div>
    </animated.div>
  );
}

export default Lobby;
