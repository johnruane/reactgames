import generateSecretCode from '../generateSecretCode';

describe('generateSecretCode', () => {
  it('should return an array of length 4', () => {
    const code = generateSecretCode();
    expect(Array.isArray(code)).toBe(true);
    expect(code).toHaveLength(4);
  });

  it('should only contain numbers between 1 and 6', () => {
    const code = generateSecretCode();
    code.forEach((num) => {
      expect(typeof num).toBe('number');
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(6);
    });
  });
});
