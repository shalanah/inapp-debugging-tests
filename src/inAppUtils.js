import InApp from "detect-inapp";
import Bowser from "bowser";

export const getInApp = () => {
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

export const getAndroidRedirectLink = (url) => {
  return `intent:${url}#Intent;end`;
};
