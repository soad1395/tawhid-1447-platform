 let students=[];
let skills=[];

function addStudent(){
let name=document.getElementById("studentName").value;
if(name==="") return;

students.push({
name:name,
score:"",
level:""
});

document.getElementById("studentName").value="";
renderStudents();
}

function deleteStudent(i){
students.splice(i,1);
renderStudents();
}

function setScore(i,val){
students[i].score=val;

if(val>=85){
students[i].level="فوق المتوسط";
}
else if(val>=60){
students[i].level="ضمن المتوسط";
}
else{
students[i].level="دون المتوسط";
}

renderStudents();
}

function renderStudents(){

let table=document.getElementById("studentsTable");

if(!table) return;

table.innerHTML=`
<tr>
<th>الاسم</th>
<th>الدرجة</th>
<th>المستوى</th>
<th>حذف</th>
</tr>
`;

students.forEach((s,i)=>{

table.innerHTML+=`
<tr>

<td>${s.name}</td>

<td>
<input type="number"
value="${s.score}"
onchange="setScore(${i},this.value)">
</td>

<td>${s.level}</td>

<td>
<button onclick="deleteStudent(${i})">حذف</button>
</td>

</tr>
`;

});

analysis();
drawChart();
saveData();

}

function addSkill(){

let name=document.getElementById("skillName").value;

if(name==="") return;

skills.push(name);

document.getElementById("skillName").value="";

renderSkills();

}

function renderSkills(){

let box=document.getElementById("skillsBox");

if(!box) return;

box.innerHTML="";

skills.forEach(s=>{

box.innerHTML+=`<div class="card">${s}</div>`;

});

}

function analysis(){

let high=0;
let mid=0;
let low=0;

students.forEach(s=>{

if(s.level==="فوق المتوسط") high++;
if(s.level==="ضمن المتوسط") mid++;
if(s.level==="دون المتوسط") low++;

});

let total=students.length;

let box=document.getElementById("analysisBox");

if(!box) return;

box.innerHTML=`

عدد الطالبات : ${total} <br>

فوق المتوسط : ${high} <br>

ضمن المتوسط : ${mid} <br>

دون المتوسط : ${low}

`;

}

let chart;

function drawChart(){

let high=0;
let mid=0;
let low=0;

students.forEach(s=>{

if(s.level==="فوق المتوسط") high++;
if(s.level==="ضمن المتوسط") mid++;
if(s.level==="دون المتوسط") low++;

});

let ctx=document.getElementById("chart");

if(!ctx) return;

if(chart){
chart.destroy();
}

chart=new Chart(ctx,{
type:"pie",
data:{
labels:["فوق المتوسط","ضمن المتوسط","دون المتوسط"],
datasets:[{
data:[high,mid,low],
backgroundColor:["#2ecc71","#f1c40f","#e74c3c"]
}]
}
});

}

function quiz(){

let questions=[

"ما معنى التوحيد؟",
"اذكري أنواع التوحيد",
"ما الفرق بين الربوبية والألوهية؟",
"ما أهمية العقيدة الإسلامية؟",
"ما حكم الشرك بالله؟"

];

let q=questions[Math.floor(Math.random()*questions.length)];

document.getElementById("quizBox").innerHTML=q;

}

function saveData(){

localStorage.setItem("students",JSON.stringify(students));
localStorage.setItem("skills",JSON.stringify(skills));

}

function loadData(){

let s=localStorage.getItem("students");
let k=localStorage.getItem("skills");

if(s) students=JSON.parse(s);
if(k) skills=JSON.parse(k);

renderStudents();
renderSkills();

}

window.onload=loadData;
