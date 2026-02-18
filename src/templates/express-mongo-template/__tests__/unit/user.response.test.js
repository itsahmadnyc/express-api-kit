const UserResponse = require('../../models/responses/user.response');

describe('UserResponse Formatter', () => {
  describe('format()', () => {
    it('should format a user object correctly', () => {
      const user = {
        _id: '507f1f77bcf86cd799439011',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword',
        role: 'user',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        toObject: function () {
          return this;
        },
      };

      const formatted = UserResponse.format(user);

      expect(formatted).toEqual({
        id: '507f1f77bcf86cd799439011',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });

      // Should not include password
      expect(formatted.password).toBeUndefined();
    });

    it('should return null for null user', () => {
      const formatted = UserResponse.format(null);
      expect(formatted).toBeNull();
    });

    it('should return null for undefined user', () => {
      const formatted = UserResponse.format(undefined);
      expect(formatted).toBeNull();
    });
  });

  describe('formatMany()', () => {
    it('should format multiple users', () => {
      const users = [
        {
          _id: '1',
          name: 'User 1',
          email: 'user1@example.com',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
          toObject: function () {
            return this;
          },
        },
        {
          _id: '2',
          name: 'User 2',
          email: 'user2@example.com',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
          toObject: function () {
            return this;
          },
        },
      ];

      const formatted = UserResponse.formatMany(users);

      expect(formatted).toHaveLength(2);
      expect(formatted[0].id).toBe('1');
      expect(formatted[1].id).toBe('2');
    });

    it('should return empty array for null', () => {
      const formatted = UserResponse.formatMany(null);
      expect(formatted).toEqual([]);
    });

    it('should return empty array for non-array', () => {
      const formatted = UserResponse.formatMany({});
      expect(formatted).toEqual([]);
    });
  });

  describe('formatWithToken()', () => {
    it('should format user with token', () => {
      const user = {
        _id: '123',
        name: 'John',
        email: 'john@example.com',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        toObject: function () {
          return this;
        },
      };
      const token = 'jwt-token-here';

      const formatted = UserResponse.formatWithToken(user, token);

      expect(formatted).toHaveProperty('token', token);
      expect(formatted).toHaveProperty('user');
      expect(formatted.user.id).toBe('123');
    });
  });
});
