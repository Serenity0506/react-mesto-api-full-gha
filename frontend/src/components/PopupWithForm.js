import React from "react"

export const PopupWithForm = ({
  children,
  isOpen,
  onClose,
  name,
  title,
  buttonText = "Сохранить",
  onSubmit,
}) => {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup__opened" : ""}`}
    >
      <form onSubmit={onSubmit} className='popup__form'>
        <button
          type='button'
          className='popup__close'
          onClick={onClose}
        ></button>
        <p className='popup__header'>{title}</p>
        {children}
        <button type='submit' className='popup__submit'>
          {buttonText}
        </button>
      </form>
    </div>
  )
}
