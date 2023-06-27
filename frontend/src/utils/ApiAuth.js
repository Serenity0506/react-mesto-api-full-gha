class ApiAuth {
  constructor(options) {
    this.options = options
  }

  async signUp(email, password) {
    const res = await fetch(`${this.options.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })

    if (res.status === 400) {
      throw new Error("Некорректно заполнено одно из полей")
    } else if (!res.ok) {
      throw new Error(res.error.desciption)
    }

    return res.json()
  }

  async signIn(email, password) {
    const res = await fetch(`${this.options.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })

    if (res.status === 400) {
      throw new Error("Некорректно заполнено одно из полей")
    }

    if (res.status === 401) {
      throw new Error("Пользователь с email не найден")
    }

    return res.json()
  }

  async isTokenValid(token) {
    const res = await fetch(`${this.options.baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.status === 400) {
      throw new Error("Токен не передан или передан не в том формате")
    }

    if (res.status === 401) {
      throw new Error("Переданный токен некорректен")
    }

    return res.json()
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiAuth({
  baseUrl: "https://auth.nomoreparties.co",
})
