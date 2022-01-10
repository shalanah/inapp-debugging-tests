import React, { useEffect } from "react";
import {
  getInApp,
  getAndroidRedirectLink,
  getiOSChromeRedirectLink,
} from "./inAppUtils";
import InAppLanding from "./InAppLanding";

const inApp = ({
  url = "https://spiralbetty.com",
  email = "hi.spiralbetty@gmail.com",
  name = "Spiral Betty",
}) => {
  const { isInApp, androidInApp, iOSInApp } = getInApp();
  const domain = url.split("//")[1];

  // Try auto redirect Android
  useEffect(() => {
    if (androidInApp) {
      window.location.replace(getAndroidRedirectLink(url));
    }
  }, [androidInApp]);

  // Try auto redirect iOS via Chrome
  useEffect(() => {
    if (iOSInApp) window.location = getiOSChromeRedirectLink(url);
  }, [androidInApp]);

  // Android view
  if (androidInApp)
    return (
      <InAppLanding name={name} url={url} email={email}>
        <>
          <p>Click the link below.</p>
          <a
            style={{ margin: "auto" }}
            href={getAndroidRedirectLink(url)}
            target={"_blank"}
          >{`Open Spiral Betty`}</a>
        </>
      </InAppLanding>
    );

  // For iOS and unknown OS
  if (isInApp) {
    return (
      <InAppLanding name={name} url={url} email={email}>
        <>
          <p>How to Open {name}</p>
          <p>
            Open Chrome or Safari fresh on your computer or phone and search for
            "{name}" or go to {domain}.
          </p>
        </>
      </InAppLanding>
    );
  }

  return null;
};

export default inApp;
