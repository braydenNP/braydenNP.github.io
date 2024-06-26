const track = document.getElementById("image-track");
const infoBox = document.getElementById("info-box");
//const infoDiv = infoBox.querySelector("#info");
const progressBar = document.getElementById("progress-bar");
const info = document.getElementById("info");

let img_count = 9;

document.addEventListener('DOMContentLoaded', () => {
    var i = 0;
    for (const info of track.getElementsByClassName("info")) {
        info.dataset.index = i;
        i++ 
    }
    img_count = i+2; //includes empty image

    var i = 0;
    for(const image of track.getElementsByClassName("image")) {
        image.dataset.index = i;
        i++
    }
    
    for (const info of track.getElementsByClassName("info")) {
        info.style.transform = `translate(0%,60%)`
    }

})


window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;  
}
window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;  

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, 
        maxDelta = window.innerWidth / 2;
        
    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage) + percentage, -100), 0); 
    
    track.dataset.percentage = nextPercentage;
    
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, {duration: 1200, fill: "forwards"});

    for(const image of track.getElementsByClassName("image")) {
        /*const rect = image.getBoundingClientRect();
        const distanceFromLeft = rect.left;
        const viewportWidth = window.innerWidth; */
        const mid = nextPercentage-((-100/img_count)*image.dataset.index);
        console.log("index: " + image.dataset.index + "mid: " + mid);
        image.animate({
            objectPosition: `${(mid+50)}% center`
        }, { duration: 1200, fill: "forwards" });
    }

    for (const info of track.getElementsByClassName("info")) {
        const index = info.dataset.index;
        if (index * (-100 / (img_count-2)) >= nextPercentage && nextPercentage > (index + 1) * (-100 / (img_count-2))) {
            info.animate({
                transform: `translate(0%,0%)`,
                opacity: 100
            }, {duration: 1200, fill: "forwards" });
        }
        else{
            info.animate({
                opacity: 0,
                transform: `translate(0%,60%)`
            }, {duration: 1200, fill: "forwards" });
        }
    }

    progressBar.animate({
        width: `${(nextPercentage*-1)}%`
    }, {duration: 1200, fill:"forwards"});
}
window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}



/*
const images = document.querySelectorAll('.image');
images.forEach(image => {
    image.addEventListener('mouseover', (e) => {
        infoBox.style.display = 'block';
        infoBox.innerHTML  = `<span style="display: block; font-size: 3vmin; font-weight: bold;">${e.target.dataset.title}</span>
    <span style="display: block; font-size: 1.5vmin; margin-top: 1vmin;">${e.target.dataset.info}</span>`;
        
    }); 
    
    image.addEventListener('mousemove', (e) => {
        infoBox.style.left = `${e.clientX + 10}px`;
        infoBox.style.top = `${e.clientY + 10}px`;
    });

    image.addEventListener('mouseout', () => {
        infoBox.style.display = 'none';
    });
}); */