import React, { useEffect } from "react";
import InApp from "detect-inapp";
import Bowser from "bowser";

const getInApp = () => {
  const inAppRes = new InApp(
    navigator.userAgent || navigator.vendor || window.opera
  );
  const bowserParsed = Bowser.parse(window.navigator.userAgent);
  const isInApp = inAppRes.isInApp;

  // For debugging
  // if (isInApp || bowserParsed.platform.type !== "desktop") {
  console.log(window.navigator.userAgent);
  console.log(bowserParsed);
  console.log(inAppRes);
  // }

  const androidInApp = inAppRes.isInApp && bowserParsed.os.name === "Android";
  const iOSInApp = inAppRes.isInApp && bowserParsed.os.name === "iOS";
  return {
    isInApp: inAppRes.isInApp,
    androidInApp,
    iOSInApp,
  };
};

// 1. Need to detect if in app
// 2. Need to serve up options for android + iphone

const getAndroidRedirectLink = (url) => {
  return `intent:${url}#Intent;end`;
};

const AndroidInApp = (url) => {
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        background: "green",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        zIndex: 10000,
      }}
    >
      <a
        style={{ margin: "auto" }}
        href={url}
        target={"_blank"}
      >{`Open Browser`}</a>
    </div>
  );
};

const IOSInAppAndDefaultInApp = () => {
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
    ></div>
  );
};

const inApp = ({ url = "https://example.com" }) => {
  const { isInApp, androidInApp, iOSInApp } = getInApp();

  useEffect(() => {
    if (androidInApp) {
      // Try redirecting automatically
      const androidRedirectLink = getAndroidRedirectLink(url);
      window.location = `intent:${androidRedirectLink}#Intent;end`;
    }
  }, [androidInApp]);

  if (androidInApp) return <AndroidInApp url={url} />;
  if (iOSInApp || isInApp) return <IOSInAppAndDefaultInApp />;
  return null;
};

export default inApp;
