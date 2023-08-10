import axios from "axios";
import { execSync } from "child_process";
import { fileFromPath } from "formdata-node/file-from-path";
import { existsSync, writeFileSync } from "fs";
import zipper from "zip-local";

/**
 * @typedef {Object} DeploySettings
 * @property {string} baseUrl
 * @property {string} dashboardTemplateId
 * @property {string} dashboardTemplateName
 * @property {?(1 | 2)} type
 * @property {?boolean} browsable
 * @property {string} adminUsername
 * @property {string} adminPassword
 * @property {?string[]} tags
 */

const deploySettingsExists = existsSync("deploy-settings.json");
console.warn("deploy-settings.json exists:", deploySettingsExists);

/**@type {"new" | "patch"} */
const mode = process.argv[2] == "new" ? "new" : "patch";
console.warn("Mode set to", mode);

if (!deploySettingsExists) {
  /**
   * @type DeploySettings
   */
  const deploySettingsSample = {
    baseUrl: "http://localhost:20080",
    dashboardTemplateId: "dashboard-id",
    dashboardTemplateName: "Dashboard Name",
    browsable: true,
    type: 1,
    adminUsername: "admin-username",
    adminPassword: "admin-password",
    tags: ["tag1", "tag2"]
  };

  const sampleJson = JSON.stringify(deploySettingsSample, undefined, 2);
  writeFileSync("deploy-settings.json", sampleJson, {
    encoding: "utf8"
  });

  console.info(
    "Sample deploy settings written to deploy-settings.json. Please edit deploy-settings to configure deployment."
  );
  process.exit();
}

const { default: deploySettings } = await import("./deploy-settings.json", {
  assert: { type: "json" }
});

console.info("Building output");
execSync("npm run build", {
  stdio: "inherit"
});

console.info("Zipping files");
zipper.sync.zip("./dist/main.js").compress().save("./dist/main.zip");

console.info("Reading file");
const file = await fileFromPath("./dist/main.zip", {
  type: "application/x-zip-compressed"
});

const axiosInstance = axios.create({
  baseURL: deploySettings.baseUrl
});

console.info("Getting Iotaboard token");
const response = await axiosInstance.post(
  "api/user/auth",
  {
    usernameOrEmail: deploySettings.adminUsername,
    password: deploySettings.adminPassword
  },
  {
    validateStatus: () => true
  }
);

if (response.status !== 200 || !response.data?.token) {
  console.error("Authorization failed");
  console.error(response.data);
  process.exit(1);
}

const token = response.data.token;

axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

console.info("Uploading");
if (mode == "new") {
  const postFormData = new FormData();
  postFormData.append("DashboardTemplateName", deploySettings.dashboardTemplateName);
  postFormData.append("Browsable", deploySettings.browsable);
  postFormData.append("Type", deploySettings.type);
  postFormData.append("Tags", deploySettings.tags);
  postFormData.append("ZipFile", file);

  const postResponse = await axiosInstance.postForm(
    `api/dashboard-templates`,
    postFormData
  );

  if (postResponse.status !== 200) {
    console.error("Failed registering dashboard template");
    console.error(postResponse.data);
    process.exit(2);
  }
} else {
  const patchFormData = new FormData();
  patchFormData.append("Browsable", deploySettings.browsable);
  patchFormData.append("DashboardTemplateName", deploySettings.dashboardTemplateName);
  patchFormData.append("Type", deploySettings.type);
  patchFormData.append("ZipFile", file);


  const patchResponse = await axiosInstance.patchForm(
    `api/dashboard-templates/${deploySettings.dashboardTemplateId}/update`,
    patchFormData
  );

  if (patchResponse.status !== 200) {
    console.error("Failed patching dashboard template");
    console.error(patchResponse.data);
    process.exit(2);
  }
}

console.info("Success");
