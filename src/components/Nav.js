import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

export default function Nav () {
  return (
    <nav>
      <ul className='nav-list'>
        <li className='nav-item'>
          <NavLink to='/' exact activeClassName='active'>
            ALL QUESTIONS
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/add' activeClassName='active'>
            ADD A QUESTION
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/leaderboard' exact activeClassName='active'>
            LEADER BOARD
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
