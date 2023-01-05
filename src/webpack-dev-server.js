/**
 * webpack-dev-server entry point for debugging.
 * This file is not bundled with the library during the build process.
 */
import { RemoteComponent } from "@paciolan/remote-component";
import React from "react";
import ReactDOM from "react-dom";
import LocalComponent from "./index.js";

import { IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// different paths for localhost vs s3
const url =
  process.env.NODE_ENV === "development" ? "/dist/main.js" : "main.js";

const node = document.getElementById("app");

const Component = props =>
  process.env.NODE_ENV === "development"
    ? <LocalComponent {...props} />
    : <RemoteComponent url={url} {...props} />; // prettier-ignore

setupIonicReact();

const App = () => (
  <IonApp>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Remote Component</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Remote Component</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Component name="Webpack" />
      </IonContent>
    </IonPage>
  </IonApp>
);

ReactDOM.render(<App />, node);
