import React from 'react'
import { Link } from 'react-router-dom';
import AddIcon from '../assets/plus.png'

const AddButton = () => {
  return (
    <div>
          <Link to="/note/new" className="floating-button">
              <img src={AddIcon} className='add-button' />
          </Link>
    </div>
  )
}

export default AddButton
