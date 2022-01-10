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
  const { isInApp, androidInApp, iOSInApp, platform } = getInApp();
  const domain = url.split("//")[1];

  // Try auto redirect Android
  useEffect(() => {
    if (androidInApp) {
      window.location.replace(getAndroidRedirectLink(url));
    }
  }, [androidInApp]);

  // Try auto redirect iOS via Chrome
  // Don't want to because it will spam browser if it does not exist
  // useEffect(() => {
  //   if (iOSInApp) window.location = getiOSChromeRedirectLink(url);
  // }, [androidInApp]);

  // Android view
  if (androidInApp)
    return (
      <InAppLanding name={name} url={url} email={email} addDelay>
        <>
          <p>
            {" "}
            For a better experience
            <br />
            Click the link below.
          </p>
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
        <p style={{ maxWidth: "34ch" }}>
          For a better experience
          <br />
          Open a new Safari or Chrome window and go to {domain}
        </p>
        {/* Padding */}
        <div style={{ height: 20 }} />
      </InAppLanding>
    );
  }

  return null;
};

export default inApp;
