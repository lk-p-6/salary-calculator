document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form-calc");

    const calcCurrentMonth = document.querySelector("#currentMonth");
    const toAddInputBigBuying = document.querySelector("#parentElementForInputBigBuying");
    const addInputBigBuying = document.querySelector("#month-big-buying--add");
    const resultEntering = document.querySelector("#resultParentEntering");
    
    const months = [
        "Январь", "Февраль", "Март", "Апрель", 
        "Май", "Июнь", "Июль", "Август", 
        "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
      ];

    const regex = /[\(\-\@]/;

    const inputBigBuyingElement = document.createElement("input");
    inputBigBuyingElement.classList.add("form-calc__field-input", "month-big-buying__field", "monthBigBuying");
    inputBigBuyingElement.setAttribute("type", "text");
    inputBigBuyingElement.setAttribute("placeholder", "'Месяц' - спец. расходы");
    toAddInputBigBuying.insertBefore(inputBigBuyingElement, toAddInputBigBuying.lastElementChild);

    function changingMonthes(){
        const additionalExpenses = document.querySelectorAll(".monthBigBuying");

        if(calcCurrentMonth.value === "" || calcCurrentMonth.value > 12 || calcCurrentMonth.value < 0 || regex.test(calcCurrentMonth.value) === true){
            additionalExpenses.forEach((input) => {
                input.setAttribute("placeholder", "'Месяц' - спец. расходы")
            })
        } else {
            let increasingMonth = calcCurrentMonth.value;
            for(let i = 0; i < additionalExpenses.length; i++){
                additionalExpenses[i].setAttribute("placeholder", `${months[increasingMonth-1]} - спец. расходы`)
                increasingMonth++;
                if(increasingMonth > 12){
                    increasingMonth = 1;
                }
            }
        }
    }

    function creatingNodeResultBefore(resultBefore){
        const inputCreatingNewNodeBefore = document.createElement("p");

        inputCreatingNewNodeBefore.classList.add("header__result-data");
        inputCreatingNewNodeBefore.textContent = resultBefore;

        return inputCreatingNewNodeBefore;
    }

    function creatingNodeResultAfter(resultAfter){
        const inputCreatingNewNodeAfter = document.createElement("p");

        inputCreatingNewNodeAfter.classList.add("header__result-data");
        inputCreatingNewNodeAfter.textContent = resultAfter;

        return inputCreatingNewNodeAfter;
    }

    function creatingNodeResultSpace(space){
        const inputCreatingNewNodeSpace = document.createElement("p");

        inputCreatingNewNodeSpace.classList.add("header__result-data");
        inputCreatingNewNodeSpace.textContent = space;

        return inputCreatingNewNodeSpace;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        while (resultEntering.firstChild) {
            resultEntering.removeChild(resultEntering.firstChild);
        }

        // // range of calculation
        const currentMonth = parseInt(document.querySelector("#currentMonth").value); 
        const calcMonth = parseInt(document.querySelector("#calcMonth").value);

        // bank ballance, month salary, some big buying that has to be in month and average month expenses
        const startBal = parseInt(document.querySelector("#startBal").value);
        const monthSalary = parseInt(document.querySelector("#monthSalary").value);
        const nodeListBigBuying = document.querySelectorAll(".monthBigBuying");
        const monthBigBuying = {};
        const monthAvgExpenses = parseInt(document.querySelector("#monthAvgExpenses").value);

        nodeListBigBuying.forEach((input, index) => {
            monthBigBuying[index+1] = parseInt(input.value);
        });

        let finalMonthRes = startBal;

        for (let i = currentMonth; i <= calcMonth; i++){
            finalMonthRes += monthSalary;
            if(i === currentMonth){
                finalMonthRes -= monthSalary;
            }
            resultEntering.appendChild(creatingNodeResultBefore(`Балланс на счету за ${months[i-1]} 9 число (до зарплаты за ${months[i-1]}): ${finalMonthRes}`));
            for (let j = 0; j <= Object.keys(monthBigBuying).length; j++){
                if (parseInt(Object.keys(monthBigBuying)[j]) === i){
                    finalMonthRes -= monthBigBuying[`${i}`];
                }
            }
            finalMonthRes -= monthAvgExpenses;
            resultEntering.appendChild(creatingNodeResultAfter(`Балланс на счету за ${months[i]} 9 число (до зарплаты за ${months[i]}): ${finalMonthRes}`));
        }
    })

    calcCurrentMonth.addEventListener("input", () => {
        changingMonthes();
    })

    addInputBigBuying.addEventListener('click', () => {
        const secondLastChildrenOfParent = toAddInputBigBuying.children[toAddInputBigBuying.children.length-2];
        const cloneInputBuying = secondLastChildrenOfParent.cloneNode(true);

        cloneInputBuying.value = '';

        secondLastChildrenOfParent.insertAdjacentElement('afterend', cloneInputBuying);
        changingMonthes();
    })
});
