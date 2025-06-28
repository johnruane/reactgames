import calculateResults from '../calculateResults';

describe('calculateResults', () => {
  it('returns correct matches and appears counts for exact matches', () => {
    const result = calculateResults({
      guess: ['red', 'blue', 'green', 'yellow'],
      secret: ['red', 'blue', 'green', 'yellow'],
    });
    expect(result).toEqual([1, 1, 1, 1]);
  });

  it('returns 0 matches and 0 appears for no overlap', () => {
    const result = calculateResults({
      guess: ['red', 'blue', 'green', 'yellow'],
      secret: ['purple', 'orange', 'pink', 'brown'],
    });
    expect(result).toEqual([]);
  });

  it('counts only correct values in correct positions as matches', () => {
    const result = calculateResults({
      guess: ['red', 'green', 'blue', 'yellow'],
      secret: ['red', 'blue', 'green', 'yellow'],
    });
    expect(result).toEqual([1, 1, 2, 2]);
  });

  it('counts correct values in wrong positions only as appears', () => {
    const result = calculateResults({
      guess: ['blue', 'red', 'yellow', 'green'],
      secret: ['red', 'blue', 'green', 'yellow'],
    });
    expect(result).toEqual([2, 2, 2, 2]);
  });

  it('handles duplicates correctly (one matches only)', () => {
    const result = calculateResults({
      guess: ['red', 'red', 'blue', 'blue'],
      secret: ['red', 'blue', 'green', 'yellow'],
    });
    expect(result).toEqual([1, 2]);
  });

  it('does not double count correct values in wrong positions if also matchesed by index', () => {
    const result = calculateResults({
      guess: ['red', 'blue', 'blue', 'yellow'],
      secret: ['red', 'blue', 'green', 'yellow'],
    });
    expect(result).toEqual([1, 1, 1]);
  });
});
