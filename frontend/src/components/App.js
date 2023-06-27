import React, { useEffect, useState } from "react"
import { Header } from "./Header"
import { Main } from "./Main"
import { Footer } from "./Footer"
import { ImagePopup } from "./ImagePopup"
import Api from "../utils/Api"
import { EditProfilePopup } from "./EditProfilePopup"
import { EditAvatarPopup } from "./EditAvatarPopup"
import { AddPlacePopup } from "./AddPlacePopup"
import { Route, Routes, useNavigate } from "react-router-dom"
import { ProtectedRoute } from "../HOC/ProtectedRoute"
import { Login } from "./Login/Login"
import { Register } from "./Register/Register"
import { InfoTooltip } from "./InfoTooltip/InfoTooltip"
import { UseCurrentUserContext } from "../context/CurrentUserContext"

function App() {
  const { token, setToken, email, setEmail, currentUser, setCurrentUser } =
    UseCurrentUserContext()

  const [selectedCard, setSelectedCard] = useState(null)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isNewCardPopupOpen, setIsNewCardPopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [isInfoTooltipStateError, setIsInfoTooltipStateError] = useState(false)
  // const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [cards, setCards] = useState([])

  const navigate = useNavigate()

  const closeAllPopups = () => {
    setSelectedCard(null)
    setIsEditProfilePopupOpen(false)
    setIsNewCardPopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    // setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false)
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isNewCardPopupOpen ||
    selectedCard ||
    isInfoTooltipOpen

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape)
      return () => {
        document.removeEventListener("keydown", closeByEscape)
      }
    }
  }, [isOpen])

  useEffect(() => {
    Api.getProfile()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error(err.message))
  }, [token, setCurrentUser])

  useEffect(() => {
    Api.getInitialCards()
      .then((cards) => {
        setCards(cards)
      })
      .catch((err) => console.error(err.message))
  }, [])

  const handleCardDelete = (card) => {
    Api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id))
      })
      .catch((err) => console.error(err.message))
  }

  const handleAddCard = (inf) => {
    return Api.addCard(inf)
      .then((newCard) => {
        setCards((prev) => [newCard, ...prev])
        closeAllPopups()
      })
      .catch((err) => console.error(err.message))
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    Api.likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        )
      })
      .catch((err) => console.error(err.message))
  }

  const handleUpdateUser = (inf) => {
    return Api.updateProfile(inf)
      .then((user) => {
        setCurrentUser((_) => user)
        closeAllPopups()
      })
      .catch((err) => console.error(err.message))
  }

  const handleUpdateAvatar = (inf) => {
    return Api.updateProfileAvatar(inf)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups()
      })
      .catch((err) => console.error(err.message))
  }

  const handleSignIn = ({ isOk, email, token }) => {
    if (isOk) {
      setToken(token)
      setEmail(email)
      navigate("/")
    } else {
      setIsInfoTooltipStateError(true)
      setIsInfoTooltipOpen(true)
    }
  }

  const handleSignUp = ({ isOk }) => {
    setIsInfoTooltipStateError(!isOk)
    setIsInfoTooltipOpen(true)
  }

  const handleSignOut = () => {
    setToken("")
  }

  // return (<div>123</div>)

  return (
    <>
      <div className='body'>
        <Header email={email} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path='/sign-up'
            element={<Register onRegister={handleSignUp} />}
          />

          <Route path='/sign-in' element={<Login onLogin={handleSignIn} />} />

          <Route
            path='/'
            element={
              <ProtectedRoute
                onCardClick={(card) => setSelectedCard(card)}
                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                onAddPlace={() => setIsNewCardPopupOpen(true)}
                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                element={Main}
                isLoggedIn={!!token}
              />
            }
          />
        </Routes>
        <Footer />
      </div>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={closeAllPopups}
      />

      <AddPlacePopup
        isOpen={isNewCardPopupOpen}
        onAddCard={handleAddCard}
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isError={isInfoTooltipStateError}
        onClose={closeAllPopups}
        name='info'
      />
    </>
  )
}

export default App
