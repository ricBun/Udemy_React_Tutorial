import React from 'react';

const charComponent = (props) => {
  const inlineStyle = {
    display:'inline-block',
    padding:'16px',
    textAlign:'center',
    margin:'16px',
    border:'1px solid black'
  }

  return (
    <div style={inlineStyle}
      onClick={props.clickFunction}

      >{props.character}
    </div>
  )
}

export default charComponent;
