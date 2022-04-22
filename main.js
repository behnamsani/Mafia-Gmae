const start = document.querySelector("#start");
const numP = document.querySelector("#numPlayer");
const btnSub = document.querySelector("#submit");
const btnName = document.querySelector("#btnName");
const btnRole = document.querySelector("#btnRole");
const btnNext = document.querySelector("#btnNext");
const namePlayer = document.querySelector("#namePlayer");
const namesPlayer = document.querySelector("#namesPlayer");
const createRoles = document.querySelector("#createRoles");
const createRole = document.querySelector("#createRole");
const rolePlayer = document.querySelector("#rolePlayer");
const timeOut = document.querySelector("#timeOut");
const main = document.querySelector("#main");
const btnStartGame = document.createElement("button");

let numPlayer;
let ArrNamePlayer = [];
let arrRole = [
  "پدر خوانده",
  "دکتر لکتر",
  "دکتر شهر",
  "تک تیرانداز",
  "کاراگاه",
  "جان سخت",
  "شهردار",
  "جوکر",
  "روانشناس",
  "شهروند ساده",
  "مافیای ساده",
  "شهروند ساده",
  "شهروند ساده",
  "شهروند ساده",
  "مافیای ساده",
  "شهروند ساده",
  "شهروند ساده",
  "شهروند ساده",
  "شهروند ساده",
  "مافیای ساده",
];
let chooseRole = [];
let chooseRoleSelect = [];
let playerRole = [];
let flagInp = false;
let arrMafia = [];
let arrShahr = [];
let arrPR2 = [];

btnSub.addEventListener("click", (event) => {
  event.preventDefault();
  numPlayer = numP.value;
  let hidden;
  let displayT;

  if (numPlayer == "0" || numPlayer == "") {
    alert("داداش تعداد بازیکن ها را وارد کن");
  } else {
    numPlayer = parseInt(numPlayer);
    start.style.transition = "all 500ms";
    start.style.opacity = "0";
    hidden = setTimeout(display(start), 300);
    clearTimeout(hidden);
    namePlayer.style.display = "block";
    displayT = setTimeout(displayOn(namePlayer), 300);
    clearTimeout(displayT);
    for (let i = 0; i < numPlayer; i++) {
      const input = document.createElement("input");
      input.className = "inputName";
      input.placeholder = i + 1;
      input.id = `inp${i + 1}`;
      namesPlayer.appendChild(input);
    }
  }
});

btnName.addEventListener("click", (e) => {
  e.preventDefault();
  // numPlayer=parseInt(numP.value);
  for (let i = 0; i < numPlayer; i++) {
    const inp = document.querySelector(`#inp${i + 1}`);
    ArrNamePlayer[i] = inp.value;
    chooseRole[i] = arrRole[i];
  }
  for (let i = 0; i < numPlayer; i++) {
    const inp = document.querySelector(`#inp${i + 1}`);
    if (inp.value === "") {
      flagInp = true;
    } else {
      flagInp = false;
    }
  }

  let i = 0;

  if (flagInp === false) {
    namePlayer.style.transition = "all 500ms";
    namePlayer.style.opacity = "0";
    hidden = setTimeout(display(namePlayer), 300);
    clearTimeout(hidden);
    createRoles.style.display = "block";
    displayT = setTimeout(displayOn(createRoles), 300);
    clearTimeout(displayT);

    const h2 = document.createElement("h2");
    h2.className = "nameH2";
    h2.innerHTML = ArrNamePlayer[i];
    createRole.appendChild(h2);

    btnNext.disabled = true;
    btnNext.classList.add("disabled");

    btnRole.addEventListener("click", () => {
      if (i < numPlayer) {
        let randNum = Math.round(Math.random() * (chooseRole.length - 1));
        chooseRoleSelect[i] = chooseRole[randNum];
        chooseRole.splice(randNum, 1);
        playerRole[i]=`${ArrNamePlayer[i]}=${chooseRoleSelect[i]}`;
        const h2Rol = document.createElement("h2");
        h2Rol.className = "roleH2";
        h2Rol.innerHTML = chooseRoleSelect[i];
        rolePlayer.appendChild(h2Rol);
        btnRole.disabled = true;
        btnRole.className = "disabled";

        btnNext.disabled = false;
        btnNext.classList.remove("disabled");
      }
    });
    btnNext.addEventListener("click", () => {
      btnNext.disabled=true;
      btnNext.classList.add("disabled");
      if (i < numPlayer - 1) {
        i = i + 1;
        let timeOutVar = 5000;
        let ti = timeOutVar / 1000;

        const setTime = setInterval(() => {
          timeOut.innerHTML = `${ti}`;
          ti = ti - 1;
        }, 1000);
        const timeRole = setTimeout(() => {
          timeOut.innerHTML = "";
          let roleH2 = document.querySelector(".roleH2");
          let nameH2 = document.querySelector(".nameH2");
          roleH2.remove();
          nameH2.remove();

          const h2 = document.createElement("h2");
          h2.className = "nameH2";
          h2.innerHTML = ArrNamePlayer[i];
          createRole.appendChild(h2);
          btnRole.disabled = false;
          btnRole.classList.remove("disabled");

          btnNext.disabled = true;
          btnNext.classList.add("disabled");
          clearTimeout(timeRole);
          clearInterval(setTime);
        }, timeOutVar + 2000);
      } else {
        alert("گاد فادر.... دادا اطلاق نقش ها تموم شد");
        let roleH2 = document.querySelector(".roleH2");
        let nameH2 = document.querySelector(".nameH2");
        roleH2.remove();
        nameH2.remove();

        const btnNextLevels = document.querySelector("#btnNextLevels");
        btnStartGame.innerHTML = "شروع بازی ";
        btnNextLevels.appendChild(btnStartGame);
        btnNext.disabled = true;
        btnNext.classList.add("disabled");
      }
    });
  } else {
    alert("نام تمام بازیکن ها را وارد نمایید ");
  }
  btnStartGame.addEventListener("click", () => {
    createRoles.style.display = "none";
    main.style.display = "flex";
    // -----------------------------------------------------------------
    const txtStatues = document.querySelector("#txtStatues");
    const mafia = document.querySelector("#mafia");
    const city = document.querySelector("#city");
    txtStatues.innerHTML = "شب می شود - مافیا های بازی بیدار شوند ";
    
    for(let i=0;i<playerRole.length;i++){
      let listMafia = document.createElement("p");
      let listShahr = document.createElement("p");
      listMafia.classList.add("listMafia");
      listShahr.classList.add("listShahr");
      let temp=playerRole[i].split("=");
      console.log(temp);
      if(temp[1]==="پدر خوانده" || temp[1]==="دکتر لکتر" || temp[1]==="جوکر" || temp[1]==="مافیای ساده"){
        listMafia.innerHTML=`${temp[0]} : ${temp[1]}`;
        mafia.appendChild(listMafia);
        arrMafia[i]=playerRole[i];
      }else{
        listShahr.innerHTML=`${temp[0]} : ${temp[1]}`;
        city.appendChild(listShahr);
        arrShahr[i]=playerRole[i];
      }
    }
    console.log(arrMafia);
    console.log(arrShahr);
  });
});

function display(element) {
  element.style.display = "none";
}
function displayOn(element) {
  element.style.transition = "all 1000ms";
  element.style.opacity = "1";
}
