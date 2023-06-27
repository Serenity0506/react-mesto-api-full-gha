import React from "react"
import { NavLink as Link, Route, Routes } from "react-router-dom"
import logo from "../images/Vector.svg"

export const Header = ({ email, onSignOut }) => {
  return (
    <header className='header'>
      <img className='header__logo' alt='место' src={logo} />
      <Routes>
        <Route
          exact
          path='/'
          element={
            <>
              <span className='header__email'>{email}</span>
              <span className='header__link' onClick={onSignOut}>
                Выйти
              </span>
            </>
          }
        ></Route>
        <Route
          path='/sign-up'
          element={
            <Link className={"header__link"} to='/sign-in'>
              Войти
            </Link>
          }
        ></Route>
        <Route
          path='/sign-in'
          element={
            <Link className={"header__link"} to='/sign-up'>
              Регистрация
            </Link>
          }
        ></Route>
      </Routes>
    </header>
  )
}

export default Header
