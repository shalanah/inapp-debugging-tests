import React, { useEffect } from "react";
import {
  getInApp,
  getAndroidRedirectLink,
  getiOSChromeRedirectLink,
} from "./inAppUtils";
import InAppAndroid from "./InAppAndroid";
import InAppDefault from "./InAppDefault";

const inApp = ({
  url = "https://spiralbetty.com",
  email = "hi.spiralbetty@gmail.com",
  name = "Spiral Betty",
}) => {
  const { isInApp, androidInApp, iOSInApp } = getInApp();

  // Try auto redirect Android
  useEffect(() => {
    if (androidInApp) {
      window.location = getAndroidRedirectLink(url);
    }
  }, [androidInApp]);

  // Try auto redirect iOS via Chrome
  useEffect(() => {
    if (iOSInApp) window.location = getiOSChromeRedirectLink(url);
  }, [androidInApp]);

  return <InAppAndroid url={url} />;

  if (androidInApp) return <InAppAndroid url={url} />;
  if (isInApp) {
    // For iOS and unknown OS
    return <InAppDefault email={email} name={name} url={url} />;
  }

  return null;
};

export default inApp;
