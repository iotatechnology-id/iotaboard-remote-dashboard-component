import React, { useMemo } from "react";
import { Title } from "./components/Title";
import type { IotaboardClient } from "../../../src/services/iotaboard-client/iotaboard-client";
import type { IotaboardRealtimeClient } from "../../../src/services/realtime";
import {
  getInterops,
  GlobalWithInterop
} from "../../../src/services/remote-dashboard-interop";

// TODO: define remote component type definition
export interface DashboardProps {
  name: string;
}

export const IotaboardDashboard: React.FC<DashboardProps> = ({
  name = "World"
}) => {
  const iotaboardInterops = useMemo(
    () => getInterops(),
    [(global as GlobalWithInterop).iotaboardInterops]
  );

  return <Title>Hello {name}!</Title>;
};
