export const validationSettings = {
  selectors: {
    form: ".popup__form",
    input: ".popup__input",
    submit: ".popup__submit",
  },
  classes: {
    inputError: "popup__input_type_error",
    inputErrorMessageActive: "popup__input-error_active",
    inactiveButton: "popup__submit_disabled",
  },
}

export const newCardSettings = {
  selectors: {
    title: ".element__title",
    picture: ".element__picture",
    like: ".element__like-btn",
    likeCounter: ".element__like_count",
    delete: ".element__delete",
  },
  classes: {
    likeActive: "element__like-btn_active",
  },
}

export const apiSettings = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-56",
  headers: {
    Authorization: "2037be67-4b4a-4e4a-852d-8f6601e15bb9",
    "Content-Type": "application/json",
  },
}
