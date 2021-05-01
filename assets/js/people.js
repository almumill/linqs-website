'use strict';

window.linqs = window.linqs || {};
window.linqs.people = window.linqs.people || {};
window.linqs.utils = window.linqs.utils || {};

window.linqs.people.ICON_MAP = {
        'none': 'none',
        'paper': 'file-text-line',
        'code': 'code-line',
        'link': 'link',
        'git': 'git-repository-line',
        'article': 'article-line',
        'mail': 'mail-line',
        'profile': 'profile-line',
        'braces': 'braces-line',
        'double-quotes': 'double-quotes-r',
};

window.linqs.people.ICON_REL_PATH = '/assets/style/vendor/remixicon.symbol.svg';

window.linqs.people.peopleInGroup = function (key) {
    let groupPeople = [];

    for (const person of Object.keys(window.linqs.people.people)) {
        if (window.linqs.people.people[person].group == key) {
            groupPeople.push(window.linqs.people.people[person]);
        }
    }

    // We sort the people in this group lexicographically
    groupPeople = groupPeople.sort(function(a, b) {
        a = a.name.substring(a.name.indexOf(" ") + 1);
        b = b.name.substring(b.name.indexOf(" ") + 1);

        if (a.toLowerCase() < b.toLowerCase()) {
            return -1;
        }
        if (a.toLowerCase() > b.toLowerCase()) {
            return 1;
        }

        return 0;
    });

    return groupPeople;
};

window.linqs.people.buildLink = function(linkEntry) {
    let iconName = window.linqs.people.ICON_MAP[linkEntry.icon];
    let iconLink = window.linqs.utils.makeLink(window.linqs.people.baseURL, `${window.linqs.people.ICON_REL_PATH}#${iconName}`);

    let icon = `
                    <svg class='svg-icon'>
                        <use xlink:href='${iconLink}'/>
                    </svg>
                `;

    return `
                <a class='personalLink' href='${linkEntry.url}'>
                    ${linkEntry.icon != "none" ? icon : ""}
                    ${linkEntry.text}
                </a>
            `;
}

window.linqs.people.renderList = function(keys) {
    keys.forEach(function(key) {
        // Check if the current role being processed is "advisor",
        // and assign the correct CSS class to the entries
        // being rendered. One class is for our advisor's information,
        // the other is for lists of people who are not our advisor.
        let isMember = key != 'advisor';
        let listClass = `${isMember ? "personList" : "advisorInfo"}`;

        let personList = `
            <div class='${listClass}' id='${key}'>
            </div>
        `;

        $('.people-list').append(personList);

        let selector = `#${key}`;
        let titles = window.linqs.people.roles[key];

        if (isMember) {
            let title = `
                <span class='groupTitle'>
                    ${titles.title}
                </span>
            `;
            $(selector).append(title);
        }

        let people = window.linqs.people.peopleInGroup(key);

        people.forEach(function(person) {
            // We identify the appropriate CSS classes for
            // this person.
            let entryClass = isMember ? "memberEntry" : "advisorEntry";
            let imageContainerClass = isMember ? "memberImageContainer" : "advisorImageContainer";
            let imageClass = isMember ? "memberImage" : "advisorImage";

            // We build different parts of this person's entry.
            let degreeText = person.degree ? ', ' + person.degree : "";
            let interestsRaw = person.interests ? person.interests : "";
            let currentAffiliationRaw = person.current_affiliation ? person.current_affiliation : "";

            // We create the spans for the text preceding research interests and
            // current affiliations. (pre-something?)
            let researchInterestsText = person.interests ? "<span class='researchInterests'>Research Interests:</span>" : "";
            let currentAffiliationText = person.current_affiliation ? "<span class='currentAffiliation'>Current Affiliation:</span>" : "";

            // We construct p elements containing research interests/current affiliations
            // outside of the main entry HTML below to avoid adding an empty p element
            // to the DOM if one of the fields isn't present.
            let researchInterests = person.interests ? `<p class='entrySection'>${researchInterestsText} ${interestsRaw}</p>` : "";
            let currentAffiliation = person.current_affiliation ? `<p class='entrySection'>${currentAffiliationText} ${currentAffiliationRaw}</p>` : "";

            // We build the personal link section
            let personalLinks = "";

            person.links.forEach(function(linkEntry) {
                personalLinks += window.linqs.people.buildLink(linkEntry);
            });

            let entry = `
                <div class='${entryClass}'>
                    <div class='${imageContainerClass}'>
                        <img src='../${person.picture}' class='${imageClass}'/>
                    </div>
                    <div class='personInfo'>
                        <p class='entrySection'>
                            <span class="personName">
                                ${person.name}
                            </span>
                            <span class="degreeInfo">
                                ${degreeText}
                            </span>
                        </p>
                        <p class="entrySection">
                            <p class="contactAndLinks">
                                ${person.email}
                            </p>
                            <p class="contactAndLinks">
                                ${person.location}
                            </p>
                            <p class="contactAndLinks">
                                ${personalLinks}
                            </p>
                        </p>
                        ${researchInterests}
                        ${currentAffiliation}
                    </div>
                </div>
            `;

            $(selector).append(entry);
        });

    });
};
