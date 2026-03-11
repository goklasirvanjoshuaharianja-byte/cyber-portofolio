document.addEventListener("DOMContentLoaded", () => {

/* =========================
BOOT ENTRANCE
========================= */

const boot = document.getElementById("boot-screen")
const terminal = document.querySelector(".boot-terminal")
const progress = document.getElementById("progress-bar")
const hero = document.querySelector(".hero")

if(boot){

const visited = sessionStorage.getItem("visited")

if(visited){

boot.style.display="none"
if(hero) hero.classList.add("hero-show")

}else{

sessionStorage.setItem("visited","true")

const lines=[
"> initializing system...",
"> scanning hardware...",
"> loading security modules...",
"> connecting to github...",
"> decrypting access keys...",
"> access granted"
]

let i=0

function showLine(){

if(i>=lines.length){

setTimeout(()=>{

boot.classList.add("boot-hide")

setTimeout(()=>{

boot.remove()

if(hero) hero.classList.add("hero-show")

},1200)

},800)

return
}

const p=document.createElement("p")
p.textContent=lines[i]

terminal.appendChild(p)

progress.style.width=((i+1)/lines.length)*100+"%"

i++

setTimeout(showLine,600)

}

setTimeout(showLine,700)

}

}

/* =========================
REALISTIC MATRIX
========================= */

const canvas=document.getElementById("matrix")

if(canvas){

const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

const letters="01アイウエオカキクケコサシスセソ"
const fontSize=16

const columns=canvas.width/fontSize
const drops=[]

for(let i=0;i<columns;i++){
drops[i]=1
}

function draw(){

ctx.fillStyle="rgba(0,0,0,0.06)"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="#00ffff"
ctx.font=fontSize+"px monospace"

for(let i=0;i<drops.length;i++){

const text=letters[Math.floor(Math.random()*letters.length)]

ctx.fillText(text,i*fontSize,drops[i]*fontSize)

if(drops[i]*fontSize>canvas.height&&Math.random()>0.975){
drops[i]=0
}

drops[i]++

}

}

setInterval(draw,33)

}

/* =========================
INTERACTIVE TERMINAL
========================= */

const input=document.getElementById("terminal-command")
const output=document.getElementById("terminal-output")

if(input){

const commands={

help:"about, skills, github, clear",
about:"Cyber security enthusiast and web developer.",
skills:"JavaScript, Node.js, Linux, Networking",
github:"github.com/goklasirvanjoshuaharianja-byte"

}

input.addEventListener("keydown",e=>{

if(e.key==="Enter"){

const cmd=input.value.trim()

const line=document.createElement("div")
line.textContent="$ "+cmd

output.appendChild(line)

if(commands[cmd]){

const res=document.createElement("div")
res.textContent=commands[cmd]

output.appendChild(res)

}else if(cmd==="clear"){

output.innerHTML=""

}else{

const err=document.createElement("div")
err.textContent="command not found"

output.appendChild(err)

}

input.value=""
output.scrollTop=output.scrollHeight

}

})

}

/* =========================
SKILL RADAR
========================= */

const radar=document.getElementById("skill-radar")

if(radar){

const ctx=radar.getContext("2d")

const skills=[
{name:"HTML",value:80},
{name:"CSS",value:75},
{name:"JavaScript",value:70},
{name:"CyberSec",value:65},
{name:"Linux",value:60}
]

const centerX=radar.width/2
const centerY=radar.height/2
const radius=150

const step=(Math.PI*2)/skills.length

ctx.strokeStyle="#00ffff"
ctx.fillStyle="#00ffff"
ctx.font="12px Orbitron"

for(let r=1;r<=4;r++){

ctx.beginPath()
ctx.arc(centerX,centerY,(radius/4)*r,0,Math.PI*2)
ctx.stroke()

}

skills.forEach((skill,i)=>{

const angle=step*i-Math.PI/2

const x=centerX+Math.cos(angle)*radius
const y=centerY+Math.sin(angle)*radius

ctx.beginPath()
ctx.moveTo(centerX,centerY)
ctx.lineTo(x,y)
ctx.stroke()

ctx.fillText(
skill.name,
centerX+Math.cos(angle)*(radius+15),
centerY+Math.sin(angle)*(radius+15)
)

})

ctx.beginPath()

skills.forEach((skill,i)=>{

const angle=step*i-Math.PI/2
const valueRadius=(skill.value/100)*radius

const x=centerX+Math.cos(angle)*valueRadius
const y=centerY+Math.sin(angle)*valueRadius

if(i===0){
ctx.moveTo(x,y)
}else{
ctx.lineTo(x,y)
}

})

ctx.closePath()

ctx.strokeStyle="#00ffff"
ctx.fillStyle="rgba(0,255,255,0.25)"

ctx.fill()
ctx.stroke()

}

})
