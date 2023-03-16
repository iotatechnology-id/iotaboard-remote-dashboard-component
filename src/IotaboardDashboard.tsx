// React imports
import React, { useMemo } from "react";

// Iotaboard imports
import type { IotaboardClient } from "../../../src/services/iotaboard-client/iotaboard-client";
import type { IotaboardRealtimeClient } from "../../../src/services/realtime";
import {
  getInterops,
  GlobalWithInterop
} from "../../../src/services/remote-dashboard-interop";
import type RemoteDashboardProps from "../../../src/services/remote-dashboard-interop/remote-dashboard-props";

// Style imports
import "./theme/common.css";

// Components imports
import { SampleComponent } from "./components/SampleComponent";

export const IotaboardDashboard: React.FC<RemoteDashboardProps> = props => {
  const interops = useMemo(
    () => getInterops(),
    [(global as GlobalWithInterop).iotaboardInterops]
  );

  return <SampleComponent>Hello Iotaboard!</SampleComponent>;
};
