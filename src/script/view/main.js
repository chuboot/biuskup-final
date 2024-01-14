// import styles bundle
import 'swiper/css/bundle';
import '../../styles/style.css';

// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

const swiper = new Swiper('.mySwiper', {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'progressbar',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const main = () => {
  // render slides
  const renderAllSlides = (slides) => {
    const wrapperSlide = document.querySelector('.swiper-wrapper');
    wrapperSlide.innerHTML = '';

    slides.forEach((sl) => {
      wrapperSlide.innerHTML += `
        <div class="swiper-slide">
                  <div class="item">
                    <img src="https://www.themoviedb.org/t/p/original/${sl.backdrop_path}" alt="slider-image" />
                    <div class="slide-text">
                        <h1>${sl.title}</h1>
                        <span><i class="fa-solid fa-fire"></i> ${sl.release_date}</span>
                    </div>
                  </div>
        </div>
      `;
    });
  };

  // render all casts
  const renderAllCast = (moviesCast) => {
    const listCast = document.createElement('div');
    listCast.innerHTML = '';
    moviesCast.forEach((cast) => {
      listCast.innerHTML += `
        <div class="card-cast">
          <div class="cast-img">
            <img src="https://www.themoviedb.org/t/p/original/${cast.profile_path}" alt="" />
          </div>  
          <h5>${cast.name}</h5>
        </div>
      `;
    });
    listCast.classList.add('row-cast');
    document.querySelector('.caption').appendChild(listCast);
  };

  // render all trailers
  const renderAllTrailer = (moviesTrailer) => {
    const listTrailer = document.createElement('div');
    listTrailer.innerHTML = '';
    moviesTrailer.forEach((trailer, index) => {
      listTrailer.innerHTML += `
        <h2>Official Trailer #${index + 1}</h2>
        <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/${trailer.key}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
        ></iframe>
      `;
    });
    listTrailer.classList.add('trailer');
    document.querySelector('section .container').appendChild(listTrailer);
  };
  // top function
  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const getCast = async (movidcast) => {
    await fetch(`https://api.themoviedb.org/3/movie/${movidcast}/credits?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US`)
      .then((response) => response.json())
      .then((rescast) => {
        const moviesCast = rescast.cast.slice(0, 4);
        renderAllCast(moviesCast);
      });
  };

  const getTrailer = async (movivid) => {
    await fetch(`https://api.themoviedb.org/3/movie/${movivid}/videos?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US`)
      .then((response) => response.json())
      .then((resvid) => {
        const moviesTrailer = resvid.results.slice(0, 2);
        renderAllTrailer(moviesTrailer);
      });
  };

  const showMovieDetail = (resmovie) => `
    <div class="backdrop">
      <img src="https://www.themoviedb.org/t/p/original/${resmovie.backdrop_path}" alt="${resmovie.title}" />
    </div>
    <div class="container">
      <ul class="breadcrumb">
        <li><a href="/">Home</a></li>
        <li>${resmovie.title}</li>
      </ul>
      <div class="hero">
        <div class="card-img">
          <img src="https://www.themoviedb.org/t/p/original/${resmovie.poster_path}" alt="${resmovie.title}" />
        </div>
        <div class="caption">
        <h2>${resmovie.title}</h2>
        <h5 class="caption-year">${resmovie.release_date.slice(0, 4)}</h5>
        <div>${resmovie.genres.map((genre) => `<span>${genre.name}</span>`).join(' - ')}</div>
        <p>${resmovie.overview}</p>
        <h4>Cast:</h4>
        </div>
      </div>
    </div>  
    `;

  // reander all movies
  const renderAllMovies = (movies) => {
    const listMovieElement = document.querySelector('.movie-list');
    listMovieElement.innerHTML = '';
    movies.forEach((movie) => {
      listMovieElement.innerHTML += `
        <div class="card-movie">
          <div class="card-movie-img">
            <img src="https://www.themoviedb.org/t/p/original/${movie.poster_path}" alt="${movie.title}" data-id="${movie.id}" />
          </div>
          <h5 class="movie-title">${movie.title}</h5>
        </div>
      `;
    });
    const detailMovie = document.querySelectorAll('.card-movie-img img');
    detailMovie.forEach((img) => {
      img.addEventListener('click', async (event) => {
        const movieID = event.target.dataset.id;
        topFunction();
        // console.log(movieID);
        await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US`)
          .then((response) => response.json())
          .then((resmovie) => {
            const secMovie = document.querySelector('section');
            const detailsMovies = showMovieDetail(resmovie);
            secMovie.innerHTML = detailsMovies;
          });
        getCast(movieID);
        getTrailer(movieID);
      });
    });
  };

  const getCards = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US&page=1');

    const responseJson = await response.json();
    const movies = responseJson.results;
    renderAllMovies(movies);
  };

  const getSlides = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US&page=1');

    const resJson = await response.json();
    const slides = resJson.results.slice(0, 4);
    renderAllSlides(slides);
  };

  getSlides();
  getCards();

  // change bg when scroll

  const navbar = document.querySelector('header');

  window.addEventListener('scroll', () => {
    const valueScroll = window.scrollY;
    if (valueScroll < 70) {
      navbar.classList.remove('bg-nav-color');
    } else {
      navbar.classList.add('bg-nav-color');
    }
  });
};

export default main;
