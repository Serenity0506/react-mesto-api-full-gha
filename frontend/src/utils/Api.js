import { apiSettings } from './constants'
// import { UseCurrentUserContext } from "../context/CurrentUserContext"

class Api {
  constructor(options) {
    this.options = options
    this.token = ''
  }

  setToken(token) {
    this.options.headers['Authorization'] = 'Bearer ' + token
  }

  async getInitialCards() {
    const resp = await fetch(this.options.baseUrl + "/cards", {
      headers: this.options.headers,
    })

    this._checkResponse(resp)

    return await resp.json()
  }

  async addCard({ name, link }) {
    const resp = await fetch(this.options.baseUrl + "/cards", {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })

    this._checkResponse(resp)

    return await resp.json()
  }

  async deleteCard(cardId) {
    const resp = await fetch(this.options.baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: this.options.headers,
    })

    this._checkResponse(resp)
  }

  async likeCard(cardId, isLiked) {
    const resp = await fetch(this.options.baseUrl + `/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this.options.headers,
    })

    this._checkResponse(resp)

    return await resp.json()
  }

  // PROFILE

  async getProfile() {
    const resp = await fetch(this.options.baseUrl + "/users/me", {
      headers: this.options.headers,
    })

    this._checkResponse(resp)

    return await resp.json()
  }

  async updateProfileAvatar(avatarUrl) {
    const resp = await fetch(this.options.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    })

    this._checkResponse(resp)

    return await resp.json()
  }

  async updateProfile({ name, about }) {
    const resp = await fetch(this.options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })

    this._checkResponse(resp)

    return await resp.json()
  }

  _checkResponse(resp) {
    if (!resp.ok) throw new Error(`Ошибка: ${resp.status}`)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Api({
  baseUrl: apiSettings.baseUrl,
  headers: {
    Authorization: "",
    "Content-Type": "application/json",
  },
})
