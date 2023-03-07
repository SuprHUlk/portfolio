const hex=document.querySelector(".hex");
const leftBtn=document.querySelector(".btn-1");
const rightBtn=document.querySelector(".btn-2");
const panels=document.querySelector(".panels");
const panel=Array.from(panels.children);
const width=panel[0].getBoundingClientRect().width;
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

const setPanelPosition=(panel, index) => {
    panel.style.left=index*100+"%";
}

panel.forEach(setPanelPosition);

const movePanel=(panels, currentPanel, targetPanel) => {
    panels.style.transform="translateX(-"+targetPanel.style.left+")";
    currentPanel.classList.remove("current-panel");
    targetPanel.classList.add("current-panel");
}

leftBtn.addEventListener('click', e => {
    const currentPanel=panels.querySelector(".current-panel");
    const prevPanel=currentPanel.previousElementSibling;
    movePanel(panels, currentPanel, prevPanel);
})


rightBtn.addEventListener('click', e => {
    const currentPanel=panels.querySelector(".current-panel");
    const nextPanel=currentPanel.nextElementSibling;
    movePanel(panels, currentPanel, nextPanel);
})