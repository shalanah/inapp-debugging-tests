import React, { useEffect, useState } from "react";
import { getAndroidRedirectLink } from "./inAppUtils";
import styled from "styled-components";

const InAppAndroid = ({ url }) => {
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
        <a
          style={{ margin: "auto" }}
          href={getAndroidRedirectLink(url)}
          target={"_blank"}
        >{`Open Browser`}</a>
      )}
    </div>
  );
};

export default InAppAndroid;
