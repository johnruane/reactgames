/**
 * Generates a random secret code for a Mastermind-style game.
 *
 * The code consists of 4 digits, each randomly selected from the set [1, 2, 3, 4, 5, 6].
 * Duplicates are allowed.
 *
 * @returns {number[]} An array of 4 numbers representing the secret code.
 *
 * @example
 * const secret = generateSecretCode();
 * // secret might be: [3, 1, 4, 6]
 */

const generateSecretCode = () => {
  const numberSet = [1, 2, 3, 4, 5, 6];

  return Array.from({ length: 4 }).map(
    () => numberSet[Math.floor(Math.random() * numberSet.length)],
  );
};

export default generateSecretCode;
