import ConfigurationModel from "../../../src/services/configuration/configuration-model";
import { Credentials } from "../../../src/services/iotaboard-client/client-options";

interface DevelopmentEnvModel {
    credentials: Credentials,
    configuration: ConfigurationModel
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
    }
}

export default DevelopmentEnv;