/*
 * Gets the DOM row pased as an index, loops though each cell performing the animation. If onFinishCallback is passed
 * then this is executed when animation finishes.
 * The cancel() call removes the effects of the animation, restoring the cell scale.
 */
export const animateCompleteRow = (index, isLastRow, onFinishCallback) => {
  // Gets the DOM row passed as an index
  const rowDOM = document.querySelectorAll('[data-animate="row"]').item(index);

  /*
   * Once the animations have completed we need to change opacity back to 1. Not able to use cancel() as we want the animation to
   * persist until all are complete. Tried persist() but didn't work. Can only use cancel() when all Promise resolve, but by that time
   * we've lost the reference to the elements. animationReset() is a not too hacky work around.
   */
  function animationsReset() {
    Array.from(rowDOM.children).forEach((element) => {
      element.animate([{ opacity: 1 }], {
        duration: 10,
        fill: 'both',
        pseudoElement: '::after',
      });
    });
  }

  /*
   * Iterate through each element in the row and perform scale & rotate transform on the ::after element. We don't animate
   * the DOM element itself as that would effect the layout of the board. The ::after element is what contains the block colours.
   */
  const animations = Array.from(rowDOM.children).map((element, index) => {
    const rabbitDownAnimation = element.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      {
        duration: 500,
        fill: 'forwards',
        easing: 'ease-out',
        pseudoElement: '::after',
        delay: index * 30,
      },
    );

    return new Promise<void>((resolve) => {
      rabbitDownAnimation.onfinish = () => {
        resolve();
      };
    });
  });

  /*
   * Once all animations have resolved, call the callback function passed in, but only on the last animation as there may be
   * more than 1 row animated and we don't want to continue play until after the last row has animated.
   */
  Promise.all(animations).then(() => {
    animationsReset();
    if (isLastRow) {
      onFinishCallback();
    }
  });
};
