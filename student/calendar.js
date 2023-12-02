const EVENTS = {
    // september
    8: {
        21: {
            type: "office-hours",
        },
        22: {
            type: "homework",
            description: "Homework 1 Due",
        },
        24: {
            type: "office-hours",
        },
        28: {
            type: "homework",
            description: "Homework 2 Due",
        },
        30: {
            type: "lab",
            description: "Lab 1 Due",
        },
    },
    // october
    9: {
        3: {
            type: "office-hours",
        },
        4: {
            type: "homework",
            description: "Homework 3 Due",
        },
        5: {
            type: "lab",
            description: "Lab 2 Due",
        },
        10: {
            type: "office-hours",
        },
        13: {
            type: "quiz",
            description: "Quiz 1",
        },
        16: {
            type: "homework",
            description: "Homework 4 due",
        },
        17: {
            type: "office-hours",
        },
        19: {
            type: "lab",
            description: "Lab 3 Due",
        },
        24: {
            type: "office-hours",
        },
        28: {
            type: "homework",
            description: "Homework 5 due",
        },
    },
    // november
    10: {
        6: {
            type: "office-hours",
        },
        7: {
            type: "homework",
            description: "Homework 6 due",
        },
        9: {
            type: "lab",
            description: "Lab 4 Due",
        },
        13: {
            type: "office-hours",
        },
        16: {
            type: "lab",
            description: "Lab 5 Due",
        },
        21: {
            type: "homework",
            description: "Homework 7 due",
        },
        22: {
            type: "quiz",
            description: "Quiz 2",
        },
        30: {
            type: "office-hours",
        },
    },
    // december
    11: {
        1: {
            type: "lab",
            description: "Lab 6 Due",
        },
        2: {
            type: "quiz",
            description: "Quiz 3",
        },
        4: {
            type: "homework",
            description: "Homework 8 due",
        },
    },
};

const resetCalendar = ()=> {
    const numbers = document.querySelectorAll("td")
    numbers.forEach ((day)=>{
        day.className = " ";
        day.innerHTML = " ";
    });
};

const initializeCalendar = (dirtydate)=> {
    const dateArg = DateFns.toDate(dirtydate ? dirtydate : Date.now());
    const startOfMonth = DateFns.startOfMonth(dateArg);
    const startDay = startOfMonth.getDay();
    const endOfMonth = DateFns.endOfMonth(dateArg);
    const endDate = endOfMonth.getDate();
    

    const days = document.querySelectorAll("td");

    for (let i = startDay, j = 1; j<=endDate; i++, j++){
        const day = document.createElement("span");
        day.textContent = j;
        days[i].appendChild(day);
    } 
    return [dateArg , days];
};

const populateEvents = (date, days) => {
    
    const events = EVENTS[date.getMonth()];
    if(!events){
        return;
    }

    const startOfMonth = DateFns.startOfMonth(date);
    const startDay = startOfMonth.getDay();

    for(let [index, event] of Object.entries(events)){
        const day = days[parseInt(index, 10) + startDay - 1 ];
        day.classList.add(event.type);
    }
};

const showMonths = (dirtyMonth) =>{
    resetCalendar();

    const month = Math.max(dirtyMonth , 9);
    const selectMonth= document.querySelector(
        `.month-selector [value="${month}"]`
    ); 

    selectMonth.checked = true;

    selectMonth.parentElement.classList.add("selected");

    const [date,days] = initializeCalendar(Date.parse(`2022-${month}-02`));

    populateEvents(date, days);
};

const main = () => {
    console.log("in main"); 
    
    showMonths(new Date().getMonth()+1);


    const radio = document.querySelectorAll(".month-selector input");
   
    radio.forEach ((input) => {
        input.addEventListener("change" , (event)=>{
            for (const input of radio){
                input.parentElement.classList.remove("selected");
            }

            const current= event.currentTarget;
            if(current.checked){
                current.parentElement.classList.add("selected");
                showMonths(current.value);
            }

        });

    });
};


window.addEventListener("load", main);