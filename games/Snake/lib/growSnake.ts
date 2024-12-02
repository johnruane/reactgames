/**
 * Function to growing the snake in length. Duplicate the last element and append.
 *
 * @param {Number[]} snake
 * @return {Number[]}
 */

export function growSnake(snake) {
  let lastElement = snake[snake.length - 1];
  const copySnakeBody = [...snake];
  copySnakeBody.push(lastElement);
  return copySnakeBody;
}
