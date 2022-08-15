let months = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'Aug', 9: 'Sept', 10: 'Oct', 11: "Nov", 12: 'Dec' };

function createCalendar(elem, year, month, date) {
    let mon = month - 1; // months in JS are 0..11, not 1..12
    let table = '<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>';
    let d = new Date(year, mon);
    // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }
    // <td> with actual dates
    while (d.getMonth() == mon) {
        table += '<td>' + d.getDate() + '</td>';
        if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
            table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
    }
    // add spaces after last days of month for the last row
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }
    // close the table
    table += '</tr></table>';
    elem.innerHTML = table;
    document.getElementById("monyear").innerText = "" + months[month] + " " + year;
    document.querySelectorAll('td').forEach((element) => {
        if (element.innerText.includes(date)) {
            element.classList.add('today');
        }
    })
}
function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
    let day = date.getDay();
    if (day == 0) day = 7; // make Sunday (0) the last day
    return day - 1;
}

let calendar = document.getElementById('calendar');

let date = new Date();
let todaydate = date.getDate();
let mon = date.getMonth() + 1;
let year = date.getFullYear();
createCalendar(calendar, year, mon, todaydate);

let next = document.getElementById('next');
let back = document.getElementById('back');
back.addEventListener('click', () => {
    if (mon == 0) {
        mon = 12;
        year--;
    }
    createCalendar(calendar, year, mon--, todaydate);
})

next.addEventListener('click', () => {
    if (mon == 12) {
        mon = 0;
        year++;
    }
    createCalendar(calendar, year, ++mon, todaydate);
})

let progressBar = document.querySelectorAll(".circular-progress");
let valueContainer = document.querySelectorAll(".value-container");

let progressValue = 0;
let speed = 50;

let progress1 = setInterval(() => {
    fill(0, 45, progress1)
}, 50)
let progress2 = setInterval(() => {
    fill(1, 65, progress2)
}, 50)
let progress3 = setInterval(() => {
    fill(2, 30, progress3)
}, 50)

function fill(index, progressEndValue, progress) {
    progressValue++;
    console.log(progressValue, progressEndValue);
    valueContainer[index].textContent = `${progressValue}%`;
    progressBar[index].style.background = `conic-gradient(
        #4d5bf9 ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg
    )`;
    if (progressValue == progressEndValue) {
        clearInterval(progress);
    }
};

document.getElementById('searchicon').onclick = ()=>{
    document.getElementById('inpsearch').focus();
}