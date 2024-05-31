/**
 * @jest-environment jsdom
 */
const { render, getExamples } = require('../../../../lib/jest')

let examples

beforeAll(async () => {
  examples = await getExamples('logo')
})

describe('Logo', () => {
  it('renders the logo with the svg', () => {
    const $ = render('logo', examples.default)
    expect($.html()).toMatchSnapshot()
  })
})
