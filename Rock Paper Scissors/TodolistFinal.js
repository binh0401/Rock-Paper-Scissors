let task = [];
let date = [];
let n=0;

function updateadd(){
    let taskElement = document.querySelector('.js-input-task');
    let dateElement = document.querySelector('.js-input-date');
    task.push(taskElement.value);
    date.push(dateElement.value);
    n++;
    taskElement.value = '';
    dateElement.value = '';
    displayToScreen();
}

function displayToScreen()
{
  const displaySection = document.querySelector('.display');
  let contentDisplay = '';
  for(let i=0;i<n;i++)
  {
      contentDisplay += `<div class="content task">${task[i]}</div>
                        <div class="content date">${date[i]}</div>
                        <button class = "deletebutton${i} deletebutton" onclick="updatedelete(${i})">Delete</button>
                        <br>`
  }
  displaySection.innerHTML = contentDisplay;
}

function handle(event)
{
  if(event.key === 'Enter') updateadd()
}

function updatedelete(number)
{
    task.splice(number,1);
    date.splice(number,1);
    n--;
    displayToScreen();
}