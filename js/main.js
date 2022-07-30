let elForm = document.querySelector(".form");
let elInput = document.querySelector(".raiting");
let movieArr = movies.slice(0,15);

function normolize(array) {
  let newArray = [];
  array.forEach((item) => {
    let newObject = {};

    newObject.title = item.Title.toString();
    newObject.videoUrl = `https://www.youtube.com/watch?v=${item.ytid}`;
    newObject.categories = item.Categories.split("|");
    newObject.movieYear = item.movie_year;
    newObject.imdbRating = item.imdb_rating;
    newObject.img = `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;
    newArray.push(newObject);
  });

  return newArray;
}

let elMovieList = document.querySelector("#movielist");
let elTemplate = document.querySelector("#card").content;

let newArray = normolize(movieArr);

function render(array, movielist) {
  movielist.innerHTML = null;
  let tempFragment = document.createDocumentFragment();

  for (const item of array) {
    let templateItem = elTemplate.cloneNode(true);
    templateItem.querySelector(".img-movie").src = item.img;
    templateItem.querySelector(".title-movie").textContent = item.title;
    templateItem.querySelector(".year-movie").textContent = item.movieYear;
    templateItem.querySelector(".raiting-movie").textContent = item.imdbRating;
    templateItem.querySelector(".trailer-movie").href = item.videoUrl;

    tempFragment.appendChild(templateItem);
  }
  movielist.appendChild(tempFragment);
}
render(newArray, elMovieList);

elForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let elInputValue = Number(document.querySelector(".raiting").value.trim())

  let inputArr = [];

  for (let i = 0; i < newArray.length; i++) {

    if (elInputValue <= newArray[i].imdbRating) {
      inputArr.push(newArray[i]);

    }
  }

  render(inputArr, elMovieList);
  
});
