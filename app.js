// app.js
const API_KEY = 'ef8203e3a2a375158f2310eb46362e6d';

const elements = {
    searchInput: document.querySelector('.city-search'),
    tempValue: document.querySelector('.temp'),
    condition: document.querySelector('.condition'),
    location: document.querySelector('.location span'),
    humidity: document.querySelector('.humidity .value'),
    wind: document.querySelector('.wind .value'),
    pressure: document.querySelector('.pressure .value'),
    uv: document.querySelector('.uv .value')
};



async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        
        updateUI(data);
        updateBackground(data.weather[0].main);
        
    } catch (error) {
        console.error('Error:', error);
        alert('City not found. Try again!');
    }
}

function updateUI(data) {
    elements.tempValue.textContent = Math.round(data.main.temp);
    elements.condition.textContent = data.weather[0].main;
    elements.location.textContent = data.name;
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.wind.textContent = `${data.wind.speed} km/h`;
    elements.pressure.textContent = `${data.main.pressure} hPa`;
}

function updateBackground(condition) {
    const colors = {
        Clear: '#FFD700, #ff6b6b',
        Clouds: '#7EC8E3, #4a90e2',
        Rain: '#00B4D8, #560bad',
        Thunderstorm: '#560BAD, #480ca8',
        Snow: '#B9FBC0, #80ff9f',
        Mist: '#C0E3E7, #a8dadc'
    };
    document.body.style.background = `linear-gradient(135deg, ${colors[condition] || '#7EC8E3, #4a90e2'})`;
}

// Event Listeners
document.querySelector('.ai-predict').addEventListener('click', () => {
    if(elements.searchInput.value) fetchWeather(elements.searchInput.value);
});

elements.searchInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') fetchWeather(elements.searchInput.value);
});

// Initial Load
fetchWeather('London');

// Add to app.js
document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.main-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        document.getElementById('hover-sound').currentTime = 0;
        document.getElementById('hover-sound').play();
    });
});