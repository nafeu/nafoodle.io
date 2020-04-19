import React from 'react';

function PlayArea({
  joinedRoom
}) {
  return (
    <div>
      {JSON.stringify(joinedRoom)}
    </div>
  )
}

export default PlayArea;
