'use client';
import { useState } from "react";

const Shortcut = () => {
  const [short, setShort] = useState('');

  const handleSubmit = (e) => {
    console.log(short);
    e.preventDefault();
  };

  return (
    <>
      <form className="short-form" onSubmit={handleSubmit}>
      <input
          type="text"
          className="shortbar"
          onChange={text => setShort(text.target.value)}
        />
        <button type="ss" className="short-btn">Transmission Drawings by Pole Stencil</button>
        <button type="ss" className="short-btn">Transmission Drawings by Line Number</button>
        <button type="ss" className="short-btn">Transmission Poles by Line Number</button>
        <button type="ss" className="short-btn">Transmission Poles by Drawing Number</button>
      </form>
    </>
  )
}

export default Shortcut;