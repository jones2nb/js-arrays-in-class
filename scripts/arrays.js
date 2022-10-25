// // 1. instead of creating the cards manually, we should use array functions to convert the data into cards
// const courseToCard = (item) => {
//     const courseTemplate =
//         `<div class="col">
//                         <div class="card" style="width: 18rem;">
//                             <h3 class="card-header">${item.title}</h3>
//                             <div class="card-body">
//                                 <h5 class="card-title>${item.prefix} ${item.number}</h5>
//                                 <h6 class="card-subtitle mb-2 text-muted>${item.prefix} ${item.number}</h6>
//                                 <p class="card-text">${item.desc}</p>
//                                 <a href="${item.url}">Card link</a>
//                                 <a href="${item.url}">Another link</a>
//                             </div>
//                             <div class="card-footer">${item.credits}</div>
//                         </div>
//                     </div>`;
//     return courseTemplate;

// }

// const courseCards = data.items.map((courseToCard));
// //courseCards.forEach((c) => document.write(c));

// document.write(courseCards.join(' '));

// // 2. maybe we only show those that match the search query?
// const filterCourseCard = (markup, query) => {
//     return markup.toLowerCase().includes(query.toLowerCase());
// }

// const searchButton = document.getElementById("search-button");
// searchButton.addEventListener("click", (ev) => {
//     ev.preventDefault();
//     console.log("query text");
//     const searchField = document.querySelector('input[name="query-text"]');
//     queryText = searchField.value;
//     console.log(queryText);
//     const filterCourseCards = courseCards.filter((card) =>
//         filterCourseCard(card, queryText)
//     );
//     filterCourseCards.forEach((card) => {
//         document.write(card);
//     })
// });




// // 3. we update the result count and related summary info as we filter

//console.log(data);
// 1. instead of creating the cards manually, we should use array functions to convert the data into cards

const courseToCard = ({
  prefix,
  number,
  title,
  url,
  desc,
  prereqs,
  credits,
}) => {
  const prereqLinks = prereqs
    .map((prereq) => `<a href="#" class="card-link">${prereq}</a>`)
    .join();
  const courseTemplate = `<div class="col">
            <div class="card" style="width: 18rem;">
              <h3 class="card-header"><a href="${url}">${title}</a></h3>
              <div class="card-body">
                <h5 class="card-title">${prefix} ${number}</h5>
                <p class="card-text">${desc}</p>
                ${prereqLinks}
                 
                <div class="card-footer text-muted credits">
                  ${credits}
                </div>
              </div>
            </div>
          </div>`;
  return courseTemplate;
};
const resultsContainer = document.querySelector("#filtered-results");
const courseCards = data.items.map(courseToCard);
resultsContainer.innerHTML = courseCards.join("");
// courseCards.forEach((c) => document.write(c));

// console.log(courseCards);
// document.write(courseCards.join(''))

// 2. maybe we only show those that match the search query?
//

const filterCourseCard = (markup, query) => {
  //console.log(markup, query);
  return markup.toLowerCase().includes(query.toLowerCase());
};

const costContainer = document.querySelector("#cost");
const searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", (ev) => {
  //console.log(ev);
  ev.preventDefault();
  // ev.stopPropagation();
  //console.log("query text");
  const searchField = document.querySelector('input[name="query-text"]');
  const queryText = searchField.value;
  let filterCourseCards = filteredCourseCards = courseCards.filter((card) =>
    filterCourseCard(card, queryText)
  );
  //console.log(queryText);
  //console.log('filteredCourseCards', filteredCourseCards);
  resultsContainer.innerHTML = filteredCourseCards.join("");
  updateCount();
});

// 3. we update the result count and related summary info as we filter
function updateCount() {

  const creditContainer = document.querySelectorAll(".credits");
  const costContainer = document.querySelector("#cost");
  var count = 0
  creditContainer.forEach((e) => count += Number(e.innerHTML))

  costContainer.innerHTML = `<dt>Count</dt>
                            <dd><span>${creditContainer.length}</span> items</dd>
                            <dt>Cost</dt>
                            <dd><span>${count}</span> credit-hours + <span>6</span> credit-hours of prereqs</dd>`;
  console.log(count);

  // const count = document.getElementById("result-count");
  // const countValue = filteredCourseCards.length;
  // count.innerHTML = `<dt>Count</dt><dd><span>${cost}</span> items</dd>`;
}
// filter on structured data, put filtered data into template
// add class to useful data, query dom for data, 
updateCount();
