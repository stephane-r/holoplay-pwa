// @ts-ignore
import { UAParser } from "ua-parser-js";

const uaParser = new UAParser();
uaParser.setUA(window.navigator.userAgent);

export const userAgent = {
  os: uaParser.getOS(),
  browser: uaParser.getBrowser(),
  cpu: uaParser.getCPU(),
  device: uaParser.getDevice(),
  engine: uaParser.getEngine(),
};
