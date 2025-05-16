import React from 'react'
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>Choose</div>
      <input type="button" value="Play" onClick={() => navigate('/play')} />
      <input type="button" value="Statistics" onClick={() => navigate('/stats')} />
      <input type="button" value="Settings" onClick={() => navigate('/settings')} />
    </div>
  )
}

export default Menu