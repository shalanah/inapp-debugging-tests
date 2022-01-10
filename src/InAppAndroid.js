import React, { useEffect, useState } from "react";
import { getAndroidRedirectLink } from "./inAppUtils";

const InAppAndroid = ({ url, name, email }) => {
  const [waitForRedirect, setWaitForRedirect] = useState(true);
  useEffect(() => {
    setTimeout(() => setWaitForRedirect(false), 300);
  }, []);
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
              <p>
                This browser isn't <strong>{name}</strong> friendly.
              </p>
              <p>Click the link below to open in a better browser.</p>
              <a
                style={{ margin: "auto" }}
                href={getAndroidRedirectLink(url)}
                target={"_blank"}
              >{`Open Spiral Betty`}</a>
            </div>
          </div>
          <p>Contact {email} for questions or support</p>
        </div>
      )}
    </div>
  );
};

export default InAppAndroid;
