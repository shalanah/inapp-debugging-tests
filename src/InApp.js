import InApp from "detect-inapp";
import Bowser from "bowser";

const getAndroidInApp = () => {
  const inAppRes = new InApp(
    navigator.userAgent || navigator.vendor || window.opera
  );
  const bowserParsed = Bowser.parse(window.navigator.userAgent);
  const androidInApp = inAppRes.isInApp && bowserParsed.os.name === "Android";
  const iOSInApp = inAppRes.isInApp && bowserParsed.os.name === "iOS";
  return {
    inApp: inAppRes.isInApp,
    androidInApp,
    iOSInApp
  };
};

// 1. Need to detect if in app
// 2. Need to serve up options for android + iphone

export const isInApp = () => {
  const inAppRes = new InApp(
    navigator.userAgent || navigator.vendor || window.opera
  );
  const parsedBrowser = Bowser.parse(window.navigator.userAgent);
  console.log(window.navigator.userAgent);
  console.log(parsedBrowser);
  console.log(inAppRes);
  console.log({
    isDesktop: inAppRes.isDesktop,
    isMobile: inAppRes.isMobile,
    isInApp: inAppRes.isInApp,
    browser: inAppRes.browser
  });
  const isAndroidInApp = getAndroidInApp();
  console.log({ isAndroidInApp });
  return true;
};

const inApp = () => {
  isInApp();
  return null;
};

export default inApp;
