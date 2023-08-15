import React from "react";

const { useState } = React;

interface TrashIconProps {
  width: string;
  height : string;
  color: string;
}

export const TrashIcon: React.FC<TrashIconProps>= (props) => {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      fill={props.color}
      version="1.1"
      viewBox="0 0 485 485"
      xmlSpace="preserve"
    >
      <path d="M67.224 0H417.759V71.81H67.224z"></path>
      <path d="M417.776 92.829H67.237V485h350.537V92.829h.002zM165.402 431.447H137.04V146.383h28.362v285.064zm91.287 0h-28.363V146.383h28.363v285.064zm91.281 0h-28.361V146.383h28.361v285.064z"></path>
    </svg>
  );
}
