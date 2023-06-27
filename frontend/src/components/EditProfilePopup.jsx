import { useEffect, useContext } from "react"
import { PopupWithForm } from "./PopupWithForm"
import { CurrentUserContext } from "../context/CurrentUserContext"
import { useForm } from "../hooks/useForm"

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const { currentUser } = useContext(CurrentUserContext)

  const { values, handleChange, setValues } = useForm({ name: "", about: "" })

  useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    })
  }, [currentUser, isOpen, setValues])

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateUser(values)
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      name='edit-profile'
      title='Редактировать профиль'
    >
      <input
        type='text'
        name='name'
        className='popup__input'
        placeholder='Name'
        minLength='2'
        maxLength='40'
        required
        value={values.name || ""}
        onChange={handleChange}
      />
      <span id='name-error' className='popup__input-error'>
        Вы пропустили это поле.
      </span>
      <input
        type='text'
        name='about'
        className='popup__input'
        placeholder='About'
        minLength='2'
        maxLength='200'
        required
        value={values.about || ""}
        onChange={handleChange}
      />
      <span id='about-error' className='popup__input-error'>
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  )
}
