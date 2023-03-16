import ConfigurationModel from "../../../src/services/configuration/configuration-model";
import { Credentials } from "../../../src/services/iotaboard-client/client-options";
import RemoteDashboardProps from "../../../src/services/remote-dashboard-interop/remote-dashboard-props";

interface DevelopmentEnvModel {
  credentials: Credentials;
  configuration: ConfigurationModel;
  dashboardDetails: RemoteDashboardProps;
}
export const DevelopmentEnv: DevelopmentEnvModel = {
  credentials: {
    username: "username",
    password: "secret--"
  },
  configuration: {
    httpPort: 20080,
    mqttPort: 20883,
    serverHost: "localhost",
    useHttps: false,
    developerMode: true
  },
  dashboardDetails: {
    dashboardId: "dashboard-id"
  }
};

export default DevelopmentEnv;
