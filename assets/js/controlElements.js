// declare all elements
const weatherNav = document.querySelector('#weather-nav');
const historyNav = document.querySelector('#history-nav')
const weatherDiv = document.querySelector('.weather');
const historyDiv = document.querySelector('.history');
const historyDetailsDiv = document.querySelector('.history-details');
// this should be query selector all. when it's time
const details = document.querySelector('#details');

weatherNav.addEventListener('click', () => {
    historyDiv.style.display = 'none';
    weatherDiv.style.display = 'block';
    historyDetailsDiv.style.display = 'none';

})

historyNav.addEventListener('click', () => {
    weatherDiv.style.display = 'none'
    historyDiv.style.display = 'block';
    historyDetailsDiv.style.display = 'none';
});


details.addEventListener('click', () => {
    // weatherDiv.style.display = 'none'
    historyDetailsDiv.style.display = 'block';

    historyDiv.style.display = 'none';
})



console.log(details)