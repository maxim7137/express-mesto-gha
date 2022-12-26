/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('Эндпоинты откликаются на запросы', () => {
  it('Возвращает данные и 200-й ответ по запросу к "/"', () =>
    request.get('/cards').then((response) => {
      expect(response.status).toBe(200);
    }));
});
