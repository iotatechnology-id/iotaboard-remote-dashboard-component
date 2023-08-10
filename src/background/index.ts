import type {
  RegisteredInterops,
  RemoteDashboardBackgroundInitFn
} from "../../../../src/services/remote-dashboard-interop";
const backgroundInit: RemoteDashboardBackgroundInitFn = async options => {
  // TODO: Implement background functionality or remove if unecessary
  if (options.dashboardId) {
    const response = await options.interops.defaultIotaboardClient.getDashboard(
      options.dashboardId
    );
    if (response.statusCode == 200) {
      const dashboard = response.data;
      if (!dashboard) {
        return;
      }
      const settings = dashboard.settings;
      // Do something in the background
    }
  }
  if (options.assetId) {
    const response =
      await options.interops.defaultIotaboardClient.getThisUserAssetAccessPermission(
        options.assetId
      );
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
