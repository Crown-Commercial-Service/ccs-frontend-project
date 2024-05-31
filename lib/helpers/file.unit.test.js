import { allComponents, getComponentData } from './file'

describe('allComponents', () => {
  it('lists all the components', async () => {
    expect(await allComponents()).toEqual([
      'dashboard-section',
      'footer',
      'header',
      'logo'
    ])
  }
  )
})

describe('getComponentData', () => {
  describe('when the component has examples', () => {
    const components = [
      'dashboard-section',
      'footer',
      'header',
      'logo'
    ].map((name) => { return { name } })

    it.each(components)(
      'returns params and examples for $name',
      async ({ name }) => {
        const componentData = await getComponentData(name)

        expect(componentData).toHaveProperty('params')
        expect(componentData).toHaveProperty('examples')
      }
    )
  })
})
