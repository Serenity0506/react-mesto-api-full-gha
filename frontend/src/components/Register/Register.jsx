import { NavLink } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import ApiAuth from "../../utils/ApiAuth"

export const Register = ({ onRegister }) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  })

  function handleRegister(evt) {
    evt.preventDefault()

    ApiAuth.signUp(values.email, values.password)
      .then((data) => {
        console.log(data)
        onRegister({
          isOk: true,
        })
      })
      .catch((error) => {
        onRegister({
          isOk: false,
          error,
        })
      })
  }

  return (
    <form className='sign__container' name='register' onSubmit={handleRegister}>
      <h1 className='sign__header'>Регистрация</h1>
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
        Зарегистрироваться
      </button>
      <NavLink to='/sign-in' className='sign__button-subtitle'>
        <span>Уже зарегистрированы? Войти</span>
      </NavLink>
    </form>
  )
}
