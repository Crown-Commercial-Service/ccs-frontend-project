import { CCSFrontendComponent } from '../../ccs-frontend-component'

class Header implements CCSFrontendComponent {
  static moduleName = 'ccs-header'
  $menuButton: JQuery<HTMLButtonElement>
  $menu: JQuery<HTMLElement>

  constructor ($header: JQuery<HTMLElement>) {
    this.$menuButton = $header.find<HTMLButtonElement>('.ccs-js-header-toggle')
    this.$menu = $header.find<HTMLElement>(`#${this.$menuButton.attr('aria-controls')}`)
  }

  init () {
    this.syncState(this.$menu.hasClass('ccs-header__navigation-lists--open'))
    this.setEventListeners()
    this.$menuButton.removeAttr('hidden')
  }

  syncState (isVisible: boolean) {
    this.$menuButton.toggleClass('ccs-header__menu-button--open', isVisible)
    this.$menuButton.attr('aria-expanded', String(isVisible))
  }

  setEventListeners () {
    this.$menuButton.on('click', () => {
      this.$menu.toggleClass('ccs-header__navigation-lists--open')

      this.syncState(this.$menu.hasClass('ccs-header__navigation-lists--open'))
    })
  }
}

export { Header }
