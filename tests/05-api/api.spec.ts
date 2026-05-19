import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:1338';

test.describe('API – /ping', () => {
  test('returns 200 and pong', async ({ request }) => {
    const res = await request.get(`${BASE}/ping`);
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({ message: 'pong' });
  });
});

test.describe('API – /users', () => {
  test('returns the full user list', async ({ request }) => {
    const res = await request.get(`${BASE}/users`);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body).toHaveLength(2);
    expect(body[0]).toMatchObject({ id: 1, name: 'Alice', role: 'admin' });
  });

  test('returns a single user by id', async ({ request }) => {
    const res = await request.get(`${BASE}/users/2`);
    expect(res.status()).toBe(200);
    expect(await res.json()).toMatchObject({ id: 2, name: 'Bob' });
  });

  test('returns 404 for an unknown user', async ({ request }) => {
    const res = await request.get(`${BASE}/users/99`);
    expect(res.status()).toBe(404);
    expect(await res.json()).toMatchObject({ error: 'Not found' });
  });
});

test.describe('API – /echo', () => {
  test('echoes back the posted JSON body', async ({ request }) => {
    const payload = { hello: 'world', num: 42 };
    const res = await request.post(`${BASE}/echo`, { data: payload });
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual(payload);
  });
});

test.describe('API – unknown routes', () => {
  test('returns 404 for an unrecognised path', async ({ request }) => {
    const res = await request.get(`${BASE}/does-not-exist`);
    expect(res.status()).toBe(404);
  });
});
