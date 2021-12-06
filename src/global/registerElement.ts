import { App } from 'vue'
import { ElButton } from 'element-plus'

const components = [ElButton]

export default function registerElement(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
