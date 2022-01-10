import React from "react";

const InAppDefault = ({ name, url, email }) => {
  const domain = url.split("//")[1];
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        background: "red",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        zIndex: 10000,
      }}
    >
      <h1>Oooops!</h1>
      <p>This browser isn't {name} friendly.</p>
      <h2>Steps to use {domain}</h2>
      <ul>
        <ol>Open your favorite browser like Safari</ol>
        <ol>
          Paste in {domain} or search for "{name}"
        </ol>
      </ul>
      <p>Contact {email} for support</p>
    </div>
  );
};

export default InAppDefault;
