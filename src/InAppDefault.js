import React, { useEffect, useState } from "react";

const InAppDefault = ({ name, url, email }) => {
  const [waitForRedirect, setWaitForRedirect] = useState(true);
  useEffect(() => {
    setTimeout(() => setWaitForRedirect(false), 300);
  }, []);
  const domain = url.split("//")[1];
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        background: "#fff",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        zIndex: 10000,
      }}
    >
      {!waitForRedirect && (
        <div
          style={{
            height: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div />
          <div style={{ flex: 1, display: "flex" }}>
            <div style={{ margin: "auto" }}>
              <h1>Oooops!</h1>
              <p>
                This browser isn't <strong>{name}</strong> friendly.
              </p>
              <h2>Steps to use {domain}</h2>
              <ul>
                <ol>Open your favorite browser like Safari</ol>
                <ol>
                  Paste in {domain} or search for "{name}"
                </ol>
              </ul>
            </div>
          </div>
          <p>Contact {email} for questions or support</p>
        </div>
      )}
    </div>
  );
};

export default InAppDefault;
