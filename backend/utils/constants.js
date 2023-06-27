module.exports = Object.freeze({
  BAD_REQUEST: { code: 400, body: { message: 'Некорректный запрос' } },
  NOT_FOUND: { code: 404, body: { message: 'Ресурс не найден' } },
  INTERNAL_SERVER: { code: 500, body: { message: 'На сервере произошла ошибка' } },
  UNAUTHORIZED: { code: 401, body: { message: 'Ошибка доступа в систему' } },
  CONFLICT: { code: 409, body: { message: 'Этот запрос привел к конфликту! Аккуратнее там.' } },
});
