const hex=document.querySelector(".hex");
const leftArrow=document.querySelector(".btn-1");
const rightArrow=document.querySelector(".btn-2");
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
    }
    else {
        count=0;
        toggle=true;
    }
    anime ({
        targets: ".tile",
        opacity: count,
        // backgroundColor: colors[count],
        delay: anime.stagger(75, {
            grid: [columns, rows],
            from: "center"
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




