import React from 'react'
import cy from 'cypress'
import TableCustomComponent from './TableCustomComponent'

describe('<TableCustomComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TableCustomComponent />)
  })
})