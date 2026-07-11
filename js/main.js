// ===============================
// Sticky Header
// ===============================

window.addEventListener("scroll", () => {

const header = document.querySelector("header");

if(window.scrollY > 50){

header.style.background="rgba(5,8,22,.90)";
header.style.backdropFilter="blur(25px)";
header.style.boxShadow="0 10px 40px rgba(0,0,0,.35)";

}else{

header.style.background="rgba(5,8,22,.55)";
header.style.boxShadow="none";

}

});


// ===============================
// Mouse Glow
// ===============================

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove",(e)=>{

if(cursor){

cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";

}

});


// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


// ===============================
// Fade Up Animation
// ===============================

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0px)";

}

});

},{
threshold:.15
});

document.querySelectorAll("section").forEach(section=>{

section.style.opacity="0";
section.style.transform="translateY(70px)";
section.style.transition=".8s";

observer.observe(section);

});


// ===============================
// Active Menu
// ===============================

const links=document.querySelectorAll(".menu a");

links.forEach(link=>{

link.addEventListener("click",()=>{

links.forEach(item=>item.classList.remove("active"));

link.classList.add("active");

});

});


// ===============================
// Hero Image Floating
// ===============================

const hero=document.querySelector(".hero-image img");

if(hero){

let position=0;

setInterval(()=>{

position++;

hero.style.transform=`translateY(${Math.sin(position/15)*12}px)`;

},30);

}


// ===============================
// Button Hover Effect
// ===============================

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-5px)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0px)";

});

});


// ===============================
// Product Hover
// ===============================

document.querySelectorAll(".product-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});


// ===============================
// Category Hover
// ===============================

document.querySelectorAll(".category-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});


// ===============================
// Brand Slider Auto Scroll
// ===============================

const brandSlider=document.querySelector(".brand-slider");

if(brandSlider){

let scroll=0;

setInterval(()=>{

scroll+=1;

brandSlider.scrollLeft=scroll;

if(scroll>=brandSlider.scrollWidth-brandSlider.clientWidth){

scroll=0;

}

},30);

}


// ===============================
// Console Message
// ===============================

console.log("%c Vape Shop Chennai","font-size:22px;color:#00a8ff;font-weight:bold;");
console.log("%c Developed by BizLink Ecosystem","color:#ffffff;");
