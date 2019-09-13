import React from 'react'
import { render, cleanup, RenderResult } from '@testing-library/react'

import Write from '../../components/Write'

describe('Write component', () => {
  afterEach(cleanup)

  test('should match snapshot', () => {
    const component = render(<Write />)
    expect(component.container).toMatchSnapshot()
  })
  
})