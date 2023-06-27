import { useForm } from "../hooks/useForm"
import { PopupWithForm } from "./PopupWithForm"

export const AddPlacePopup = ({ onAddCard, isOpen, onClose }) => {
  const { values, handleChange } = useForm({ name: "", link: "" })

  function handleAddPlaceSubmit(e) {
    e.preventDefault()

    onAddCard(values)
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleAddPlaceSubmit}
      onClose={onClose}
      name='new-card'
      title='Новое место'
    >
      <input
        type='text'
        name='name'
        className='popup__input'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        required
        value={values.name}
        onChange={handleChange}
      />
      <span id='name-error' className='popup__input-error'>
        Вы пропустили это поле.
      </span>
      <input
        type='url'
        name='link'
        className='popup__input'
        placeholder='Ссылка'
        required
        value={values.link}
        onChange={handleChange}
      />
      <span id='link-error' className='popup__input-error'>
        Введите адрес сайта.
      </span>
    </PopupWithForm>
  )
}
