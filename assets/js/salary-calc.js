// vars

// range of calculation
let currentMonth = 1; // 1
let calcMonth = 5;

// bank ballance, month salary, some big buying that has to be in month and average month expenses
let startBal = 14810;
let monthSalary = 6500;
let monthBigBuying = {
    1: 8499,
    2: 8499
};
let monthAvgExpenses = 1000;

// the final result of each month
let finalMonthRes = startBal;

//monthes for printing
const months = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August", 
    "September", "October", "November", "December"
];

// calculation 
for (let i = currentMonth; i <= calcMonth; i++){
    finalMonthRes += monthSalary;
    if(i === currentMonth){
        finalMonthRes -= monthSalary;
    }
    console.log(`9th of ${months[i-1]} ballance (before ${months[i-1]} Salary): ${finalMonthRes}`);
    for (let j = 0; j <= Object.keys(monthBigBuying).length; j++){
        if (parseInt(Object.keys(monthBigBuying)[j]) === i){
            finalMonthRes -= monthBigBuying[`${i}`];
        }
    }
    finalMonthRes -= monthAvgExpenses;
    console.log(`9th of ${months[i]} ballance (before ${months[i]} Salary): ${finalMonthRes}`);
    console.log("--------------------");
    console.log("--------------------");
}