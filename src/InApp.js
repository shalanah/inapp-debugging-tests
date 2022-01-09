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
  return {
    isInApp,
    androidInApp: isInApp && bowserParsed.os.name === "Android",
    iOSInApp: isInApp && bowserParsed.os.name === "iOS",
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

const IOSInAppAndDefaultInApp = ({ name, url, email }) => {
  const urlWithoutProtocol = url.split("//")[1];
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
      <h2>Steps to use {url}</h2>
      <ul>
        <ol>Open your favorite browser like Safari</ol>
        <ol>
          Paste in {url} or search for "{name}"
        </ol>
      </ul>
      <p>Contact {email} for support</p>
    </div>
  );
};

const inApp = ({
  url = "https://example.com",
  email = "me@example.com",
  name = "Example",
}) => {
  const { isInApp, androidInApp, iOSInApp } = getInApp();

  useEffect(() => {
    if (androidInApp) {
      // Try redirecting automatically
      window.location = getAndroidRedirectLink(url);
    }
  }, [androidInApp]);

  if (androidInApp) return <AndroidInApp url={url} />;
  if (iOSInApp || isInApp)
    return <IOSInAppAndDefaultInApp email={email} name={name} url={url} />;
  return null;
};

export default inApp;
