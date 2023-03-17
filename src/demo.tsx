/**
 * webpack-dev-server entry point for debugging.
 * This file is not bundled with the library during the build process.
 * Iotaboard-like environment for dashboard development
 */
import { RemoteComponent } from "@paciolan/remote-component";
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import LocalComponent from "./index";

/**
 * This is designed for use with Ionic project.
 * It imports Ionic modules and styles to simulate more accurate look in Ionic apps
 */

import {
  IonApp,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// Iotaboard specifics
import { defaultIotaboardClient } from "../../../src/services/iotaboard-client";
import { defaultIotaboardRealtimeClient } from "../../../src/services/realtime";
import {
  loadConfiguration,
  saveConfiguration
} from "../../../src/services/configuration";
import DevelopmentEnv from "./development-env-setup";
import { registerInterops } from "../../../src/services/remote-dashboard-interop";
import RemoteDashboardProps from "../../../src/services/remote-dashboard-interop/remote-dashboard-props";

// Minimal Iotaboard-like initialization
// Customize initiation if necessary.
defaultIotaboardClient
  .initializeWithCredentials(
    DevelopmentEnv.credentials,
    DevelopmentEnv.configuration
  )
  .then(result => {
    if (result.statusCode == 200) {
      DevelopmentEnv.configuration.tokenCache = defaultIotaboardClient.token;
      defaultIotaboardRealtimeClient.initialize(DevelopmentEnv.configuration);

      registerInterops({
        defaultIotaboardClient: defaultIotaboardClient,
        defaultIotaboardRealtimeClient: defaultIotaboardRealtimeClient,
        configurationLoader: loadConfiguration,
        configurationSaver: saveConfiguration
      });

      // different paths for localhost vs s3
      const url =
        process.env.NODE_ENV === "development" ? "/dist/main.js" : "main.js";

      const rootNode = document.getElementById("app");
      const root = createRoot(rootNode!);

      // TODO: specify props type definition for type safety
      const Component = (props: RemoteDashboardProps) =>
        process.env.NODE_ENV === "development" ? (
          <LocalComponent {...props} />
        ) : (
          <RemoteComponent url={url} {...props} />
        );

      setupIonicReact();

      const App = () => (
        <IonApp>
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Iotaboard Remote Dashboard</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
              <IonHeader collapse="condense">
                <IonToolbar>
                  <IonTitle size="large">Iotaboard Remote Dashboard</IonTitle>
                </IonToolbar>
              </IonHeader>
              <Component {...DevelopmentEnv.dashboardDetails} />
            </IonContent>
          </IonPage>
        </IonApp>
      );

      root.render(<App />);
    } else {
      throw new Error(
        "Iotaboard client initialization failed. Please check development-env-setup.ts."
      );
    }
  })
  .catch(e => {
    console.error(e);
  });
