// Initialize button with user's preferred color
let generateButton = document.getElementById("generate");

// When the button is clicked, inject setPageBackgroundColor into current page
generateButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: copyToClipboard,
  });
});


function copyToClipboard() {

  const keyValues = () => {
    return [...document.querySelectorAll('.thumbnail-company')].slice(0, -1).filter(item => item.closest('.thumbnail').style.display !== 'none').reduce((csv, company) => csv.concat(company.innerText, '\n'), '');
  }

  const wealthFront = () => {
    return [... document.getElementsByClassName('company_name')].map(div => div.innerText).join('\n');
  }

  const techJobsForGood = () => {
    return [...document.querySelectorAll('.company_name')].map((name) => name.innerText).join('\n');
  }

  const fourDayWorkWeek = () => {
    return [...document.querySelectorAll('.company-tile-title')].reduce((output, company) => output.concat(company.innerText.slice(company.innerText.indexOf('\n') + 1), '\n'), '');
  }

  const hiringWithoutWhiteboards = () => {
    return [].concat(...[...document.getElementById('readme').querySelectorAll('ul')].slice(3, 12).map(list => [...list.querySelectorAll('a')].map(item => item.innerText))).join('\n');
  }

  const linkedIn = () => {
    return [...new Set([...document.querySelectorAll('.job-card-container__company-name')].slice(4).map(nameDiv => nameDiv.innerText)).values()].join('\n');
  }

  const glassDoor = () => {
    return [...document.querySelectorAll('h2')].slice(1).reduce((csv, company) => csv.concat(company.innerText, '\n'), '');
  }


  try {

    let generatedList = [];

    if (location.href.includes('keyvalues.com')) {
      generatedList = keyValues();
    }
    if (location.href.includes('wealthfront.com')) {
      generatedList = wealthFront();
    }
    if (location.href.includes('techjobsforgood.com')) {
      generatedList = techJobsForGood();
    }
    if (location.href.includes('4dayweek.io')) {
      generatedList = fourDayWorkWeek();
    }
    if (location.href.includes('poteto/hiring-without-whiteboards')) {
      generatedList = hiringWithoutWhiteboards();
    }
    if (location.href.includes('linkedin.com')) {
      generatedList = linkedIn();
    }
    if (location.href.includes('glassdoor.com')) {
      generatedList = glassDoor();
    }


    console.log(generatedList);
    generatedList.length && navigator.clipboard.writeText(generatedList);
    alert((generatedList.length) ? 'Click OK to copy your list to the clipboard!' : 'Error: Are you visiting an approved web page?\nVisit our GitHub repo for more information.');
    generatedList = [];
    console.log('List should have been copied to clipboard... Did it work?');

  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}
