import React, { useEffect } from "react";
import { getInApp, getAndroidRedirectLink } from "./inAppUtils";

// 1. Need to detect if in app
// 2. Need to serve up options for android + iphone

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
        href={getAndroidRedirectLink(url)}
        target={"_blank"}
      >{`Open Browser`}</a>
      <a
        style={{ margin: "auto" }}
        href={url}
        target={"_blank"}
      >{`Open Browser 2`}</a>
      <a style={{ margin: "auto" }} href={url} target={"_blank"}>{`Example`}</a>
      <a style={{ margin: "auto" }} href={url}>{`Example 2`}</a>
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
  url = "http://example.com",
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
