import React from "react"
import ApiAuth from "../../utils/ApiAuth"
import { useForm } from "../../hooks/useForm"

export const Login = ({ onLogin }) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  })

  function handleLogin(evt) {
    evt.preventDefault()

    ApiAuth.signIn(values.email, values.password)
      .then((data) => {
        console.log(data)
        onLogin({
          isOk: true,
          email: values.email,
          token: data.token,
        })
      })
      .catch((error) => {
        onLogin({
          isOk: false,
          error,
        })
      })
  }

  return (
    <form className='sign__container' name='login' onSubmit={handleLogin}>
      <h1 className='sign__header'>Вход</h1>
      <input
        className='sign__input'
        placeholder='Email'
        type='email'
        required
        name='email'
        onChange={handleChange}
        value={values.email}
      ></input>
      <input
        className='sign__input'
        placeholder='Пароль'
        type='password'
        required
        name='password'
        onChange={handleChange}
        value={values.password}
      ></input>
      <button type='submit' className='sign__button'>
        Войти
      </button>
    </form>
  )
}
