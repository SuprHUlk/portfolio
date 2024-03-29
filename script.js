const hex=document.querySelector(".hex");
const leftBtn=document.querySelector(".btn-1");
const rightBtn=document.querySelector(".btn-2");
const panels=document.querySelector(".panels");
const descriptions=document.querySelector(".descriptions");
const panel=Array.from(panels.children);
const description=Array.from(descriptions.children);
const navMobile = document.querySelector("#nav-mobile");
const navToggle = document.querySelector("#nav-toggle-button");

/*****
   HEX LOGIC STARTS
*****/

let columns=0;
let rows=0;
let count=1;
let toggle=false;
// const colors=[
//     "rgb(255, 0, 0)",
//     "rgb(255, 238, 0)",
//     "rgb(0, 255, 30)",
//     "rgb(0, 200, 255)",
//     "rgb(64, 0, 255)", 
//     "rgb(0, 0, 0)",
// ];

function handleOnClick(index) {
    // count=count+1;
    // if(count==colors.length) {
    //     count=0;
    // }
    if(toggle) {
        count=1;
        toggle=false;
        document.querySelector(".hex").classList.toggle("toggled");
    }
    else {
        count=0;
        toggle=true;
        document.querySelector(".hex").classList.toggle("toggled");
    }
    anime ({
        targets: ".tile",
        opacity: count,
        // backgroundColor: colors[count],
        delay: anime.stagger(75, {
            grid: [columns, rows],
            from: index
        })
    })
}

const createGrid=() => {
    hex.innerHTML="";
    columns=Math.floor(document.querySelector('.hex').clientWidth/50);
    rows=Math.floor(document.querySelector('.hex').clientHeight/50);
    hex.style.setProperty("--columns", columns);
    hex.style.setProperty("--rows", rows);
    createTiles( columns*rows );
}

const createTiles=quantity => {
    Array.from(Array(quantity)).map((tile, index) => {
        hex.appendChild(createTile(index));
    })
}

const createTile=index => {
    const tile=document.createElement("div");
    tile.classList.add("tile");
    tile.addEventListener("click", (e)=>{
        handleOnClick(index)
    })
    return tile;
}

createGrid();
window.onresize=() => createGrid();

/*****
   HEX LOGIC ENDS
*****/

/***** 
   CAROUSEL LOGIC STARTS
*****/

const setPanelPosition=(panel, index) => {
    panel.style.left=index*100+"vw";
}

const setDescriptionPosition=(description, index) => {
    description.style.left=index*100+"vw";
}

panel.forEach(setPanelPosition);
description.forEach(setDescriptionPosition);

const movePanel=(panels, currentPanel, targetPanel) => {
    panels.style.transform="translateX(-"+targetPanel.style.left+")";
    currentPanel.classList.remove("current-panel");
    targetPanel.classList.add("current-panel");
}

const movePanelIfLast=(panels, currentPanel, targetPanel, value) => {
    panels.style.transform="translateX("+value+"vw)";
    currentPanel.classList.remove("current-panel");
    targetPanel.classList.add("current-panel");
}

const moveDescription=(descriptions, currentDescription, targetDescription) => {
    descriptions.style.transform="translateX(-"+targetDescription.style.left+")";
    currentDescription.classList.remove("current-description");
    targetDescription.classList.add("current-description");
}

const moveDescriptionIfLast=(descriptions, currentDescription, targetDescription, value) => {
    descriptions.style.transform="translateX("+value+"vw)";
    currentDescription.classList.remove("current-description");
    targetDescription.classList.add("current-description");
}

leftBtn.addEventListener('click', e => {
    const currentPanel=panels.querySelector(".current-panel");
    const prevPanel=currentPanel.previousElementSibling;
    const currentDescription=descriptions.querySelector(".current-description");
    const prevDescription=currentDescription.previousElementSibling;
    if(prevPanel !== null) {
        movePanel(panels, currentPanel, prevPanel);
        moveDescription(descriptions, currentDescription, prevDescription);
    }
    else {
        movePanelIfLast(panels, currentPanel, panels.lastElementChild, -200); 
        moveDescriptionIfLast(descriptions, currentDescription, descriptions.lastElementChild, -200);
    }
})

rightBtn.addEventListener('click', e => {
    const currentPanel=panels.querySelector(".current-panel");
    const nextPanel=currentPanel.nextElementSibling;
    const currentDescription=descriptions.querySelector(".current-description");
    const nextDescription=currentDescription.nextElementSibling;
    if(nextPanel !== null) {
        movePanel(panels, currentPanel, nextPanel);
        moveDescription(descriptions, currentDescription, nextDescription);
    }
    else {
        movePanelIfLast(panels, currentPanel, panels.firstElementChild, 0);
        moveDescriptionIfLast(descriptions, currentDescription, descriptions.firstElementChild, 0);
    }
})

/*****
   CAROUSEL LOGIC ENDS
*****/

/*****
   MOBILE NAV LOGIC STARTS
*****/

navToggle.addEventListener("click", () => {
    const checkVisibility=navMobile.getAttribute("data-visible");
    if(checkVisibility=="false") {
        navMobile.setAttribute("data-visible", "true");
    }
    else {
        navMobile.setAttribute("data-visible", "false");
    }
});

/*****
   MOBILE NAV LOGIC ENDS
*****/

const contactMe = document.querySelector(".contact-me > a");
const contact = document.querySelector(".contact");
const close = document.querySelector("form > .heading > .submit > .wrapper > #close");
const send = document.querySelector("form > .heading > .submit > .wrapper > #send");

contactMe.addEventListener("click", ()=>{
    if(contact.getAttribute("data-visible")=="false"&&window.innerWidth>550) {
        contact.setAttribute("data-visible", "true");
    }
    else {
        var recipient='ayush123kumar.ak@gmail.com';
        var subject="";
        var body="";
        window.location.href = 'mailto:' + encodeURIComponent(recipient)+
            '?subject='+encodeURIComponent(subject)+
            '&body=' + encodeURIComponent(body);
    }
});

close.addEventListener("click", handleClose)

send.addEventListener("click", ()=>{
    const form = document.querySelector("form");
    form.submit();
    handleClose();
})


function handleClose() {
    if(contact.getAttribute("data-visible")=="true") {
        contact.setAttribute("data-visible", "false");
    }
}