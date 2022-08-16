let courses = [];
let coursesPlace = document.querySelector(".course-cont");
let searchbtn = document.querySelector(".srchbtn");
let searchbar = document.querySelector(".srchbar");

function gett(){
    fetch('http://localhost:3000/courses')
.then(response => response.json())
.then(json=>{
    
    courses = json;
    render(courses);
});
}
function render(arr){
    let str = "";
    arr.forEach(c => {
        str+=`<div class="acourse">
        <img src=${c.image} alt="python1">
        <h3>${c.title}</h3>
        <h5 style="color:gray;">${c.instructors[0].name}</h4>
        <h3>${c.price}$</h3>
    </div>`;
    });
    coursesPlace.innerHTML= str;
}

searchbtn.addEventListener('click',e=>{
    e.preventDefault();
    let val = searchbar.value;
    console.log(val);
    let tmp = courses;
    tmp = tmp.filter(ma=>ma.title.includes(val)||ma.instructors[0].name.includes(val));
    console.log(tmp);
    render(tmp);
});
gett();