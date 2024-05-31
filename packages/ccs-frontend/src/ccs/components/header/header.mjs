class Header {
  static moduleName = 'ccs-header'

  constructor () {
    this.$menuButton = $('.ccs-js-header-toggle')
    this.$menu = $(`#${this.$menuButton.attr('aria-controls')}`)
  }

  init () {
    this.syncState(this.$menu.hasClass('ccs-header__navigation-lists--open'))
    this.setEventListeners()
  }

  syncState (isVisible) {
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
