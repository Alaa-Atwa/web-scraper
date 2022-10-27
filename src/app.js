const feedDisplay = document.querySelector('#feed');

fetch('http://localhost:8000/results')
  .then((response) => response.json())
  .then((data) => {
    let count = 1;
    data.forEach((article) => {
      const articleItem = `<div> <h3> ${count}. HeadLine => ${article.title} </h3>  <p style='color:green' > ${article.url} </p> </div>`;
      feedDisplay.insertAdjacentHTML('beforeend', articleItem);
      count++;
    });
  })
  .catch((err) => console.log(err));

