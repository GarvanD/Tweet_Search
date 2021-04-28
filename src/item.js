import React from "react";

const Item = (props) => {
  return (
    <div className="item">
      <div className="name">
        <p>{props.tweet}</p>
      </div>
    </div>
  );
};

export default Item;
