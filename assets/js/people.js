window.linqs = window.linqs || {};
window.linqs.people = window.linqs.people || {};
window.linqs.utils = window.linqs.utils || {};

window.linqs.people.ICON_MAP = {
    'paper': 'file-text-line',
    'poster': 'image-line',
    'slides': 'slideshow-line',
    'code': 'code-line',
    'link': 'link',
    'video': 'video',
};
window.linqs.people.ICON_REL_PATH = '/assets/style/vendor/remixicon.symbol.svg';

window.linqs.people.peopleInGroup = function (key) {
  groupPeople = [];
  console.log(window.linqs.people.people);
  for (const person of Object.keys(window.linqs.people.people)) {
    if (window.linqs.people.people[person].group == key) {
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
};


window.linqs.people.renderList = function(keys) {
  keys.forEach(function(key) {
    isAffiliate = key != 'lise';

    personList = `<div class='${isAffiliate ? "personList" : "liseInfo"}' id='${key}'></div>`;
    $('.people-list').append(personList);

    selector = `#${key}`;
    titles = window.linqs.people.roles[key];

    if (isAffiliate) {
      title = `<span class='groupTitle'> ${titles.title} </span>`;
      $(selector).append(title);
    }
    people = window.linqs.people.peopleInGroup(key);
    people.forEach(function(person) {
      person = window.linqs.people.people[person];
      personLinks = "";
      console.log(person.links);
      for (linkObj in person.links) {
        console.log(person.links[linkObj]);
        icon = window.linqs.people.ICON_MAP[person.links[linkObj].icon];
        iconLink = window.linqs.utils.makeLink(window.linqs.people.baseURL, `${window.linqs.people.ICON_REL_PATH}#${icon}`);
        personLinks += `<a href='${person.links[linkObj].url}'>`;
        personLinks += `<svg class='svg-icon'>
          <use xlink:href='${iconLink}'/>
        </svg>`;
        personLinks += `${person.links[linkObj].text}`;
        personLinks += '</a>';
      }

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
          ${person.location ? person.location + "<br>" : ""}
          ${personLinks}
        </span>`;

      entry += '<br> <br>';
      entry += `${person.interests ? "<span class='researchInterests'> Research Interests: </span>" + person.interests : ""}`;
      entry += `${person.current_affiliation ? "<span class='currentAffiliation'> Current Affiliation: </span>" + person.current_affiliation : ""}`

      entry += '</div> </div>';
      $(selector).append(entry);
    });

  });
};
