import { App } from 'vue'

import registerElement from './registerElement'
import registerProps from './registerProps'

export default function registerApp(app: App): void {
  // registerElement(app)
  registerProps(app)
}
