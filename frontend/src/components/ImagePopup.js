import React from "react"

export const ImagePopup = ({ card, onClose }) => {
  return (
    card && (
      <div className='popup popup_type_open-image popup__opened'>
        <figure className='popup__image-container'>
          <button type='button' className='popup__close' onClick={onClose}>
            {" "}
          </button>
          <img src={card.link} alt={card.name} className='popup__image-image' />
          <figcaption className='popup__image-subtitle'>{card.name}</figcaption>
        </figure>
      </div>
    )
  )
}
