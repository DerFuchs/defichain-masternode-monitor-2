import { reactive, watch, unref } from 'vue'

import { useUserStore } from "stores/user";

export function useDashboardCardSettings(componentName, defaults) {

  const user = useUserStore();

  const settings = reactive({
    ...(unref(defaults) ?? {}),
		...(user.settings?.dashboard[unref(componentName)] ?? {}),
	});

  watch(settings, (newSettings) => {
		user.settings.dashboard[unref(componentName)] = newSettings;
	});

  return settings
}
