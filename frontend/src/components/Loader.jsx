import React from 'react'

function Loader({ borderWidth , size}) {
  return (
    <div 
    className={`${borderWidth} border-orange-500 ${size} rounded-full animate-spin `}
    ></div>
  )
}

export default Loader