import React from 'react';
import { map, weightedAverage } from '../../../../../utils/helpers';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  card: {
    width: "75px",
    backgroundColor: "white",
    textAlign: "center",
    height: "125px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    fontWeight: "bolder",
    fontSize: "0.75em",
    border: "2px solid black",
    transition: "250ms ease-out all",
    position: "relative"
  },
  cardContent: {
    paddingBottom: "20px"
  }
}));

const getCardStylingRules = (count) => {
  const multiplier = count - 1;

  const output = {
    zRotationMax: 0,
    yTranslationMax: 0,
    xTranslationMax: 0,
    translationReduction: 1
  }

  if (count < 2) {
    return output;
  }

  if (count > 5) {
    return {
      ...output,
      xTranslationMax: multiplier * 10,
    }
  }

  return {
    zRotationMax: multiplier * 1 + (2.5),
    yTranslationMax: multiplier * 3 + (5),
    xTranslationMax: multiplier * 5 + (5),
    translationReduction: multiplier * 0.025 + 0.6
  }
}

function Card({ card, index, count }) {
  const classes = useStyles();

  const {
    zRotationMax,
    yTranslationMax,
    xTranslationMax,
    translationReduction,
  } = getCardStylingRules(count);

  const getZRotation = (index, count) => {
    const multiplier = map(index, 0, count - 1, -1, 1);
    let deg = multiplier * zRotationMax;

    if (count % 2 !== 0 && index === (Math.round((count - 1) / 2))) {
      deg = 0;
    }

    return `rotateZ(${deg}deg)`;
  }

  const getYTranslation = (index, count) => {
    const multiplier = weightedAverage(1 - Math.abs(map(index, 0, count - 1, -1, 1)), 1, 10);
    let distance = (multiplier * yTranslationMax * -1);

    if (count % 2 !== 0) {
      if (index === (Math.round((count - 1) / 2))) {
        distance = distance * translationReduction;
      }
    } else {
      if (index === ((count / 2) - 1) || index === (count / 2)) {
        distance = distance * translationReduction;
      }
    }

    return `translateY(${distance}px)`;
  }

  const getXTranslation = (index, count) => {
    const multiplier = map(index, 0, count - 1, -1, 1);
    const distance = (multiplier * xTranslationMax * -1);
    return `translateX(${distance}px)`;
  }

  const transform = count > 1 && `${getXTranslation(index, count)} ${getZRotation(index, count)} ${getYTranslation(index, count)}`;

  return (
    <div className={classes.card} style={{ transform }}>
      <div className={classes.cardContent}>{card.name}</div>
    </div>
  );
}

export default Card;