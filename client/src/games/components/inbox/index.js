import React from 'react';
import { createUseStyles } from 'react-jss';
import { getPlayer } from '../../tv/services';
import _ from 'lodash';

const useStyles = createUseStyles(theme => ({
  inboxContainer: {
    position: "absolute",
    bottom: "10%",
    left: "0%",
    width: "15%",
    height: "30%"
  },
  inbox: {
    position: "relative",
    width: "100%",
    padding: "5%",
    height: "100%",
    fontSize: "0.75em",
    backgroundColor: "black",
    overflowY: "scroll"
  },
  roleName: {
    fontWeight: "bold"
  },
  codeword: {
    fontWeight: "bold"
  }
}));

const getTargetText = (players, text, target) => {
  const { username, color } = getPlayer(players, target);
  const split = _.split(text, ' ');
  return _.map(split, item => {
    if (_.includes(item, '%TARGET%')) {
      return <span style={{ color }}>{username} </span>;
    }
    return `${item} `;
  })
}

function Inbox({ players, messages }) {
  const classes = useStyles();

  return (
    <div className={classes.inboxContainer}>
      <div className={classes.inbox}>
        {messages.map(({ sender, text, target }) => {
          const { username, color } = getPlayer(players, sender);
          return (
            <div><span style={{ color }}>{username}</span>: {getTargetText(players, text, target)}</div>
          );
        })}
      </div>
    </div>
  );
}

export default Inbox;