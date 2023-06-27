import { useContext } from "react"
import trashIcon from "../images/trash-icon.svg"
import { CurrentUserContext } from "../context/CurrentUserContext"

function Card({ onCardDelete, onCardLike, card, onCardClick }) {
  const { currentUser } = useContext(CurrentUserContext)

  const isOwn = card.owner._id === currentUser._id
  const isLiked = card.likes.some((i) => i._id === currentUser._id)
  const cardLikeButtonClassName = `element__like-btn ${
    isLiked && "element__like-btn_active"
  }`

  return (
    <div className='element'>
      <li>
        {isOwn && (
          <img
            className='element__delete'
            src={trashIcon}
            onClick={() => onCardDelete(card)}
            alt='Удалить'
          />
        )}
        <img
          className='element__picture'
          src={card.link}
          alt={card.name}
          onClick={() => onCardClick(card)}
        />
        <div className='element__text-container'>
          <h3 className='element__title'>{card.name}</h3>
          <div className='element__like_container'>
            <button
              type='button'
              className={cardLikeButtonClassName}
              onClick={() => onCardLike(card)}
            ></button>
            <span className='element__like_count'>{card.likes.length}</span>
          </div>
        </div>
      </li>
    </div>
  )
}

export default Card
