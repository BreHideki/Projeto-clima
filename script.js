document.querySelector(".busca").addEventListener("submit", async (event) => {
    event.preventDefault();


    let input = document.querySelector("#searchInput").value;

    if(input !== '') {
        clearInfo();
        showWarning("Loading...");

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e8f1bf715c3a8a265d6777c59bc52e37&units=metric&lang=pt_br`

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning("Location not found");
        }
        
    }
    
});

function showInfo(json) {
    showWarning("");

    
    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector(".ventoInfo").innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector(".temp img").setAttribute("src", `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector(".ventoPonto").style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector(".resultado").style.display = "block";
}

function showWarning(msg) {
    document.querySelector(".aviso").innerHTML = msg;
}

function clearInfo() {
    showWarning("");
    document.querySelector('.resultado').style.display='none';
}


const images = document.querySelectorAll('.background-image');
let currentImageIndex = 0;

function changeBackground() {
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add('active');
}

setInterval(changeBackground, 5000);
