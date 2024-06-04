import { render } from '@ccs-frontend/lib/components'

/**
 * Component HTML code (formatted)
 */
export function getHTMLCode(componentName, options) {
  return render(componentName, { ...options, env: this.env })
}
