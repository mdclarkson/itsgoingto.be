import React from 'react'
import JWGMediaImage from './assets/jwgmedia.png'
import './footer.scss'

export const Footer = () => (
  <div className='footer-container'>
    <div className='footer'>
      <span className='contact'>
        <a href='mailto:itsgoingtobe@jwgmedia.co.uk' target='_top'>itsgoingtobe@jwgmedia.co.uk</a>
      </span>
      <span className='jwg_logo'>
        <a href='http://jwgmedia.co.uk' target='_blank' rel='noopener noreferrer'><img src={JWGMediaImage} /></a>
      </span>
    </div>
  </div>
)

export default Footer
