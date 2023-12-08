const empty = document.querySelector('div.empty');
const h1 = document.querySelector('h1');
let name;

document.addEventListener('dragstart',(e)=>{
    name = e.target.alt;
},false);

document.addEventListener('drag', (e) => {
    e.target.style.border = '5px dashed red';
    empty.style.border = '5px dashed red';
}, false);

document.addEventListener('dragend', (e) => {
    e.target.style.border = 'none';
    empty.style.border = 'none';
    h1.innerHTML = '拖动你喜欢的图案到衣服上';
    h1.style.color = 'black';
}, false);

empty.addEventListener('dragenter', (e) => {
    if(empty.firstChild){
        empty.removeChild(empty.firstChild);
    }
    h1.innerHTML = name;
    h1.style.color = 'red';
}, false);

empty.addEventListener('drop', (e) => {

    e.preventDefault();
    e.target.appendChild(document.querySelector(`img[alt=${name}]`));
    
}, false);

empty.addEventListener('dragover', (e) => {
    e.preventDefault();   
}, false);

const images = document.querySelectorAll('img');

const callback = entries=>{
    // console.log(entries)
    entries.forEach(entry => {       
        if (entry.isIntersecting)
        {
            const image = entry.target;
            const data_src1 = image.getAttribute('data_src');
            // console.log(image);
            image.setAttribute('src',data_src1);
            // Image.removeAttribute('data_src');
            observer.unobserve(image);
            console.log('触发');
        };
    });
};

const observer = new IntersectionObserver(callback);

images.forEach(image=>{
    observer.observe(image);
});
fetch("http://www.163.com")
    .then((res)=>{
        if(res.ok){
            console.log("successful");
        }else{
            console.log("unsuccessful");
        }
        return res;
    })
    