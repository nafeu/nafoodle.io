import React, { useState, useEffect } from 'react';
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
  resultsTableContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    fontSize: "0.75em",
    border: "2px solid white",
    display: "flex",
    flexWrap: "wrap"
  },
  resultsTable: {
    width: "100%",
    padding: "20px"
  },
  result: {
    fontSize: "1.4em",
    padding: "5px"
  },
  resultTitle: {
    fontWeight: "bolder"
  },
  resultDesc: {
    fontWeight: "100",
    opacity: "0.5"
  }
}));

const ONE_SECOND = 1000;

function ResultsTable({ results, show }) {
  const classes = useStyles();

  const [displayResults, setDisplayResults] = useState([]);

  const updateResults = index => {
    if (index <= results.length) {
      setTimeout(() => {
        setDisplayResults(_.take(results, index));
        updateResults(index + 1);
      }, ONE_SECOND);
    }
  }

  useEffect(() => {
    if (show) {
      updateResults(0);
    } else {
      setDisplayResults([]);
    }
  }, [show])


  if (!show) {
    return '';
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.resultsTableContainer}>
        <div className={classes.resultsTable}>
          {displayResults.map(result => {
            const { title, desc, icon } = result;
            return (
              <Result title={title} desc={desc} icon={icon} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Result({ title, desc, icon }) {
  const classes = useStyles();

  return (
    <div className={classes.result}>{icon} <span className={classes.resultTitle}>{title}</span> <span className={classes.resultDesc}>{desc}</span></div>
  );
}

export default ResultsTable;