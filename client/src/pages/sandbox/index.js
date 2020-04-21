import React, { useState } from 'react';
import './index.css';
import _ from 'lodash';

const deck = [
  {
    id: 0,
    name: "ROCK"
  },
  {
    id: 1,
    name: "PAPER"
  },
  {
    id: 2,
    name: "SCISSORS"
  }
];

const getCard = (cardId) => {
  return _.find(deck, card => card.id === cardId);
}

function Sandbox() {
  const [handCount, setHandCount] = useState(1);

  const hand = _.map(_.range(handCount), iteration => 1);

  return (
    <div className="sandbox-container">
      <div className="sandbox">
        <Hand hand={hand}/>
        <button onClick={() => setHandCount(handCount + 1)}>DRAW</button>
        <button onClick={() => setHandCount(handCount > 1 ? handCount - 1 : 0)}>DROP</button>
      </div>
    </div>
  );
}

function Hand({ hand }) {
  return (
    <div className="hand-container">
      <div className="hand">
        <div className="card-container">
          {_.map(hand, (card, index) => {
            return (
              <Card
                key={`${index}-${card}`}
                card={getCard(card)}
                index={index}
                count={hand.length}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

const getCardStylingRules = (count) => {
  const multiplier = count - 1;

  if (count <= 1) {
    return {
      zRotationMax: 0,
      yTranslationMax: 0,
      xTranslationMax: 0,
      interpolationWeight: 1,
      interpolationSize: 10,
      translationReduction: 1
    }
  }

  if (count > 5) {
    return {
      zRotationMax: 0,
      yTranslationMax: 0,
      xTranslationMax: multiplier * 10,
      interpolationWeight: 1,
      interpolationSize: 10,
      translationReduction: 1
    }
  }

  return {
    zRotationMax: multiplier * 1 + (2.5),
    yTranslationMax: multiplier * 3 + (5),
    xTranslationMax: multiplier * 5 + (5),
    interpolationWeight: 1,
    interpolationSize: 10,
    translationReduction: multiplier * 0.025 + 0.6
  }

}

function weightedAverage(x, w, N) {
  return ((x * (N - 1)) + w) / N;
}

function map(value, origMin, origMax, mappedMin, mappedMax) {
  return mappedMin + (mappedMax - mappedMin) * (value - origMin) / (origMax - origMin);
}

function Card({ card, index, count }) {
  const {
    zRotationMax,
    yTranslationMax,
    xTranslationMax,
    interpolationWeight,
    interpolationSize ,
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
    const multiplier = weightedAverage(1 - Math.abs(map(index, 0, count - 1, -1, 1)), interpolationWeight, interpolationSize);
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

  const transform = `${getXTranslation(index, count)} ${getZRotation(index, count)} ${getYTranslation(index, count)}`;

  return (
    <div className="card" style={{ transform }}>
      <div className="card-content">{card.name}</div>
    </div>
  );
}

export default Sandbox;