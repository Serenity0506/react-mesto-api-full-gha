import { useRef } from "react"
import { PopupWithForm } from "./PopupWithForm"

export const EditAvatarPopup = ({ onClose, isOpen, onUpdateAvatar }) => {
  const avatarUrlInput = useRef()

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateAvatar(avatarUrlInput.current.value)
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      name='update-avatar'
      title='Обновить аватар'
    >
      <input
        id='avatarLink'
        type='url'
        name='avatarLink'
        className='popup__input'
        placeholder='Ссылка на аватар'
        required
        ref={avatarUrlInput}
      />
      <span id='avatarLink-error' className='popup__input-error'></span>
    </PopupWithForm>
  )
}
