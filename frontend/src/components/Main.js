import { useContext } from "react"
import Card from "./Card.js"
import { CurrentUserContext } from "../context/CurrentUserContext"

import icon from "../images/edit-icon.png"

export const Main = (props) => {
  const { currentUser } = useContext(CurrentUserContext)

  return (
    <main className='page'>
      <section className='profile'>
        <div className='profile__avatar' onClick={props.onEditAvatar}>
          <img
            className='profile__avatar-image'
            src={currentUser?.avatar}
            alt='Аватар'
          />
          <div className='profile__avatar-overlay'>
            <img alt='иконка' src={icon} />
          </div>
        </div>
        <div className='profile__info'>
          <h1 className='profile__title'>{currentUser?.name}</h1>
          <button
            type='button'
            className='profile__edit-button'
            onClick={props.onEditProfile}
          />
          <p className='profile__subtitle'>{currentUser?.about}</p>
        </div>
        <button
          type='button'
          className='profile__add-button'
          onClick={props.onAddPlace}
        />
      </section>

      <section className='elements'>
        <ul className='element-list'>
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardDelete={props.onCardDelete}
              selfId={props.selfId}
              onCardLike={props.onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
