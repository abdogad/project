let courses = [];
let coursesPlace = document.querySelector(".course-cont");
let searchbtn = document.querySelector(".srchbtn");
let searchbar = document.querySelector(".srchbar");
let carousel = document.querySelector(".carousel-inner");
let headerOfCourse = document.querySelector(".courses h2");
let paragraphOfCourse = document.querySelector(".courses p");
let buttonOfCourse = document.querySelector(".courses a");
let header = ["Expand your creative skillset with Drawing","Analyze and visualize data with Excel","Build websites and applications with Web Development","Grow your software development skills with JavaScript","Lead data-driven decisions with Data Science","Become an expert in cloud computing with AWS Certification","Expand your creative skillset with Drawing"];
let paragraph = ["Take one of Udemy’s range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will appeal to..."
,"Take a Microsoft Excel course from Udemy, and learn how to use this industry-standard software. Real-world experts will show you the basics like how to organize data into sheets, rows and columns, and advanced techniques like creating complex dynamic formulas. Both small businesses and large companies use Excel to..."
,"The world of web development is as wide as the internet itself. Much of our social and vocational lives play out on the internet, which prompts new industries aimed at creating, managing, and debugging the websites and applications that we increasingly rely on."
,"JavaScript is a text-based computer programming language used to make dynamic web pages. A must-learn for aspiring web developers or programmers, JavaScript can be used for features like image carousels, displaying countdowns and timers, and playing media on a webpage. With JavaScript online classes, you can learn to build..."
,"Data science application is an in-demand skill in many industries worldwide — including finance, transportation, education, manufacturing, human resources, and banking. Explore data science courses with Python, statistics, machine learning, and more to grow your knowledge. Get data science training if you’re into research, statistics...,"
,"Prep for your AWS certification with an AWS course on Udemy. Learn the fundamentals of AWS such as working with a serverless platform, the various frameworks, security and more. With these courses, you’ll build the valuable skills you need to implement cloud initiatives — and open up new career opportunities. If you want to..."
,"Want to start drawing for fun or take your craft to the next level? Explore our online drawing classes and learn pencil drawing, figure drawing, cartoon drawing, character drawing for cartoons and anime, illustration, sketching, shading and more. Take an overview course on the fundamentals of drawing or zero in on an area..."];
let buttonText = ["Python","Excel","Web Developement","JavaScript","Data Science","AWS Certification","Drawing"];

let indOfList = 1;
function findCategory(id){
    indOfList = id;
    render(courses);
}
function get(){
    fetch('http://localhost:3000/courses')
.then(response => response.json())
.then(json=>{
    
    courses = json;
    render(courses);
});
}

function render(arr){
    let str = "";
    carousel.innerHTML = "";
    
    let numberOfCards = Math.floor((carousel.clientWidth)/248);
    let index = 0;
    headerOfCourse.innerHTML = header[indOfList-1];
    paragraphOfCourse.innerHTML =paragraph[indOfList-1];
    buttonOfCourse.innerHTML = "<p><b>Explore "+(buttonText[indOfList-1])+"</b></p>";
    console.log(indOfList);
    arr = arr.filter(e=>e.category.includes(indOfList));
    console.log(arr.length);
    while(index<arr.length){
        str = "";
        if(index === 0)str+=`<div class="carousel-item active"><div class="d-flex flex-row justify-content-between">`;
        else str+=`<div class="carousel-item"><div class="d-flex flex-row justify-content-between">`;
        for(let i = index;i<Math.min(index+numberOfCards,arr.length);i++){
            console.log(arr[i].image);
            if(index != Math.min(index+numberOfCards,arr.length)-1){
                str+=`<div class="acourse">
                    <img src=${arr[i].image} alt="python1">
                    <h3 style="font-size:1.1rem;">${arr[i].title}</h3>
                    <h5 style="color:gray;font-size:0.7rem;">${arr[i].instructors[0].name}</h4>
                    <h3 style="font-size:1.1rem;">${arr[i].price}$</h3>
                    </div>`;
            }
            else{
               str+=`<div class="acourse" style="margin-right:0px;">
                   <img src=${arr[i].image} alt="python1">
                 <h3 style="font-size:1.1rem;">${arr[i].title}</h3>
                    <h5 style="color:gray;font-size:0.7rem;">${arr[i].instructors[0].name}</h4>
                      </div>`;
            }
        }
        str+="</div></div> "
        carousel.insertAdjacentHTML("beforeend",str);
        
        index+=numberOfCards;
    }
    
    
}

searchbtn.addEventListener('click',e=>{
    e.preventDefault();
    let val = searchbar.value.toLowerCase();
    console.log(val);
    let tmp = courses;
    tmp = tmp.filter(ma=>ma.title.toLowerCase().includes(val)||ma.instructors[0].name.toLowerCase().includes(val));
    console.log(tmp);
    render(tmp);
});
get();
addEventListener('resize',fun=>{
    render(courses);
});