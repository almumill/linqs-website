window.linqs = window.linqs || {};
window.linqs.people = window.linqs.people || {};

// TODO (Alex): Handle Lise's image dimensions separately from everyone else.
// TODO (Alex): read json data from json files instead of hard-coding it below.


window.linqs.people.TITLES_MAP = {
  "lise": {omitTitle: true},
  "postdoc": {title: "Post Docs"},
  "phd": {title: "Ph.D. Students (In alphabetical order)"},
  "masters": {title: "Master's Students (In alphabetical order)"},
  "undergrad": {title: "Undergraduate Students (In alphabetical order)"},
  "alum": {title: "Alumni"},
  "visiting": {title: "Visiting Students"}
};

window.linqs.people.peoplejson = [
  {
    "name": "Alex Miller",
    "group": "undergrad",
    "email": "almumill AT ucsc.edu",
    "location": "Engineering 2, Room 483",
    "website": "almumill.github.io",
    "interests": "My research interests lie in the use of probabilistic graphical models. I'm specifically interested in applying them to problems in biomedical NLP and in using them to perform online collective inference.",
    "picture": "/assets/images/alexmiller.png"
  },
  {
    "name": "Alex Miller",
    "group": "undergrad",
    "email": "almumill AT ucsc.edu",
    "location": "Engineering 2, Room 483",
    "website": "almumill.github.io",
    "interests": "My research interests lie in the use of probabilistic graphical models. I'm specifically interested in applying them to problems in biomedical NLP and in using them to perform online collective inference.",
    "picture": "/assets/images/alexmiller.png"
  },
  {
    "name": "Rishika Singh",
    "group": "masters",
    "email": "rsingh52 AT ucsc.edu",
    "location": "Engineering 2, Room 483",
    "website": "rishikasb.github.io",
    "picture": "/assets/images/rishikasingh.png",
    "interests": "My research interests concern the issue of fairness in machine learning, specifically recommender systems. This can be extended to multi-stakeholder frameworks or involving complicated network effects.",
  },
  {
    "name": "Charles Dickens",
    "group": "phd",
    "email": "cadicken AT ucsc.edu",
    "location": "Engineering 2, Room 483",
    "website": "https://users.soe.ucsc.edu/~cadicken",
    "interests": "My research interests are generally in machine learning and graphical models. I am particularly interested in improving the scalability, performance, and robustnesses of structured prediction algorithms using modern ideas from optimization. I am excited to work on applications related to fair machine learning and online settings.",
    "picture": "/assets/images/charlesdickens.png"
  },
  {
    "name": "Rishika Singh",
    "group": "masters",
    "email": "rsingh52 AT ucsc.edu",
    "location": "Engineering 2, Room 483",
    "website": "rishikasb.github.io",
    "picture": "/assets/images/rishikasingh.png",
    "interests": "My research interests concern the issue of fairness in machine learning, specifically recommender systems. This can be extended to multi-stakeholder frameworks or involving complicated network effects.",
  },
];

window.linqs.people.people = function (key) {
  groupPeople = [];
  for (const person of window.linqs.people.peoplejson) {
    if (person.group == key) {
      groupPeople.push(person);
    }
  }
  return groupPeople;
}


window.linqs.people.renderList = function(keys) {

  keys.forEach(function(key) {
    personList = `<div class='personList' id='${key}'></div>`;
    $('.people-list').append(personList);

    selector = `#${key}`;
    titleObj = window.linqs.people.TITLES_MAP[key];

    if (!('omitTitle' in titleObj)) {
      title = `<span class='groupTitle'> ${titleObj.title} </span>`;
      $(selector).append(title);
    }

    people = window.linqs.people.people(key);
    people.forEach(function(person) {
      entry = `<div class='personEntry'>
        <div class='personImageContainer'>
          <img src='../${person.picture}' class='personImage'/>
        </div>
        <div class='personInfo'>
          <span class="personName">
            ${person.name}
          </span>`;

      entry += '<br> <br>';
      entry += `<span class="personLocation">
          ${person.email}
          <br>
          ${person.location}
          <br>
          ${person.website ? person.website : ""}
        </span>`;

      entry += '<br> <br>';
      entry += `<span class="researchInterests">
          Research Interests:
        </span>
        ${person.interests}`;

      entry += '</div> </div>';
      $(selector).append(entry);
    });

  });
}