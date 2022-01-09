import InApp, { useEffect } from "detect-inapp";
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
  console.log(parsedBrowser);
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

const AndroidInApp = () => {
  return (
    <div
      style={{
        display: "fixed",
        background: "green",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        zIndex: 10000,
      }}
    ></div>
  );
};

const IOSInAppAndDefaultInApp = () => {
  return (
    <div
      style={{
        display: "fixed",
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

const androidOpenInBrowserLink = (url) => {
  return `intent:${url}#Intent;end`;
};

const inApp = ({ url = "https://example.com" }) => {
  const { isInApp, androidInApp, iOSInApp } = getInApp();
  useEffect(() => {
    if (androidInApp) {
      // Try redirecting automatically
      window.location = `intent:${androidOpenInBrowserLink(url)}#Intent;end`;
    }
  }, [androidInApp]);

  if (androidInApp) return <AndroidInApp />;
  if (iOSInApp || isInApp) return <IOSInAppAndDefaultInApp />;
  return null;
};

export default inApp;
