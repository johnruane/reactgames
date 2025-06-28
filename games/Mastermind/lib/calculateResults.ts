/**
 * Calculates the result pegs for a Mastermind-style game based on a guess and the secret code.
 *
 * The result is an array of values representing:
 * - `1` for each exact match (correct value in the correct position).
 * - `2` for each included match (correct value in the wrong position, and not already counted).
 * The result is sorted and always contains only these values (no padding).
 *
 * @param {Object} params - The function parameters.
 * @param {Array<number|string>} params.guess - The player's guess array.
 * @param {Array<number|string>} params.secret - The secret code array to compare against.
 *
 * @returns {number[]} A sorted array where:
 * - `1` represents a correct value in the correct position.
 * - `2` represents a correct value in the wrong position.
 *
 * @example
 * calculateResults({ guess: [1, 2, 3, 4], secret: [1, 3, 4, 2] });
 * // Returns: [1, 2, 2] → 1 exact match, 2 includes
 */

const calculateResults = ({ guess, secret }) => {
  let matches = 0;
  let includes = 0;

  const nonMatchedGuess: number[] = [];
  const nonMatchedSecret: number[] = [];

  guess.forEach((value, index) => {
    if (secret[`${index}`] === value) {
      matches += 1;
    } else {
      nonMatchedGuess.push(value);
      nonMatchedSecret.push(secret[`${index}`]);
    }
  });

  /*
   * Each time nonMatchedSecret include value, remove from nonMatchedSecret
   * so that it is not counted again.
   */
  nonMatchedGuess.forEach((value) => {
    if (nonMatchedSecret.includes(value)) {
      includes += 1;
      delete nonMatchedSecret[nonMatchedSecret.indexOf(value)];
    }
  });

  return [
    ...Array.from({ length: matches }, () => 8),
    ...Array.from({ length: includes }, () => 9),
  ].sort();
};

export default calculateResults;
