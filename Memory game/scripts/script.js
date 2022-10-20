let cards = document.querySelectorAll(".card");

let selection1, selection2; // the two cards selected

let disable = false; // if we have two selections 

let counter =0;

let start = document.getElementById("start");
let reset = document.getElementById("reset");
let timevar;




var allSeconds = 0;


generatecards();
start.addEventListener("click",function(){  runtime()});
reset.addEventListener("click",function (){generatecards(); resettime()});
cards.forEach(card =>{
    card.addEventListener("click",flipcard);
})

// function to check if the two cards selected are the same

function checkcards(card1,card2){
    if(card1===card2){
        counter++;
        if (counter == 8){
            setTimeout(()=>{
                resettime();
                return generatecards();
                
                
            },2000);
            
        }
        selection1.removeEventListener("click",flipcard);
        selection2.removeEventListener("click",flipcard);
        selection1 = selection2 = "";
        return disable =false;
    }

    setTimeout(()=>{
        selection1.classList.add("shake");
        selection2.classList.add("shake");

    },700);

    setTimeout(()=>{
        selection1.classList.remove("shake","flip");
        selection2.classList.remove("shake","flip");
        selection1 = selection2 = "";
        disable = false;
    },1200);
}



function flipcard(e){
   let clickedcard = e.target;
    
    if (clickedcard!== selection1 && !disable){
        clickedcard.classList.add("flip");
    
        if (!selection1){
        return selection1 = clickedcard;
        }
    
    selection2 = clickedcard;
    disable = true;

    let selection1img = selection1.querySelector("img").src,
        selection2img = selection2.querySelector("img").src;

   checkcards(selection1img, selection2img);
}
}

// generating the cards randomly
function generatecards(){
    counter = 0;
    selection1 = selection2 = "";
    disable = false;
    let arr =["python","java","go","css","html","c++","node","c","python","java","go","css","html","c++","node","c"];
    arr.sort(()=> Math.random()>0.5 ? 1 :-1 )
    
    cards.forEach((card,i)=>{
        card.classList.remove("flip");
        let img = card.querySelector("img");
        img.src = `images/${arr[i]}.png`;
    })
}




// functions for timing -----------------

function countTimer() {
           allSeconds++;
           var minute = Math.floor((allSeconds)/60);
           var seconds = allSeconds - ( minute*60);

           if(minute < 10)
             minute = "0"+minute;
           if(seconds < 10)
             seconds = "0"+seconds;
           document.getElementById("timer").innerHTML = minute + ":" + seconds;
        }


function resettime(){
    allSeconds = 0;
    clearInterval(timevar);
    document.getElementById("timer").innerHTML = "00:00";
    
}

function runtime(){
    timevar = setInterval(countTimer, 1000);
    
}
