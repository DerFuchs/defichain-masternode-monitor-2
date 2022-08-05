import { boot } from 'quasar/wrappers'
import { DateTime } from 'luxon';

export default boot(({ app }) => {
  app.config.globalProperties.$dateTime = DateTime
})

export { DateTime }
