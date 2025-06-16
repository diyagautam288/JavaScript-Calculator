function isNumber(char) {
    return /^\d$/.test(char);
}
document.getElementById("answer").readOnly = true
let screen = document.getElementById("answer")
let buttons = document.querySelectorAll("button")
let screenValue = ""
let flag = 0
let isSign = true
for (item of buttons) {
    item.addEventListener("click", e => {
        let buttonText = e.target.innerText;
        if (isNumber(buttonText)) {
            if (flag == 1) {
                screenValue = buttonText;
                flag = 0;
            }
            else {
                screenValue += buttonText
            }
            screen.value = screenValue
            isSign = false
            screen.classList.remove("negative");
        }
        else if (buttonText == 'X' && !isSign) {
            if (flag == 1) {
                flag = 0
            }
            buttonText = "*"
            isSign = true
            screenValue += buttonText
            screen.value = screenValue
        }
        else if (buttonText == "(" || buttonText == ")") {
            if (flag == 1) {
                flag = 0;
            }
            screenValue += buttonText;
            screen.value = screenValue;
        }
        else if (buttonText == "C") {
            if (flag == 1) {
                flag = 0;
            }
            screenValue = "";
            screen.value = screenValue;
            screen.classList.remove("negative");
            isSign = true;
        }
        else if (buttonText == "=") {
            checkForBracketMulti();
            if (parseFloat(screen.value) < 0) {
                screen.classList.add("negative");
            } else {
                screen.classList.remove("negative");
            }
        }
        else if (buttonText == "CE") {
            if (screenValue.length > 0) {
                screenValue = screenValue.slice(0, -1);
                screen.value = screenValue;
            }
        }
        else {
            if (flag == 1) {
                flag = 0;
            }
            if (!isSign) {
                screenValue = screen.value + buttonText;
                screen.value = screenValue;
                isSign = true;
            }
            screen.classList.remove("negative");
        }
    })
}
// window.onerror = function () {
//     alert("PLEASE INPUT VALID EXPRESSION");
//     screenValue = "";
//     screen.value = screenValue;
//     screen.classList.remove("negative"); 
//     console.clear();
// };

function checkForBracketMulti() {
    try {
        if (eval(screenValue) !== undefined) {
            if (!Number.isInteger(eval(screenValue))) {
                screen.value = eval(screenValue).toFixed(2);
            }
            else {
                screen.value = eval(screenValue);
            }

            lastScreenValue = screenValue;
            screenValue = screen.value;
            let result = parseFloat(screen.value); 

            if (parseFloat(screen.value) < 0) {
                screen.classList.add("negative");
            } else {
                screen.classList.remove("negative");
            }

            let storedHistory = localStorage.getItem("calcHistory");
            
            let calcHistory = [];

            if (storedHistory) {
                try {
                    calcHistory = JSON.parse(storedHistory);
                } catch (e) {
                    console.error("History JSON parse failed:", e);
                    calcHistory = [];
                }
            }
            

            calcHistory.push({ lastScreenValue: lastScreenValue, result: result });
            localStorage.setItem("calcHistory", JSON.stringify(calcHistory));

        }
        flag = 1;
    }
    catch (error) {
        // alert("PLEASE INPUT VALID EXPRESSION");
        screenValue = "";
        screen.value = screenValue;
        screen.classList.remove("negative");
        // console.clear();
    }
}
