import React, { useEffect } from 'react'
import "./onecard.css"
export default function Onecard(props) {
  return (
    <div className="card">
      <div className="card-header">{props.value}</div>
      <div className="card-body">
        <p className="card-text">
          <span className="label">Prize:</span> {props.prize}
        </p>
        <p className="card-text">
          <span className="label">Quantity :</span> {props.milkperday} L
        </p>
        <p className="card-text">
          <span className="label">Total prize:</span> {props.prize * props.milkperday}
        </p>
      </div>
    </div>
  )
}
