// src/utils/__tests__/validators.test.ts
import { isValidEmail, isValidPassword } from '../validators';

describe('validators', () => {
  describe('isValidEmail', () => {
    it('should return true for a valid email', () => {
      const validEmail = 'test@example.com';
      expect(isValidEmail(validEmail)).toBe(true);
    });

    it('should return false for an invalid email', () => {
      const invalidEmail = 'test@.com';
      expect(isValidEmail(invalidEmail)).toBe(false);
    });

    it('should return false for an email without @', () => {
      const invalidEmail = 'testexample.com';
      expect(isValidEmail(invalidEmail)).toBe(false);
    });

    it('should return false for an email without domain', () => {
      const invalidEmail = 'test@';
      expect(isValidEmail(invalidEmail)).toBe(false);
    });

    it('should return false for an email with spaces', () => {
      const invalidEmail = 'test @example.com';
      expect(isValidEmail(invalidEmail)).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('should return true for a valid password', () => {
      const validPassword = 'Valid1@password';
      expect(isValidPassword(validPassword)).toBe(true);
    });

    it('should return false for a password without uppercase letters', () => {
      const invalidPassword = 'invalid1@password';
      expect(isValidPassword(invalidPassword)).toBe(false);
    });

    it('should return false for a password without lowercase letters', () => {
      const invalidPassword = 'INVALID1@PASSWORD';
      expect(isValidPassword(invalidPassword)).toBe(false);
    });

    it('should return false for a password without digits', () => {
      const invalidPassword = 'Invalid@Password';
      expect(isValidPassword(invalidPassword)).toBe(false);
    });

    it('should return false for a password without special characters', () => {
      const invalidPassword = 'Invalid1Password';
      expect(isValidPassword(invalidPassword)).toBe(false);
    });

    it('should return false for a password shorter than 8 characters', () => {
      const invalidPassword = 'V1@p';
      expect(isValidPassword(invalidPassword)).toBe(false);
    });

    it('should return false for a password longer than 16 characters', () => {
      const invalidPassword = 'Valid1@passwordTooLong';
      expect(isValidPassword(invalidPassword)).toBe(false);
    });
  });
});
