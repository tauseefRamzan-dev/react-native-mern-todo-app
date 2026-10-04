import React from 'react'
import Auth from './Auth'

const AppProvider = ({Children}) => {
  return (
    <Auth>
        {Children}
    </Auth>
  )
}

export default AppProvider