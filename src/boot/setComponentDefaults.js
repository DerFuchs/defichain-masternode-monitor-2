/**
 * https://github.com/quasarframework/quasar/discussions/8761
 */

const setDefault = (component, key, value) => {
  const prop = component.props[key];
  switch (typeof prop) {
    case "object":
      prop.default = value;
      break;
    case "function":
      component.props[key] = {
        type: prop,
        default: value
      };
      break;
    case "undefined":
      throw new Error("unknown prop: " + key);
      break;
    default:
      throw new Error("unhandled type: " + typeof prop);
      break;
  }
};

import { QBtn } from "quasar";

setDefault(QBtn, "unelevated", true);
setDefault(QBtn, "rounded", true);
setDefault(QBtn, "color", 'primary');


import { QCard } from "quasar";

setDefault(QCard, "flat", true);
//setDefault(QCard, "bordered", true);


import { QInput } from "quasar";

setDefault(QInput, "outlined", true);
