window.linqs = window.linqs || {};
window.linqs.people = window.linqs.people || {};

// TODO (Alex): read json data from files instead of hard-coding it below.
// TODO (Alex): adjust formatting (longer-term goal)
// TODO (Alex): fix links

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
}


window.linqs.people.renderList = function(keys) {
  keys.forEach(function(key) {
    isAffiliate = key != 'lise';

    personList = `<div class='${isAffiliate ? "personList" : "liseInfo"}' id='${key}'></div>`;
    $('.people-list').append(personList);

    selector = `#${key}`;
    titleObj = window.linqs.people.roles[key];

    if (isAffiliate) {
      title = `<span class='groupTitle'> ${titleObj.title} </span>`;
      $(selector).append(title);
    }
    people = window.linqs.people.peopleInGroup(key);
    people.forEach(function(person) {
      person = window.linqs.people.people[person];
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
          ${person.website_url ? "<a href='" + person.website_url + "'>" + person.website_text + "</a>" : ""}
        </span>`;

      entry += '<br> <br>';
      entry += `${person.interests ? "<span class='researchInterests'> Research Interests: </span>" + person.interests : ""}`;
      entry += `${person.current_affiliation ? "<span class='currentAffiliation'> Current Affiliation: </span>" + person.current_affiliation : ""}`

      entry += '</div> </div>';
      $(selector).append(entry);
    });

  });
}