"use strict"

let weather;
const hover = document.querySelectorAll('.day')
const btn1 = document.querySelector('.day:nth-child(1)')
const btn2 = document.querySelector('.day:nth-child(2)')
const btn3 = document.querySelector('.day:nth-child(3)')
const btn4 = document.querySelector('.day:nth-child(4)')
const btn5 = document.querySelector('.day:nth-child(5)')
const btn6 = document.querySelector('.day:nth-child(6)')
const btn7 = document.querySelector('.day:nth-child(7)')
const text = document.querySelectorAll('.day p:last-child')
const search = document.querySelector('.search')
search.value = "Kaunas";
let citysearch;
const name = document.querySelector('#name')
const administracija = document.querySelector('#administracija')
let celc = document.querySelectorAll('.celc')
let diena = document.querySelectorAll('.diena')

var currentdate = new Date();

citysearch = search.addEventListener('input', searchas)

let searchvalue = "kaunas"

const fetchWeather = async () => {
    weather = await fetch (
        "https://api.meteo.lt/v1/places/"+searchvalue+"/forecasts/long-term"
    ).then(res => res.json());
}



var weekday;
function orai() {
    const showWeather = async () => {
        await fetchWeather();
        name.textContent = (weather.place.name)
        administracija.textContent = (weather.place.administrativeDivision)


        let kiek = 0;
        let visoDienos = [];
        let dienTemp1 = [], dienTemp2 = [], dienTemp3 = [], dienTemp4 = [], dienTemp5 = [], dienTemp6 = [], dienTemp7 = []
        let icon1 = [], icon2 = [], icon3 = [], icon4 = [], icon5 = [], icon6 = [], icon7 = []
        let hour1 = [], hour2 = [], hour3 = [], hour4 = [], hour5 = [], hour6 = [], hour7 = []
        let rain1 = [], rain2 = [], rain3 = [], rain4 = [], rain5 = [], rain6 = [], rain7 = []


            function data(date, kiekis, tempD, icon, hour, rain) {
            let laikinas = weather.forecastTimestamps[kiekis].forecastTimeUtc.substring(0, 10);
            date.push(laikinas);
            for (let i = 0; i < weather.forecastTimestamps.length; i++) {
                if (laikinas == weather.forecastTimestamps[i].forecastTimeUtc.substring(0, 10)) {
                    kiek++;
                    tempD.push(weather.forecastTimestamps[i].airTemperature);
                    icon.push(weather.forecastTimestamps[i].conditionCode);
                    hour.push(weather.forecastTimestamps[i].forecastTimeUtc.substring(11, 13))
                    rain.push(weather.forecastTimestamps[i].cloudCover)
                }
            }
        }
        data(visoDienos, kiek, dienTemp1, icon1, hour1, rain1)
        data(visoDienos, kiek, dienTemp2, icon2, hour2, rain2)
        data(visoDienos, kiek, dienTemp3, icon3, hour3, rain3)
        data(visoDienos, kiek, dienTemp4, icon4, hour4, rain4)
        data(visoDienos, kiek, dienTemp5, icon5, hour5, rain5)
        data(visoDienos, kiek, dienTemp6, icon6, hour6, rain6)
        data(visoDienos, kiek, dienTemp7, icon7, hour7, rain7)

        let tempArr = [dienTemp1,dienTemp2,dienTemp3,dienTemp4,dienTemp5,dienTemp6,dienTemp7]
        var iconArr = [icon1,icon2,icon3,icon4,icon5,icon6,icon7]

        weekday = ["Sekm","Pirm","Antr","Treč","Ketv","Penkt","Šešt"]

        function weekdays() {
            let arrayIndex = currentdate.getDay()-1;
            for (let i = 0; i < diena.length; i++) {
                if (arrayIndex < 6) {
                    arrayIndex++
                } else {
                    arrayIndex = 0
                }

                diena[i].innerHTML = weekday[arrayIndex]+" "+visoDienos[i].substring(8,10)
                 celc[i].innerHTML = tempArr[i][0]+"°C"

            }
            let icona = document.querySelectorAll('.day i')
            let text = document.querySelectorAll('.text')
            for(let j=0; j < icona.length; j++) {
                if(iconArr[j][0] == "clear") {
                    icona[j].classList.add("fas", "fa-sun")
                    text[j].textContent = ("Giedra")
                }
                else if (iconArr[j][0] == "isolated-clouds") {
                    icona[j].classList.add("fas", "fa-cloud")
                    text[j].textContent = ("Mažai debesuota")
                }
                else if (iconArr[j][0] == "scattered-clouds") {
                    icona[j].classList.add("fas", "fa-cloud-sun-rain")
                    text[j].textContent = ("Debesuota su pragiedruliais")
                }
                else if (iconArr[j][0] == "overcast") {
                    icona[j].classList.add("fas", "fa-cloud")
                    text[j].textContent = ("Debesuota")
                }
                else if (iconArr[j][0] == "light-rain") {
                    icona[j].classList.add("fas", "fa-cloud-rain")
                    text[j].textContent = ("Nedidelis lietus")
                }
                else if (iconArr[j][0] == "moderate-rain") {
                    icona[j].classList.add("fas", "fa-cloud-showers-heavy")
                    text[j].textContent = ("Lietus")
                }
                else if (iconArr[j][0] == "heavy-rain") {
                    icona[j].classList.add("fas", "fa-cloud-showers-heavy")
                    text[j].textContent = ("Smarkus lietus")
                }
                else if (iconArr[j][0] == "sleet") {
                    icona[j].classList.add("fas", "fa-cloud-meatball")
                    text[j].textContent = ("Šlapdriba")
                }
                else if (iconArr[j][0] == "light-snow") {
                    icona[j].classList.add("far", "fa-snowflake")
                    text[j].textContent = ("Nedidelis sniegas")
                }
                else if (iconArr[j][0] == "moderate-snow") {
                    icona[j].classList.add("far", "fa-snowflake")
                    text[j].textContent = ("Sniegas")
                }
                else if (iconArr[j][0] == "heavy-snow") {
                    icona[j].classList.add("fas", "fa-snowflake")
                    text[j].textContent = ("Smarkus sniegas")
                }
                else if (iconArr[j][0] == "fog") {
                    icona[j].classList.add("fas", "fa-smog")
                    text[j].textContent = ("Rūkas")
                }
                else if (iconArr[j][0] == "na") {
                    icona[j].textContent = "NA"
                }

                    }

            console.log(weather)

        }

        weekdays()

        let valanduDivai = document.querySelectorAll(".hours p:first-child")
        let hoursi = document.querySelectorAll('.hours #valandosicona')
        let dabardiena = currentdate.getDate()



            function valandoskasvalanda(hour) {
                for (let j=0; j<hour.length; j++) {
                valanduDivai[j].textContent = (hour[j] + " 00")
                }
            }
            function weatherIcons(icon) {
                for (let j = 0; j < icon.length; j++) {
                    if (weather.forecastTimestamps[j].conditionCode == "clear") {
                        if (weather.forecastTimestamps[j].forecastTimeUtc.substring(11, 13) >= 21) {
                            hoursi[j].classList.add("fas", "fa-moon")
                        } else if (weather.forecastTimestamps[j].forecastTimeUtc.substring(11, 13) >= 5) {
                            hoursi[j].classList.add("fas", "fa-sun")
                        } else if (weather.forecastTimestamps[j].forecastTimeUtc.substring(11, 13) >= 0) {
                            hoursi[j].classList.add("fas", "fa-moon")
                        }
                    }
                    else if (icon[j] == "isolated-clouds") {
                        hoursi[j].classList.add("fas", "fa-cloud")
                    }
                    else if (icon[j] == "scattered-clouds") {
                        hoursi[j].classList.add("fas", "fa-cloud-sun-rain")
                    }
                    else if (icon[j] == "overcast") {
                        hoursi[j].classList.add("fas", "fa-cloud")
                    }
                    else if (icon[j] == "light-rain") {
                        hoursi[j].classList.add("fas", "fa-cloud-rain")
                    }
                    else if (icon[j] == "moderate-rain") {
                        hoursi[j].classList.add("fas", "fa-cloud-showers-heavy")
                    }
                    else if (icon[j] == "heavy-rain") {
                        hoursi[j].classList.add("fas", "fa-cloud-showers-heavy")
                    }
                    else if (icon[j] == "sleet") {
                        hoursi[j].classList.add("fas", "fa-cloud-meatball")
                    }
                    else if (icon[j] == "light-snow") {
                        hoursi[j].classList.add("far", "fa-snowflake")
                    }
                    else if (icon[j] == "moderate-snow") {
                        hoursi[j].classList.add("far", "fa-snowflake")
                    }
                    else if (icon[j] == "heavy-snow") {
                        hoursi[j].classList.add("fas", "fa-snowflake")
                    }
                    else if (icon[j] == "fog") {
                        hoursi[j].classList.add("fas", "fa-smog")
                    }
                    else if (icon[j] == "na") {
                        hoursi[j].textContent = "NA"
                    }
                }
            }

        function rainPr(rainArr) {
            let rain = document.querySelectorAll('.rain')
            for(let i=0; i < rainArr.length; i++) {
                rain[i].textContent = (rainArr[i]+" %")
            }
        }

        function setrise() {
            for (let i = 0; i < hoursi.length; i++) {
                let valandaIconai = parseFloat(weather.forecastTimestamps[i].forecastTimeUtc.substring(11,13))
                let laik = 100;
                hoursi[i].style.marginTop = laik+"px";
                if (valandaIconai >= 8 || valandaIconai <= 19) {
                    hoursi[i].style.marginTop = laik+"px";
                    laik = laik - 10;
                }
                else if (valandaIconai >= 19 || valandaIconai <= 8) {
                    hoursi[i].style.marginTop = laik+"px";
                    laik = laik + 10;
                }
            }
        }

            function hours(){
                    let last = document.querySelector('#lastupdated')
                    let updatedDiena;
                    for (let i=0; i<weather.forecastTimestamps.length; i++)
                        if (weather.forecastCreationTimeUtc.substring(8,10) == dabardiena) {
                            updatedDiena = "Šiandien"
                        }
                        else if (weather.forecastCreationTimeUtc.substring(8,10) == (dabardiena-1)) {
                            updatedDiena = "Vakar"
                        }
                    last.textContent = updatedDiena + weather.forecastCreationTimeUtc.substring(10,16)
            }


const hourdivas = document.querySelectorAll('.hours')

        function removeIcon() {
            for (let i = 0; i < hourdivas.length; i++) {
                hoursi[i].classList.remove("fas","far", "fa-moon", "fa-sun", "fa-cloud", "fa-cloud-sun-rain", "fa-cloud-rain", "fa-cloud-showers-heavy", "fa-cloud-meatball", "fa-snowflake", "fa-smog")
            }
        }

        function click(hour, btn, icon, rain) {
            console.log(hour1)
            for (let i = 0; i < hour.length; i++) {
                btn.onclick = function (e) {
                    hours()
                    valandoskasvalanda(hour)
                    weatherIcons(icon)
                    rainPr(rain)
                    setrise()
                    hourdivas[i].style.display = "inline-block"
                }
            }
        }
        click(hour1, btn1, icon1, rain1)
        click(hour2, btn2, icon2, rain2)
        click(hour3, btn3, icon3, rain3)
        click(hour4, btn4, icon4, rain4)
        click(hour5, btn5, icon5, rain5)
        click(hour6, btn6, icon6, rain6)
        click(hour7, btn7, icon7, rain7)

        function fulldate(){
            let valanda = currentdate.getHours(); let minute = currentdate.getMinutes(); let metai = currentdate.getFullYear(); let menesis = currentdate.getMonth();
            let dabartinesValandos = document.querySelector('header #time')
            let pilnaData = document.querySelector('header #date')
            dabartinesValandos.textContent = valanda + ":" + minute
            pilnaData.textContent = metai + "/" + menesis + "/" + dabardiena
        }
        fulldate()

    }
    function dayhover() {
        for (let i = 0; i < hover.length; i++) {
            hover[i].style.borderBottom = '3px solid #ed0c31'
            hover[i].onmouseover = function (e) {
                hover[i].classList.remove('col')
                hover[i].classList.add('col-3')
                text[i].style.display = 'block'
                hover[i].style.marginTop = '20px'
                hover[i].style.height = '100px'
                hover[i].style.transition = '0.1s'
                hover[i].style.borderBottom = 'none'
                hover[i].style.borderTop = '3px solid #ed0c31'
                diena[i].style.padding = '10px 0 0 0'
                diena[i].style.fontSize = '20px'

            }
            hover[i].onmouseout = function (e) {
                hover[i].classList.remove('col-3')
                hover[i].classList.add('col')
                text[i].style.display = 'none'
                hover[i].style.marginTop = '60px'
                hover[i].style.height = '60px'
                hover[i].style.borderTop = 'none'
                hover[i].style.borderBottom = '3px solid #ed0c31'
                diena[i].style.padding = '0'
                diena[i].style.fontSize = '12px'
            }
        }

    }


    dayhover()
    showWeather()
}

function searchas() {
    searchvalue = search.value
    orai()
}


orai()
searchas()





