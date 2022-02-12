function weatherApi() {
    if (document.getElementById("city").value.trim() === '') return alert("You need to type a valid city")
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById("city").value.trim()}&appid=3631ea3e0572043809e59fbb8b3a2ad8&units=metric`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert("You need to type a valid city")
        }
    })
    .then(data => { // job done
        console.log(data);
        const clock = formatTime(getTime(data.timezone));
        const city = data.name;
        const temp = data.main.temp;
        const weather = data.weather[0].main;

        document.getElementById("city").value = '';

        document.getElementById("info").innerHTML = `
            <div class="card">
                <div class="city">${city}</div>
                <div>
                    <div class="weather">${weather}</div>
                    <div class="temp">${temp}°C</div>
                </div>
                <div class="clock">${clock}</div>
            </div>
        `;

        document.getElementById("info").style.display = "flex";
        document.getElementById("info").style.height = "9999px";
        document.getElementById("searchCity").style.height = "9999px";
    });
}

function getTime(gmtOffset) {
    gmtOffset = gmtOffset / 3600;
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*gmtOffset));
    return nd;
};

function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var strTime = `${hours}:${minutes}`;
    return strTime;
};
