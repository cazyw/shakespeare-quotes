export const tweetUrl = (quote, work, act, scene) => {
  const actScene = act !== '' && scene !== '' ? ` (Act ${act}, Sc ${scene})` : '';
  const tweet = encodeURIComponent(`"${quote}" - ${work}${actScene}`);
  return `https://twitter.com/intent/tweet?text=${tweet}&hashtags=ShakespeareSunday`;
};

export const arraysMatch = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};
