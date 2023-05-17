import type {
  RegisteredInterops,
  RemoteDashboardBackgroundInitFn
} from "../../../../src/services/remote-dashboard-interop";
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
    const settings = dashboard.settings;
    // Do something in the background
  }
};

export default backgroundInit;
