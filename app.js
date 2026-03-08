 let students = []
let skills = []
let scores = []

function addStudent(){

let name = document.getElementById("studentNameInput").value

if(name=="") return

students.push({

name:name,
scores:{}

})

document.getElementById("studentNameInput").value=""

renderStudents()

}

function addSkill(){

let skill = document.getElementById("skillTextInput").value

if(skill=="") return

skills.push(skill)

document.getElementById("skillTextInput").value=""

renderSkills()

}

function renderSkills(){

let wrap = document.getElementById("skillsTableWrap")

if(!wrap) return

let html=""

skills.forEach(s=>{

html+=`<div>${s}</div>`

})

wrap.innerHTML=html

}

function renderStudents(){

let wrap = document.getElementById("studentsTableWrap")

if(!wrap) return

let html="<table>"

html+="<tr><th>الاسم</th><th>الدرجة</th><th>المستوى</th></tr>"

students.forEach((s,i)=>{

let level=""

if(s.score>=85) level="فوق المتوسط"
else if(s.score>=60) level="ضمن المتوسط"
else level="دون المتوسط"

html+=`<tr>

<td>${s.name}</td>

<td><input type="number" onchange="updateScore(${i},this.value)"></td>

<td>${level}</td>

</tr>`

})

html+="</table>"

wrap.innerHTML=html

}

function updateScore(i,val){

students[i].score = Number(val)

renderStudents()

analyze()

}

function analyze(){

let high=0
let mid=0
let low=0

students.forEach(s=>{

if(s.score>=85) high++
else if(s.score>=60) mid++
else low++

})

let result = document.getElementById("analysis")

if(result){

result.innerHTML=

"فوق المتوسط: "+high+
"<br>ضمن المتوسط: "+mid+
"<br>دون المتوسط: "+low

}

drawChart(high,mid,low)

}

function drawChart(h,m,l){

let ctx=document.getElementById("finalChart")

if(!ctx) return

new Chart(ctx,{

type:"pie",

data:{

labels:["فوق المتوسط","ضمن المتوسط","دون المتوسط"],

datasets:[{

data:[h,m,l],

backgroundColor:["green","orange","red"]

}]

}

})

}

function randomQuiz(){

let questions=[

"ما معنى التوحيد؟",
"اذكري أنواع التوحيد",
"ما الفرق بين الربوبية والألوهية؟",
"ما حكم الشرك؟"

]

let q = questions[Math.floor(Math.random()*questions.length)]

document.getElementById("quizBox").innerHTML=q

}
