let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let days_in_months = [31,28,31,30,31,30,31,31,30,31,30,31];
let current_year_days = [31,59,90,120,151,181,212,243,273,304,334,365];

let current_week = 1;
function displayTime()
{
  setInterval(reqti, 100);
}

function reqti()
{
  let d = new Date();
  document.getElementById("time").innerHTML = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
}

function displayDate()
{
  let d = new Date();
  document.getElementById('year-label').innerHTML = d.getFullYear();
  document.getElementById('month-label').innerHTML = months[d.getMonth()];
  document.getElementById("date").innerHTML = days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
}

function find(element) {
  return element === document.getElementById('month-label').innerHTML;
}

function nextMonthLabel() {
  if(document.getElementById('month-label').innerHTML == "December")
  {
    document.getElementById('year-label').innerHTML = 
    parseInt(document.getElementById('year-label').innerHTML) + 1;
    return -1;
  }
  for(let i = 0; i < months.length; ++i)
  {
    if(months[i] === document.getElementById('month-label').innerHTML)
      return i;
  }
}

function prevMonthLabel() {
  if(document.getElementById('month-label').innerHTML == "January")
  {
    document.getElementById('year-label').innerHTML = 
    parseInt(document.getElementById('year-label').innerHTML) - 1;
    return 12;
  }
  for(let i = 0; i < months.length; ++i)
  {
    if(months[i] === document.getElementById('month-label').innerHTML)
      return i;
  }
}

function getMonthIndex()
{
  const month = document.getElementById('month-label').innerHTML;
  for (let index = 0; index < months.length; index++)
  {
    if(months[index] == month)
      return index;
  }
}

const generateDate = () =>
{
  let d = new Date();
  let year = 0;
  year = document.getElementById('year-label').innerHTML;
  let month = months.findIndex(find);
  let day = d.getDay();
  
  let column = ((year-1) * 365) + parseInt((year-1) / 4);

  if (year % 4 == 0)
  {
    days_in_months[1] = 29;
    current_year_days = [31,60,91,121,152,182,213,244,274,305,335,366];
  }

  let start_week =  providecurrentWeek(column % 7 + 1, getMonthIndex() -1);
  
  let count = days_in_months[month];

  let month_index = getMonthIndex();
  if(month_index != 0)
    column+= current_year_days[month_index - 1];
  column = (column % 7) + 1;

  
  // for previous cols
  let temp = column - 1;
  
  let prev_month_days = days_in_months[month-1];
  if(document.getElementById("month-label").innerHTML == "January")
      prev_month_days = 31;
  for(let j = temp; j >= 1; j--, prev_month_days--)
  {   
    if(document.getElementById("month-label").innerHTML == "January")
    {
      document.getElementById("d" + j).innerHTML = prev_month_days;
      document.getElementById("d" + j).style.color = "rgba(255,255,255,0.5)";
      if (j % 7 == 1)
        document.getElementById("d" + j).style.color = "rgba(255,0,0,0.2)";
    }
    else
    {
      document.getElementById("d" + j).innerHTML = prev_month_days;
      document.getElementById("d" + j).style.color = "rgba(255,255,255,0.5)";
      if (j % 7 == 1)
        document.getElementById("d" + j).style.color = "rgba(255,0,0,0.2)";
    }
  }
  

  let today = d.getDate() + (column-1);
  for(let i = 1; i<= count; i++, column++)
  {
    document.getElementById("d" + column).innerHTML = i;
    document.getElementById("d" + column).style.color = "white";
    if (column % 7 == 1)
    {
      document.getElementById("d" + column).style.color = "salmon";
    }
    document.getElementById("d" + today).style.color = "red";
  }

  for(let j = 1; j < 7; ++j){
    document.getElementById("w" + j).innerText = start_week++;
    if(column < 36 && start_week > 52){
      document.getElementById("w5").innerText = start_week + "/1";
      document.getElementById("w6").innerText = "2";
      break;
    }
    if(column < 42 && start_week > 52){
      document.getElementById("w6").innerText = start_week + "/1";
      break;
    }
  }

              
  let next_month_date = 1;
  for(let k = column; k<= 42; k++, next_month_date++)
  {
    document.getElementById("d" + k).innerHTML = next_month_date;
    document.getElementById("d" + k).style.color = "rgba(255,255,255,0.5)";
    if (k % 7 == 1)
    {
      document.getElementById("d" + k).style.color = "rgba(255,0,0,0.2)";
    }
  }
}

function nextYear()
{
  document.getElementById('year-label').innerHTML = 
  parseInt(document.getElementById('year-label').innerHTML) + 1;
  generateDate();
}

function prevYear()
{
  document.getElementById('year-label').innerHTML = 
  parseInt(document.getElementById('year-label').innerHTML) - 1;
  generateDate();
}

function nextMonth()
{
  document.getElementById('month-label').innerHTML = months[nextMonthLabel()+1];
  generateDate();
}

function prevMonth()
{
  document.getElementById('month-label').innerHTML = months[prevMonthLabel()-1];
  generateDate();
}

const providecurrentWeek = (janCol, stopMonth) => {
  if(stopMonth == -1)
    return 1;
  let current_week = 0;
  if( (janCol + days_in_months[0]) < 36){
    current_week = 5
  }
  else{
    current_week = 6;
  }

  let nextMonthcol = janCol;
  for( i = 0; i < stopMonth; ++i){
    nextMonthcol = (nextMonthcol + days_in_months[i]) % 7;
    let month = months[i+1];
    if (nextMonthcol == 0)
      nextMonthcol = 7
    
    if(nextMonthcol == 1){
      current_week += 4;
    }
    if(nextMonthcol != 1 && ((nextMonthcol + days_in_months[i+1])) < 36)
    {
      current_week--;
      current_week += 5;
    }
    else
    if(nextMonthcol != 1 && ((nextMonthcol + days_in_months[i+1])) < 42)
    {
      current_week--;
      current_week += 6;
    }
  }
  return current_week;
}