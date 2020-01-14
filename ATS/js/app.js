"use strict";


const input = document.querySelector('.text');
const search = document.querySelector('button');
const name = document.querySelector('#name');
const about = document.querySelector('#about');
const rate = document.querySelector('#rating');
const length = document.querySelector('#length');
const maker = document.querySelector('#maker');
const forma = document.querySelector('form');
const alertas = document.querySelector('.alert');
const result = document.querySelector(".table");


let filmas;

search.addEventListener('click', film);
function film(){
    const fetchMovieData = async () => {
        filmas = await fetch(
            "https://www.omdbapi.com/?apikey=e4db3ced&t="+input.value+""
        ).then(res => res.json());
    }

    const MovieData = async () => {
        await fetchMovieData();
        if (filmas.Error === "Something went wrong.") {
            alertas.style.display = "block";
            result.style.display = "none";
        }
        else if (filmas.Error === "Movie not found!") {
            alertas.style.display = "block";
            result.style.display = "none";
        }
        else {
            name.textContent = (filmas.Title);
            about.textContent = (filmas.Plot);
            rate.textContent = (filmas.imdbRating);
            length.textContent = (filmas.Runtime);
            maker.textContent = (filmas.Writer);
            console.log(filmas);
            result.style.display = "block";
            alertas.style.display = "none";
        }



    }
    MovieData();

    forma.onsubmit = function(e){
        if(input.value !== ''){
            alertas.style.display = "block";
            result.style.display = "none";
        }
    }

}