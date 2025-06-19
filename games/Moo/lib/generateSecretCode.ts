const generateSecretCode = () => {
  const numberSet = [1, 2, 3, 4, 5, 6];

  return Array.from({ length: 4 }).map(
    () => numberSet[Math.floor(Math.random() * numberSet.length)]
  );
};

export default generateSecretCode;
