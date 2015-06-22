function animateScore(element, newScore, scoreIncrement, animationTime)
{
  var currentScore = parseFloat(element.innerText);
  var updatedScore = newScore - currentScore;
  var steps = delay = 0;
  if (scoreIncrement != 0 && updatedScore != 0)
  {
    steps = Math.abs(updatedScore)/scoreIncrement;
    if (steps % 1 !== 0)
    {
      console.log("Score must evenly divide by increment")
      return;
    }
    if (animationTime > 0 && steps > 0)
    {
      delay = animationTime/steps;
    }
    changeScore(element, newScore, currentScore, delay, scoreIncrement);
  }
}

function changeScore(element, score, currentScore, delay, scoreIncrement)
{
  if (currentScore != score)
  {
    element.innerText = currentScore += scoreIncrement;
    setTimeout(function(){changeScore(element, score, currentScore, delay, scoreIncrement)}, delay);
  }
}