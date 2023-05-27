import type {
  RegisteredInterops,
  RemoteDashboardBackgroundInitFn
} from "../../../../src/services/remote-dashboard-interop";
const backgroundInit: RemoteDashboardBackgroundInitFn = async (
  interops: RegisteredInterops,
  dashboardId?: string,
  assetId?: string
) => {
  // TODO: Implement background functionality or remove if unecessary
  if (dashboardId) {
    const response = await interops.defaultIotaboardClient.getDashboard(dashboardId);
    if (response.statusCode == 200) {
      const dashboard = response.data;
      if (!dashboard) {
        return;
      }
      const settings = dashboard.settings;
      // Do something in the background
    }
  }
  if (assetId) {
    const response = await interops.defaultIotaboardClient.getThisUserAssetAccessPermission(assetId);
    if (response.statusCode == 200) {
      const permission = response.data;
      if (!permission) {
        return;
      }
      
      // Do something in the background
      // consume permission
    }
  }
};

export default backgroundInit;
