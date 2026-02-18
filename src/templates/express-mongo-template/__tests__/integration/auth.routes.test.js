const request = require('supertest');
const express = require('express');
const authRoutes = require('../../routes/v1/auth.routes');

// Create a test app
const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRoutes);

describe('Auth Routes Integration Tests', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should return 400 if validation fails', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({
        name: 'A', // Too short
        email: 'invalid-email',
        password: '123', // Too short
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'Validation failed');
      expect(res.body.errors).toBeInstanceOf(Array);
      expect(res.body.errors.length).toBeGreaterThan(0);
    });

    it('should return validation errors for missing fields', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeInstanceOf(Array);

      const fields = res.body.errors.map(e => e.field);
      expect(fields).toContain('name');
      expect(fields).toContain('email');
      expect(fields).toContain('password');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should return 400 for invalid email format', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({
        email: 'not-an-email',
        password: 'password123',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeInstanceOf(Array);
    });

    it('should return 400 for missing password', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({
        email: 'test@example.com',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
