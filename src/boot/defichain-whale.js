import {
  boot
} from "quasar/wrappers";
import {
  WhaleApiClient
} from "@defichain/whale-api-client";

const defichain = new WhaleApiClient({
  url: process.env.OCEAN_URL,
  timeout: process.env.OCEAN_TIMEOUT,
  version: process.env.OCEAN_VERSION,
  network: process.env.OCEAN_NETWORK,
});

export default boot(({
  app
}) => {
  app.config.globalProperties.$defichain = defichain
});

export {
  defichain
};
