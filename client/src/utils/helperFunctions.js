export const tweetUrl = (quote, work, act, scene) => {
  const tweet = encodeURIComponent(`"${quote}" - ${work} (Act ${act}, Sc ${scene})`);
  return `https://twitter.com/intent/tweet?text=${tweet}&hashtags=ShakespeareSunday`;
};