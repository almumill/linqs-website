window.linqs = window.linqs || {};
window.linqs.people = window.linqs.people || {};

// TODO (Alex): read json data from files instead of hard-coding it below.
// TODO (Alex): adjust formatting (longer-term goal)
// TODO (Alex): fix links

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
    "name": "Lise Getoor",
    "degree": "Ph.D. Degree 2001, Stanford University",
    "group": "lise",
    "email": "getoor AT soe.ucsc.edu",
    "location": "Engineering 2, Room 341B",
    "website": "getoor.soe.ucsc.edu",
    "picture": "/assets/images/lisegetoor.jpg",
    "interests": "My general research interests are in machine learning, reasoning under uncertainty, databases and artificial intelligence. Other topics of interest to me include: data integration, database query optimization and approximate query processing, entity resolution, information extraction, utility elicitation, planning under uncertainty, contraint-based reasoning, abstraction and problem reformulation. The theme of my research is building and using statistical models of structured, semi-structured and unstructured data to do useful things.",
  }
];

window.linqs.people.peopleInGroup = function (key) {
  groupPeople = [];
  for (const person of window.linqs.people.peoplejson) {
    if (person.group == key) {
      groupPeople.push(person);
    }
  }
  // sort alphabetically by last name
  groupPeople = groupPeople.sort(function(a, b) {
    a = a.name.substring(a.name.indexOf(" ")+1);
    b = b.name.substring(b.name.indexOf(" ")+1);
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    if (a.toLowerCase() > b.toLowerCase()) return 1;
    return 0;
  });
  return groupPeople;
}


window.linqs.people.renderList = function(keys) {
  keys.forEach(function(key) {
    isAffiliate = key != 'lise';

    personList = `<div class='${isAffiliate ? "personList" : "liseInfo"}' id='${key}'></div>`;
    $('.people-list').append(personList);

    selector = `#${key}`;
    titleObj = window.linqs.people.TITLES_MAP[key];

    if (isAffiliate) {
      title = `<span class='groupTitle'> ${titleObj.title} </span>`;
      $(selector).append(title);
    }
    people = window.linqs.people.peopleInGroup(key);
    people.forEach(function(person) {
      entry = `<div class='${isAffiliate ? "affiliateEntry" : "liseEntry"}'>
        <div class='${isAffiliate ? "affiliateImageContainer" : "liseImageContainer"}'>
          <img src='../${person.picture}' class='${isAffiliate ? "affiliateImage" : "liseImage"}'/>
        </div>
        <div class='personInfo'>
          <span class="personName">
            ${person.name}
          </span><span class="degreeInfo">${person.degree ? ', ' + person.degree : ''}</span>`;

      entry += '<br> <br>';
      entry += `<span class="personLocation">
          ${person.email}
          <br>
          ${person.location}
          <br>
          ${person.website ? "<a href='" + person.website + "'>" + person.website + "</a>" : ""}
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