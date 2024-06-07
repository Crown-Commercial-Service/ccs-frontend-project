const { render } = require('@ccs-frontend/helpers/nunjucks')
const { getExamples } = require('@ccs-frontend/lib/components')

describe('Header', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('header')
  })

  describe('custom options', () => {
    it('renders attributes correctly', () => {
      const $ = render('header', examples.attributes)

      const $component = $('.ccs-header')
      expect($component.attr('data-test-attribute')).toEqual('value')
      expect($component.attr('data-test-attribute-2')).toEqual('value-2')
    })

    it('renders classes', () => {
      const $ = render('header', examples.classes)

      const $component = $('.ccs-header')
      expect($component.hasClass('app-header--custom-modifier')).toBeTruthy()
    })

    it('renders custom container classes', () => {
      const $ = render('header', examples['full width'])

      const $component = $('.ccs-header')
      const $container = $component.find('.ccs-header__container')

      expect($container.hasClass('ccs-header__container--full-width')).toBeTruthy()
    })

    it('renders custom navigation classes', () => {
      const $ = render('header', examples['full width with navigation and service authentication'])

      const $component = $('.ccs-header')
      const $container = $component.find('.ccs-header__navigation')

      expect($container.hasClass('ccs-header__navigation--end')).toBeTruthy()
    })

    it('renders home page URL', () => {
      const $ = render('header', examples['custom homepage url'])

      const $component = $('.ccs-header')
      const $homepageLink = $component.find('.ccs-header__link--homepage')
      expect($homepageLink.attr('href')).toEqual('/')
    })
  })

  describe('with service name', () => {
    it('renders service name', () => {
      const $ = render('header', examples['with service name'])

      const $component = $('.ccs-header')
      const $serviceName = $component.find('.ccs-header__link--service-name')
      expect($serviceName.text().trim()).toEqual('Service Name')
    })

    it('renders with service url', () => {
      const $ = render('header', examples['with service name'])

      const $component = $('.ccs-header')
      const $serviceName = $component.find('.ccs-header__link--service-name')
      expect($serviceName.attr('href')).toEqual('/components/ccs-header')
    })
  })

  describe('with both navigation', () => {
    it('renders navigation', () => {
      const $ = render('header', examples['with both navigation'])

      const $component = $('.ccs-header')
      const $list = $component.find('div.ccs-header__navigation-lists')

      const $primaryList = $list.find('ul.ccs-header__navigation-primary-list')
      const $secondaryList = $list.find('ul.ccs-header__navigation-secondary-list')

      const $primaryItems = $primaryList.find('li.ccs-header__navigation-item')
      const $secondaryItems = $secondaryList.find('li.ccs-header__navigation-item')

      const $firstPrimaryItem = $primaryItems.find('a.ccs-header__link:first-child')
      const $secondaryPrimaryItem = $secondaryItems.find('a.ccs-header__link:first-child')

      expect($primaryItems.length).toEqual(3)
      expect($secondaryItems.length).toEqual(3)

      expect($firstPrimaryItem.attr('href')).toEqual('#1')
      expect($firstPrimaryItem.text()).toContain('Navigation primary item 1')

      expect($secondaryPrimaryItem.attr('href')).toEqual('#1')
      expect($secondaryPrimaryItem.text()).toContain('Navigation secondary item 1')
    })

    it('renders navigation default label correctly', () => {
      const $ = render('header', examples['with both navigation'])

      const $component = $('.ccs-header')
      const $nav = $component.find('nav')

      expect($nav.attr('aria-label')).toEqual('Menu')
    })

    it('allows navigation label to be customised', () => {
      const $ = render('header', examples['with custom navigation label'])

      const $component = $('.ccs-header')
      const $nav = $component.find('nav')

      expect($nav.attr('aria-label')).toEqual('Custom navigation label, to help with accessibility')
    })

    it('renders navigation with active item', () => {
      const $ = render('header', examples['with both navigation'])

      const $activeItem = $('.ccs-header__navigation-primary-list > li.ccs-header__navigation-item:first-child')
      expect($activeItem.hasClass('ccs-header__navigation-item--active')).toBeTruthy()
    })

    it('allows navigation item text to be passed whilst escaping HTML entities', () => {
      const $ = render('header', examples['navigation item with html as text'])

      const $navigationLink = $('.ccs-header__navigation-item a')
      expect($navigationLink.html()).toContain('&lt;em&gt;Navigation item 1&lt;/em&gt;')
    })

    it('allows navigation item HTML to be passed un-escaped', () => {
      const $ = render('header', examples['navigation item with html'])

      const $navigationLink = $('.ccs-header__navigation-item a')
      expect($navigationLink.html()).toContain('<em>Navigation item 1</em>')
    })

    it('renders navigation item with text without a link', () => {
      const $ = render('header', examples['navigation item with text without link'])

      const $navigationItem = $('.ccs-header__navigation-item')
      expect($navigationItem.html().trim()).toEqual('Navigation item 1')
    })

    it('renders navigation item with html without a link', () => {
      const $ = render('header', examples['navigation item with html without link'])

      const $navigationItem = $('.ccs-header__navigation-item')
      expect($navigationItem.html()).toContain('<em>Navigation item 1</em>')
    })

    it('renders navigation item anchor with attributes', () => {
      const $ = render('header', examples['navigation item with attributes'])

      const $navigationLink = $('.ccs-header__navigation-item a')
      expect($navigationLink.attr('data-attribute')).toEqual('my-attribute')
      expect($navigationLink.attr('data-attribute-2')).toEqual('my-attribute-2')
    })

    describe('menu button', () => {
      it('has an explicit type="button" so it does not act as a submit button', () => {
        const $ = render('header', examples['with both navigation'])

        const $button = $('.ccs-header__menu-button')

        expect($button.attr('type')).toEqual('button')
      })
      it('renders default label correctly', () => {
        const $ = render('header', examples['with both navigation'])

        const $button = $('.ccs-header__menu-button')

        expect($button.attr('aria-label')).toEqual('Show or hide menu')
      })
      it('allows label to be customised', () => {
        const $ = render('header', examples['with custom menu button label'])

        const $button = $('.ccs-header__menu-button')

        expect($button.attr('aria-label')).toEqual('Custom button label, to help with accessibility')
      })
    })
  })

  describe('with navigation and no service name', () => {
    it('adds the no-service-name class to the nav', () => {
      const $ = render('header', examples['with only primary navigation'])

      const $component = $('nav.ccs-header__navigation')

      expect($component.hasClass('ccs-header__navigation--no-service-name')).toBeTruthy()
    })
  })

  describe('with only one navigation', () => {
    describe('and it is only the primary navigation list', () => {
      it('adds the no-second-list class to the list', () => {
        const $ = render('header', examples['with only primary navigation'])

        const $component = $('ul.ccs-header__navigation-primary-list')

        expect($component.hasClass('ccs-header__navigation--no-second-list')).toBeTruthy()
      })
    })

    describe('and it is only the secondary navigation list', () => {
      it('adds the no-second-list class to the list', () => {
        const $ = render('header', examples['with only secondary navigation'])

        const $component = $('ul.ccs-header__navigation-secondary-list')

        expect($component.hasClass('ccs-header__navigation--no-second-list')).toBeTruthy()
      })
    })
  })

  describe('with service name, authentication and navigation', () => {
    it('renders the service authentication', () => {
      const $ = render('header', examples['with service name, authentication and navigation'])

      const $component = $('.ccs-header')
      const $authenticationSection = $component.find('div.ccs-header__service-authentication')

      const $authenticationList = $authenticationSection.find('ul.ccs-header__service-authentication-list')

      const $authenticationItems = $authenticationList.find('li.ccs-header__service-authentication-item')

      const $firstAuthenticationItem = $authenticationItems.find('a.ccs-header__link:first-child')

      expect($authenticationItems.length).toEqual(2)

      expect($firstAuthenticationItem.attr('href')).toEqual('#1')
      expect($firstAuthenticationItem.text()).toContain('Register')
    })
  })
})
