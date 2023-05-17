import type {
  RegisteredInterops,
  RemoteDashboardBackgroundInitFn
} from "../../../../src/services/remote-dashboard-interop";
import { DashboardSettings } from "../components/AirMoistureConfiguration";
const backgroundInit: RemoteDashboardBackgroundInitFn = async (
  dashboardId: string,
  interops: RegisteredInterops
) => {
  const response = await interops.defaultIotaboardClient.getDashboard(dashboardId);
  if (response.statusCode == 200) {
    const dashboard = response.data;
    if (!dashboard) {
      return;
    }
    const settings = dashboard.settings as DashboardSettings;
    const deviceIds = settings.deviceIds;
    interops.defaultIotaboardRealtimeClient.addDevicesEventListener("new-telemetry", async r => {
      if (deviceIds?.some(deviceId => deviceId == r.deviceId)) {
        const temperatureRecord = r.records.find(record => record.key == "temperature");
        if (temperatureRecord && temperatureRecord.value >= 31) {
          interops.defaultNotificationCenter.newNotificationEntry({
            title: dashboard.dashboardName,
            body: `Air temperature is above threshold: ${(temperatureRecord.value as number).toFixed(2)}°C.`,
            extra: {
              navigateTo: `/dashboards/${dashboard.dashboardTemplateId}/${dashboardId}`,
              ts: new Date().getTime()
            }
          })
        }
      }
    })
  }
};

export default backgroundInit;
