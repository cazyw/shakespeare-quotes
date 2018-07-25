export const tweetUrl = (quote, work, act, scene) => {
  const actScene = act !== '' && scene !== '' ?  ` (Act ${act}, Sc ${scene})` : '';
  const tweet = encodeURIComponent(`"${quote}" - ${work}${actScene}`);
  return `https://twitter.com/intent/tweet?text=${tweet}&hashtags=ShakespeareSunday`;
};