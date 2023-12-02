//Question 1 - What attribute did you use to not block the browser while parsing JavaScript?
// I made sure to precede each js file call with "defer asynch". 
//The async attribute makes it so that the browser can move on 
//from the script without having to read it all at the top. 
//Then the defer makes the browser wait to do execute anything 
//until the whole DOM is downloaded. 

//Question 2 - What do you think is happening when you see the error message?
//when I get the error, it seems that the chart.min.js is taking 
//upwards of 400ms while the rest of the local files only take 
//single digit number of ms. This tells me that the chart.min.js 
//is not ready by the time that its needed which is why we bring 
//in the setInterval function. The setInterval function checks 
//if its done every 100ms instead of all the time.

//Question 3 - What does the setInterval function do?
//The setInterval function calls a function repeatedly with a 
//set ampount of time to pause between each call. The time, in 
//milliseconds, is set at the bottom of the function.

//Question 4 - What would happen if the clearInterval call didn't exist?
//Every setInterval call function would run indefinitely.

//Question 5 - What does the 100 in the above code snippet signify?
// The 100 signifies a 100milisecond pause between each function 
//call.



const createGradeByWeekChart = () => {
    const ctx = document.querySelector("#line-graph").getContext("2d");
    const trendChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [
          {
            label: "Your Grade",
            data: [65, 59, 80, 81, 56, 55, 40, 63, 70, 79],
            fill: false,
            borderColor: "#5973b6",
            backgroundColor: "#5973b6",
            tension: 0.3,
          },
          {
            label: "Class Average",
            data: [60, 70, 80, 74, 80, 85, 82, 80, 86, 82],
            fill: false,
            borderColor: "#95a5a6",
            backgroundColor: "#95a5a6",
            tension: 0.3,
            borderDash: [5, 5],
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Your Grade By Week",
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Grade",
            },
            beginAtZero: true,
            min: 0,
            max: 100,
            grid: {
              display: false,
            },
          },
          x: {
            title: {
              display: true,
              text: "Week",
            },
            grid: {
              display: false,
            },
          },
        },
        aspectRatio: 1,
      },
    });
  }; 


function createPointsInClassChart() {
    const context =  document.querySelector("#pie-chart").getContext("2d");
    const piechart = new Chart(context, {
        type: 'pie',
        data: {
            labels: ["Points Available", "Points Accumulated"],
            datasets: [{
                data: [40, 60],
                backgroundColor: [
                    "rgb(76, 135, 190)",
                    "#5973b6",
                ],
                borderWidth: 1,
            },], 
                    
            options: {      
                            
                aspectRatio: 1,
                plugins: {
                    title: {
                        display: true,
                        text: "Points in Class",
                    },
                    legend: {
                        display: false,
                    },
                },
            },
        }      
    });
}

const createPointsByCategoryChart = () => {
    const canvas = document.querySelector("#bar-graph").getContext("2d");
    const chart =  new Chart(canvas, 
        {
            // the type of chart we want to use
            type: "bar",
            data: {
                // which axis shows these labels?
                labels: ["Quizzes", "Labs", "Theory", "Practice"],
                datasets: [
                // is this the top or bottom data set?
                // what happens if there's only 1 dataset?
                    {
                    label: "Earned",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: "rgb(76, 135, 190)",
                    },
                    {
                    label: "Missed",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: "#5973b6",
                    },
                    {
                    label: "Ungraded",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: "#eee",
                    },
                ],
            },
            options: {
                scales: {
                y: {
                stacked: true,
                grid: {
                    display: false,
                },
                },
                },
                x: {
                    stacked: true,
                    grid: {
                        display: false,
                    },
                },
                aspectRatio: 1,
                plugins: {
                    title: {
                    display: true,
                    text: "Points by Category",
                    },
                    legend: {
                    display: false,
                    },
                },
            },
        }
    )
};

let interval;
const main=() => {
    if(interval && window.Chart){
        createGradeByWeekChart();
        createPointsByCategoryChart();
        createPointsInClassChart();
        clearInterval(interval);
        return;
    }
};
interval = setInterval(main, 100);