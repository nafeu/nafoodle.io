import React, { useState } from 'react';
import _ from 'lodash';

import Hand from '../home/game/components/hand';
import Board from '../home/game/components/board';

function Sandbox() {
  const [handA, setHandA] = useState(3);
  const [handB, setHandB] = useState(3);
  const [handC, setHandC] = useState(3);
  const [handD, setHandD] = useState(3);

  const handASet = _.map(_.range(handA), i => 1);
  const handBSet = _.map(_.range(handB), i => 1);
  const handCSet = _.map(_.range(handC), i => 1);
  const handDSet = _.map(_.range(handD), i => 1);

  return (
    <React.Fragment>
      <Board>
        <button onClick={() => setHandA(handA + 1)}>Hand A</button>
        <button onClick={() => setHandB(handB + 1)}>Hand B</button>
        <button onClick={() => setHandC(handC + 1)}>Hand C</button>
        <button onClick={() => setHandD(handD + 1)}>Hand D</button>
        <Hand
          hand={handASet}
        />
        <Hand
          hand={handBSet}
          position={'left'}
          hidden={true}
        />
        <Hand
          hand={handCSet}
          position={'right'}
          hidden={true}
        />
        <Hand
          hand={handDSet}
          position={'top'}
          hidden={true}
        />
      </Board>
    </React.Fragment>
  );
}

export default Sandbox;