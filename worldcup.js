const {map, filter, throttleTime, debounceTime} = rxjs.operators;

const button = document.querySelector('button');
const subInput = document.querySelector('input');
const result = document.querySelector('#result');

var inputText;

document.getElementById("txt_team").addEventListener("keyup", function() {
  inputText =  document.getElementById('txt_team').value;}, false);

function renderList(jsonResult) {
var {from, of} = rxjs; 

var grp;
from(jsonResult).pipe(
    filter(g => (g.letter == inputText))
  ).subscribe(g => grp = g);
   console.log(`g.letter == ${inputText}`)
var arr = [];

of(grp).pipe(
  map(temp => temp.ordered_teams)
).subscribe(temp => arr = temp);

return `<table border="1"> <tr><th>Country</th><th>Played</th><th>Wins-Draws-Lost</th><th>Goals</th><th>Goal Difference</th><th>Points</th></tr>${arr.map( team => `
<tr><td>${team.country}</td><td> ${team.games_played}</td><td> ${team.wins} - ${team.draws} - ${team.losses}</td><td>${team.goals_for} - ${team.goals_against}</td> <td>${team.goal_differential}</td> <td>${team.points}</td></tr>`).join('')}</table>`;
  
}

async function fetchTeams() {
  const URL2 = "https://worldcup.sfg.io/teams/group_results";
  
  try {
    const fetchResult = fetch(URL2);
    const response = await fetchResult;
    if (response.ok) {
      const jsonData = await response.json();
      result.innerHTML = renderList(jsonData);
    } else {
      result.innerHTML = `Response.status: ${response.status}`;
    }
  } catch (e) {
    result.innerHTML = e;
  }
}

button.addEventListener('click', () => {
  fetchTeams();
});