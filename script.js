class Student{
    constructor(name, dates, attendance){
        this.name = name
        this.dates = dates //Array of days they are supposed to arrive in the format "DD/MM/YYYY"
        this.attendance = attendance
    }
}

const students = []

function date(){
    today = new Date()
    options = {month: 'short', day: '2-digit', year: 'numeric', weekday: 'short'}
    document.getElementById("date").innerHTML = today.toLocaleDateString('en-US', options)
    document.getElementById("date-label").style.transform = "translate(-{}px, 0)".replace("{}", window.getComputedStyle(document.getElementById("filter")).width.split('px')[0]/2)
}

function addStudentPopup(){
    document.getElementById("addStudentPopup").style.display = "flex"
    document.getElementById("overlay").style.display = "block"
    
    table = document.getElementById("calender")
    month = today.getMonth() + 1
    year = today.getYear()
    days = new Date(year, month, 0).getDate()
    for(week = 0; week < 4; week++){
        w = document.createElement("tr")
        w.className = "trpopup"
        table.appendChild(w)
        startDay = (today.getDate() - today.getDay() + 1)

        for(day = 0; day < 7; day++){
            d = document.createElement("td")
            d.className = "tdpopup"
            w.appendChild(d)
            if(week == 0 && day < today.getDay()){
                d.style.backgroundColor = "lightgray"
                d.style.color = "gray"
            } else {
                d.style.backgroundColor = "white"
                d.addEventListener('click', function() {dateSelect(this);})
            }
            d.innerHTML = (week * 7 + day + startDay) % days
            if(d.innerHTML == "0"){
                d.innerHTML = days
                month += 1
            }
            if(month == 13){
                month = 1
                year += 1
            }
            d.id = "D/M/Y".replace("D", d.innerHTML).replace("M", month).replace("Y", year-100)
        }
    }
}

function dateSelect(element){
    if (element.style.backgroundColor == "white"){
        element.style.backgroundColor = "lightgreen"
    } else {
        element.style.backgroundColor = "white"
    }
}

function weekSelect(element){
    weeks = document.getElementsByTagName("th")

    day = 0
    while(day < 7){
        if(weeks[day].innerText.trim() == element.innerHTML.trim()){
            break
        }
        day += 1
    }

    days = document.getElementsByClassName("tdpopup")
    for (i = 0; i < days.length; i++) {
        if (days[i].style.backgroundColor != "lightgray" && i%7 == day) {
            days[i].style.backgroundColor = "lightgreen"
            console.log("changed")
        }
    }
}

function addStudent(){
    students.push(new Student(document.getElementById("studentName").value, [], []))
    days = document.getElementsByTagName("td")
    for(i = 0; i < 7; i++){
        if(days[i].style.backgroundColor == "lightgreen"){
            students[students.length - 1].dates.push(days[i].id)
        }
    }
    createStudentDiv(students[students.length - 1])
    closePopup()
}

function closePopup(){
    document.getElementById("addStudentPopup").style.display = "none"
    document.getElementById("overlay").style.display = "none"

    popupList = document.getElementsByClassName("trpopup")
    for(i = popupList.length - 1; i > 0; i--){
        popupList[i].remove()
    }
    popupList = document.getElementsByClassName("tdpopup")
    for(i = popupList.length - 1; i >= 0; i--){
        popupList[i].remove()
    }
    
}

function createStudentDiv(student){
    table = document.getElementById("studentTable")

    studentRow = document.createElement("tr")
    studentRow.className = "Student"
    
    nameCell = document.createElement("td")
    nameCell.className = "name"
    nameCell.innerHTML = student.name
    if(student.name.trim() == ""){
        nameCell.innerHTML = "[UNNAMED STUDENT]"
    }

    optionsCell = document.createElement("td")
    optionsCell.className = "options"

    optionsButton = document.createElement("button")
    optionsButton.innerHTML = "⋮"
    optionsButton.className = "optionsButton"

    table.appendChild(studentRow)
    studentRow.appendChild(nameCell)
    studentRow.appendChild(optionsCell)
    optionsCell.appendChild(optionsButton)
}

function load(){
    date()
    for(let i = 0; i < students.length; i++){
        createStudentDiv(students[i])
    }
}
