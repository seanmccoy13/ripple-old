import React from 'react'
import SelectionMenu from './SelectionMenu'



const ResultsMenuItems = ({ pathname, users }) => pathname === '/results/dashboard'
  ? (<SelectionMenu users={users} />)
  : <div />

export default ResultsMenuItems
