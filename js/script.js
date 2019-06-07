/*eslint-env browser*/
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};


/************************************************
**
    Build Your Order - Enable/Disable Options
        Toggles Cheese and Sauce options
**        
************************************************/
function toggleCheeseSauce(toggle) {
    "use strict";
    $("toggleCheese").disabled = toggle;
    $("toggleSauce").disabled = toggle;
    var toppings =  document.getElementsByClassName("toppings");
    for (var x = 0; x <  toppings.length; x++) {
        toppings[x].disabled = toggle;
    }  
}


/************************************************
**
    canEdit - Will make it so that it cannot be
              edited anymore. Toggle on/off
        Pay Now
        Change Delivery Location or Order
**        
************************************************/
function canEdit(formId, isReadOnly) {
    "use strict";
    var x = document.forms[formId];
    for(var i = 0, xLength = x.length; i< xLength; i++) {
      x.elements[i].readOnly = isReadOnly;
      x.elements[i].disabled = isReadOnly;
    }
}



/************************************************
**
    validateInput - Validity Function
        If is valid, individual form will be green
        If invalid, form will be red with error
        
**        
************************************************/
function validateInput(inputName, isValid, feedback) {
    "use strict";
    if(isValid!==""){
        var removeClass = isValid ? "is-invalid" : "is-valid";
        var addClass = isValid ? "is-valid" : "is-invalid";
        var removeClass_feedback = isValid ? "invalid-feedback" : "valid-feedback";
        var addClass_feedback = isValid ? "valid-feedback" : "invalid-feedback";
        $(inputName).classList.remove(removeClass);
        $(inputName).classList.add(addClass);
        if($(inputName).nextElementSibling.nodeName !== "DIV") {      
            $(inputName).nextElementSibling.nextElementSibling.classList.remove(removeClass_feedback);
             $(inputName).nextElementSibling.nextElementSibling.classList.add(addClass_feedback);
             $(inputName).nextElementSibling.nextElementSibling.innerHTML = feedback;
        } else {
          $(inputName).nextElementSibling.classList.remove(removeClass_feedback);
          $(inputName).nextElementSibling.classList.add(addClass_feedback);
          $(inputName).nextElementSibling.innerHTML = feedback;
        }
    }else{
        $(inputName).classList.remove("is-invalid");
        $(inputName).classList.remove("is-valid");
        if($(inputName).nextElementSibling.nodeName !== "DIV") {      
            $(inputName).nextElementSibling.nextElementSibling.classList.remove("is-invalid");
             $(inputName).nextElementSibling.nextElementSibling.classList.remove("is-valid");
             $(inputName).nextElementSibling.nextElementSibling.innerHTML = feedback;
        } else {
          $(inputName).nextElementSibling.classList.remove("invalid-feedback");
          $(inputName).nextElementSibling.classList.remove("valid-feedback");
          $(inputName).nextElementSibling.innerHTML = feedback;
        }
    }  
}


/************************************************
**
    Checks if input is invalid/empty.
    Returns true or false
**        
************************************************/
function isEmpty(input) {
    "use strict";
    return $(input).value.trim() === "" ? true : false;
}


/************************************************
**
    Checks to make sure there is a first and
    last name
**        
************************************************/
function checkName(theName) {
    "use strict";
    return /^[a-z]+ [a-z]+$/i.test(theName);
}


/************************************************
**
    Checks to see if the address is valid
**        
************************************************/
function checkAddress(address) {
    "use strict";
    return /\d+[ ](?:[A-Za-z0-9.-]+[ ]?)/i.test(address);
}


/************************************************
**
    Checks the suite number
**        
************************************************/
function checkSuite(s) {
    "use strict";
    return s.trim() ===""? true :/^([a-zA-Z0-9 _-]+)$/.test(s);
}


/************************************************
**
    Checks to see if the city is valid 
**        
************************************************/
function checkCity(city) {
    "use strict";
    return /(?:[A-Z][a-z.-]+[ ]?)+/i.test(city);
}



/************************************************
**
    Checks 2 character user validation for state
    Note: State must be valid as well
**        
************************************************/
function checkState(state) {
    "use strict";
    var obj = /^(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i; 
    return obj.test(state);
}


/************************************************
**
    Checks zipcode. 5 digits
**        
************************************************/
function checkZip(zip) {
    "use strict";
    return /^\d{5}(-\d{4})?$/.test(zip);
}


/************************************************
**
    Checks phone number with combination of
    dashes and parenthesis
**        
************************************************/
function checkPhone(num) {
    "use strict";
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(num);
}


/************************************************
**
    Checks Email. 
        Has to have an @ and a period . symbol
**        
************************************************/
function checkEmail(email) {
    "use strict";
    return /\S+@\S+\.\S+/.test(email);
}



/**
Credit Card Number Validation Rules

Card Type	|  Card Number Prefix	|   Number of Digits (Length)	|  Checksum Digit *
Visa	    |           4	        |          13 or 16	            |           10
MasterCard	| 51, 52, 53, 54, or 55	|             16	            |           10
American Ex |   	   37	        |             15                |           10

For almost all credit cards, the Luhn Formula is used to determine whether or not the credit card number is even valid. This algorithm generates a single digit which is then used as the last digit of the card number. By performing the same calculations, you can determine if the number matches the checksum digit and is therefore valid.

* The Luhn Formula Explained

1.	Double the value of alternate digits beginning with the second to last digit from the right. Or, reverse the string and begin with second digit from the left.
2.	Each doubled value becomes individual digits (16 becomes a 1 and a 6)
3.	Add the individual digits in step 1 to each of the values of the other digits
4.	Divide the total by the checksum digit (10).
5.	If the checksum digit divides evenly into the total, the card number is valid

Examples (Visa):

45121130148 4325 2
852221602416462102
8+5+2+2+2+1+6+0+2+4+1+6+4+6+2+1+0+2
Sum = 54
54/10 leaves a remainder. Card number is invalid.

4512113014643252
45121130146 4325 2
852221602412462102
8+5+2+2+2+1+6+0+2+4+1+2+4+6+2+1+0+2
Sum=50
50/10 leaves no remainder. Card number is valid.

Notes:

1.	If the card number is invalid, display that error next to the card number field. Allow the user to reenter.
2.	Validate the card number so that an error appears if the user enters anything other than numeric.
3.	Validate based on the number of digits first before you perform checksum validation.
4.	Display the card type to the user based on the entered card number prefix.
**/
/************************************************
**
    Checks CVV
**        
************************************************/
function checkCVV(cvv) {
    "use strict";
    return /^[0-9]{3,4}$/.test(cvv);
}


/************************************************
**
    Checks to make sure CVV is valid
**        
************************************************/
function checkExp(month,year) {
    "use strict";
    var thisYr = new Date().getFullYear();

    if(thisYr == parseInt(year,10)) {     
        var thisMo = new Date().getMonth() + 1;
        return parseInt(month,10) >= thisMo;
    } 
    return true;
}


/************************************************
**
    Checks the validity of the card prefix
    If card number is empty and its algorithm
**        
************************************************/
function checkCardPrefix(cardNum) {
    "use strict";
    if(cardNum!==""){
        var validPrefix = ["4","5","3"];
        var validPrefixNext = ["40","41", "42", "43", "44", "45", "46", "47", "48", "49","51","52","53","54","55","37"];
        if(cardNum.length === 1){
            return validPrefix.indexOf(cardNum[0]) > -1;
        }
        else {
            return validPrefixNext.indexOf(cardNum.substr(0,2)) > -1 ;
        }

    } else {
        return false;
    }  
}
 

/************************************************
**
    Checks if its not a number
**        
************************************************/   
function checkNaN(cardNum) {
    "use strict";
    var last = cardNum.slice(-1);
    return isNaN(parseInt(last, 10));        
}


/************************************************
**
    Checks different valid card lengths
**        
************************************************/
function checkLength(cardNum) {
    "use strict";
    var prefix = parseInt(cardNum.substr(0,2), 10);
    switch(prefix) {
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 48:
        case 49:
            //If prefix between 40 and 49 and card length is between 13 and 16
            //VISA
            if(cardNum.length === 13 || cardNum.length === 16) {
                return true;
            }
            break;
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
            //If prefix between 51 and 55 and card length is 16
            //Master Card
            if(cardNum.length === 16) {
                return true;
            }
            break;
        case 37:
            //If prefix is 37 and card length is 15
            //American Express
            if(cardNum.length === 15) {
                return true;
            }
            break;
        default:
            return false;
    }
}


/************************************************
**
    Checks entire credit card number if valid
**        
************************************************/
function checkCard(value) {
    "use strict";
    var card="", checkNum = 0, num = 0, isEven = false;  
    for (var x = value.length - 1; x >= 0; x--) {
        card = value.charAt(x);
        num = parseInt(card, 10);

        if (isEven) {
            if ((num *= 2) > 9) {                  
                num = num.toString();
            }
        }

        if(typeof num === 'string' || num instanceof String) { 

            checkNum += parseInt(num[0], 10) + parseInt(num[1], 10);
        }
        else {
            checkNum += num;
        }

        isEven = !isEven;
    }
    return (checkNum % 10) == 0;
}
 

/************************************************
**
        Returns the card type 
            (Visa/MasterCard/American Express)
**        
************************************************/   
function cardType(cardNum) {
    "use strict";
    switch(cardNum.substr(0,1)) {
        case "4":
            return "Visa";
        case "5":
            return "Mastercard";
        case "3":       
            return "American Express";
        default:
            break;
    }
}


/************************************************
**
        Validates Delivery info in user info
**        
************************************************/ 
function checkDelivery() {
    "use strict";
    var isValid=[];
    var items = ["name", "addressType", "stAddress", "city", "state", "zipcode", "phoneno", "email"];
    for (var i = 0; i< items.length; i++) {
        if(isEmpty(items[i])) {
            validateInput(items[i], false, $(items[i]).name + " is required");
            isValid.push(false);
        } else {
                switch(items[i]) {
                    case "name":
                        isValid.push(checkName($(items[i]).value));
                        checkName($(items[i]).value) ? validateInput(items[i], true, "Confirmed.") : validateInput(items[i], false, $(items[i]).name + "is invalid");
                        break;
                    case "addressType":
                        if($(items[i]).value === "other" && isEmpty("otherAddressType") ) {
                            validateInput("otherAddressType", false, $("otherAddressType").name + " is required");
                            isValid.push(false);
                        } else if ($(items[i]).value !== "house" && $(items[i]).value !== "other" && isEmpty("suiteno") ) {
                             validateInput("suiteno", false, $("suiteno").name + " is required");
                             isValid.push(false);
                        } else if ($(items[i]).value !== "house" && !checkSuite("suiteno") ) {
                             validateInput("suiteno", false, $("suiteno").name + " is invalid");
                             isValid.push(false);
                        }
                        else {
                            validateInput(items[i], true, "Confirmed.");
                            validateInput("suiteno", true, "Confirmed.");
                             isValid.push(true);
                        }
                        break;
                    case "stAddress":
                        isValid.push(checkAddress($(items[i]).value));
                        checkAddress($(items[i]).value) ? validateInput(items[i], true, "Confirmed.") : validateInput(items[i], false, $(items[i]).name + "is invalid");
                        break;
                    case "city":
                        isValid.push(checkCity($(items[i]).value));
                        checkCity($(items[i]).value) ? validateInput(items[i], true, "Confirmed.") : validateInput(items[i], false, $(items[i]).name + "is invalid");
                        break;
                    case "state":
                        isValid.push(checkState($(items[i]).value));
                        checkState($(items[i]).value) ? validateInput(items[i], true, "Confirmed.") : validateInput(items[i], false, $(items[i]).name + "is invalid");
                        break;
                    case "zipcode":
                        isValid.push(checkZip($(items[i]).value));
                        checkZip($(items[i]).value) ? validateInput(items[i], true, "Confirmed.") : validateInput(items[i], false, $(items[i]).name + "is invalid");
                        break;
                    case "phoneno":
                        isValid.push(checkPhone($(items[i]).value));
                        checkPhone($(items[i]).value) ? validateInput(items[i], true, "Confirmed.") : validateInput(items[i], false, $(items[i]).name + "is invalid");
                        break;
                    case "email":
                        isValid.push(checkEmail($(items[i]).value));
                        checkEmail($(items[i]).value) ? validateInput(items[i], true, "Confirmed.") : validateInput(items[i], false, $(items[i]).name + "is invalid");
                        break;
                    default:
                }
        }
    }
    
    return !isValid.includes(false);    
}


/************************************************
**
        Checks if user has chosen a pizza 
        by checking the total
        Does not let the user continue until 
        you have chosen menu items
**        
************************************************/ 
function checkOrder() {
    "use strict";
    if ($("total").value !== ""){
        return true;
    }else {
        window.alert('Please order your pizza!');
        return false;
    }      
}


function checkBilling() {
    "use strict";
    
    var isInputsValid = [], isSelectsValid = [];
    var inputs = document.forms["billingInfo"].querySelectorAll("input[type=text]");

    for (var i = 0; i< inputs.length; i++) {
        if(isEmpty(inputs[i].id)) {
            if (inputs[i].id === "bSuiteNo") {
                isInputsValid.push(true);
                
            } else {
                validateInput(inputs[i].id, false, inputs[i].name + " is required");
                isInputsValid.push(false);
            }
           
        } else {
             switch(inputs[i].id) {
                    case "cardHolderName":
                        isInputsValid.push(checkName($(inputs[i].id).value));
                        break;
                    case "cardNumber":
                        isInputsValid.push(checkCard($(inputs[i].id).value));
                        break;
                    case "bStAddress":
                        isInputsValid.push(checkAddress($(inputs[i].id).value));
                        break;
                    case "bSuiteNo":
                        isInputsValid.push(checkSuite($(inputs[i].id).value));
                        break;
                    case "bCity":
                        isInputsValid.push(checkCity($(inputs[i].id).value));
                        break;
                    case "bState":
                        isInputsValid.push(checkState($(inputs[i].id).value));
                        break;
                    case "bZipCode":
                        isInputsValid.push(checkZip($(inputs[i].id).value));
                        break;
                    case "cvv":
                        isInputsValid.push(checkCVV($(inputs[i].id).value));
                        break;
                    default:
            }
            isInputsValid[i] ? validateInput(inputs[i].id, true, "Confirmed.") : validateInput(inputs[i].id, false, inputs[i].name + " is invalid");
        }
    }
    var message = "";
    
    
    var selects = document.forms["billingInfo"].getElementsByTagName('select'); 
    
    
    for (var x = 0; x< selects.length; x++) {
        if(isEmpty(selects[x].id)) {
            isSelectsValid.push(false);
            message += selects[x].name + " ";
            validateInput(selects[x].id, false, message + "is required");
        } else {
           if(x !== 0) {
               isSelectsValid.push(checkExp(selects[x-1].value,selects[x].value));
           }
        }
        
    }
    return !isInputsValid.includes(false) &&  !isSelectsValid.includes(false);
          
}

function displayCardInfo(cardNum, creditCardInputId) {
    "use strict";
    var cardNumLength = cardNum.length;
    switch(cardType(cardNum)) {
        case "Visa":
            if (cardNumLength < 16 && cardNumLength !=13) {
                return  validateInput(creditCardInputId, false, "Valid number of digits for Visa is 13 or 16");
            } else if (cardNumLength > 16) {
                return  validateInput(creditCardInputId, false, "Your Visa contains more than 16 digits which is invalid.");
            }
            break;
        case "Master":
            if (cardNumLength < 16) {
                return  validateInput(creditCardInputId, false, "Valid number of digits for Maseter Card is 16");
            } else if (cardNum.length > 16) {
                return  validateInput(creditCardInputId, false, "Your Master Card contains more than 16 digits which is invalid.");
            }
            break;
        case "American Express":       
            if (cardNumLength < 15) {
                return  validateInput(creditCardInputId, false, "Valid number of digits for American Express is 15");

            } else if (cardNum.length > 15) {
                return  validateInput(creditCardInputId, false, "Your American Express contains more than 15 digits which is invalid.");
            }
            break;
        default:
            break;
    }
}


function pizzaTotal() {
    "use strict";
    
    var count = 0;
    var toppings = document.getElementsByClassName("toppings");
    for (var i=0; i< toppings.length; i++) {       
       if (toppings[i].checked == true){
          count++;
       }
    }
    
    var sizeCost = parseFloat($("sizeCost").value);
    var toggleCheese = parseFloat($("toggleCheese").value);
    var toggleSauce = parseFloat($("toggleSauce").value);
    var subtotalToppings = count * 0.99;
    var total = parseFloat((sizeCost + toggleCheese + toggleSauce + subtotalToppings).toPrecision(4));

    $("total").value = "$" + total;
}


window.addEventListener("load", function () {
    "use strict";
     var doughSizePrize = {
         handTossed:[{size:"Small", price:"$9.99"},
        {size:"Medium", price:"$12.99"},
        {size:"Large", price:"$14.99"},],
        thinCrust:[{size:"Medium", price:"$11.99"},
        {size:"Large", price:"$13.99"},],
        newYorkStyle:[{size:"Large", price:"$16.99"},
        {size:"Extra Large", price:"$19.99"},],
        glutenFree:[{size:"Small", price:"$10.99"}]}
     
    var doughlist =  document.getElementsByName('dough');
    var doughItems = [].slice.call(doughlist);
    
    $("billingInfo").style.display ="none";
    
    $("otherAddressType").style.display = "none";
    
    toggleCheeseSauce(true);
    
    doughItems.forEach(function (item) {
        "use strict";
        item.addEventListener('change',function(){
      
        var selectedDough = doughSizePrize[item.id];
        $('sizeCost').innerHTML = null;
        for(var i = 0; i < selectedDough.length; i++) {
            var el = document.createElement("option");
            el.textContent = selectedDough[i].size +  " (" + selectedDough[i].price + ")";
            el.value = selectedDough[i].price.substr(1);
            $('sizeCost').appendChild(el);
        }
        toggleCheeseSauce(false);
        pizzaTotal();
       
     });
    });
    
    $("sizeCost").addEventListener("change", pizzaTotal);
    $("toggleCheese").addEventListener("change", pizzaTotal);
    $("toggleSauce").addEventListener("change", pizzaTotal);
    
    var optToppingsList =  document.getElementsByClassName('toppings');
    var optToppingsItems = [].slice.call(optToppingsList);
    
    optToppingsItems.forEach(function (item) {
        "use strict";
        item.addEventListener('change',function(){
            pizzaTotal();
        });
    });
    
    $("name").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(checkName(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("addressType").addEventListener("change", function(e){
        "use strict";
         if(e.currentTarget.value !=="") {
            if(this.value === "other") {
                $("otherAddressType").previousElementSibling.style.display = "none";
                $("otherAddressType").style.display = "block";
                $("otherAddressType").nextElementSibling.style.display = "block";
                validateInput(e.currentTarget.id, true, "");
                validateInput("otherAddressType", false, "Please provide the address type"); 
                validateInput("suiteno", "", ""); 
            } else {
                 $("otherAddressType").previousElementSibling.style.display = "block";
                 $("otherAddressType").style.display = "none";
                 $("otherAddressType").nextElementSibling.style.display = "none";
                
                 if (this.value !== "house") {
                    validateInput("suiteno", false, "Suite Number is required for Address Type: " + $("addressType").value); 
                 }
                 else {
                     validateInput("suiteno", "", "");
                 }
                 validateInput(e.currentTarget.id, true, "Valid!");
            }
           
        } else {
            $("otherAddressType").style.display = "none";
            validateInput(e.currentTarget.id, false, "Please choose an address type");
        }
        
    });
    
     $("otherAddressType").addEventListener("change", function(e){
        "use strict";
         if(e.currentTarget.value !=="") {          
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "Please provide an address type"); 
        }
    });
    
    $("stAddress").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(checkAddress(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });

    $("suiteno").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim();
        if($("addressType").value !== "" && $("addressType").value !== "house" && $("addressType").value !== "other" ) {
            if (e.currentTarget.value === "") {
                validateInput(e.currentTarget.id, false, "Suite Number is required for Address Type: " + $("addressType").value); 
            } else {
                if(checkSuite(e.currentTarget.value)) {
                    validateInput(e.currentTarget.id, true, "Valid!");   
                } else {
                    validateInput(e.currentTarget.id, false, "invalid input"); 
                }
            }
            
        }else{
            if(checkSuite(e.currentTarget.value)) {
                validateInput(e.currentTarget.id, "", "");   
            } else {
                validateInput(e.currentTarget.id, false, "invalid input"); 
            }
        }
        
    });
    
    $("city").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(checkCity(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("state").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim().toUpperCase();
        if(checkState(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("zipcode").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(checkZip(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("phoneno").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(checkPhone(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("email").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(checkEmail(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    

    $("btnFinishBuildPizza").addEventListener("click",function(e) {
        "use strict";
        if (this.innerHTML.trim() === "Pay Now") {
            if((!checkDelivery()) || (!checkOrder())) {
                e.stopImmediatePropagation();     
            }
        }else{
             $("billingInfo").style.display = "none";
             canEdit("deliveryLocation", false);
             canEdit("order", false);
             $("btnFinishBuildPizza").innerHTML = "Pay Now";
             e.stopImmediatePropagation();
        }
      
    });
    
    $("proceedToCheckout").addEventListener("click", function() {
        "use strict";
        $("Confirmation_buildingPizza").style.display = "none";
        $("billingInfo").style.display = "block";
        canEdit("deliveryLocation", true);
        canEdit("order", true);
        $("btnFinishBuildPizza").innerHTML = "Change Delivery Location or Order";
        $("billingInfo").scrollIntoView();
    });
    

    $("sameAsDeli").addEventListener("click", function() {
        "use strict";
        if(this.checked) {

           $("cardHolderName").value = $("name").value;
           $("cardHolderName").readOnly = true;
           $("bStAddress").value = $("stAddress").value;
           $("bStAddress").readOnly = true;
           $("bSuiteNo").value = $("suiteno").value;
           $("bSuiteNo").readOnly = true;
           $("bCity").value = $("city").value;
           $("bCity").readOnly = true;
           $("bState").value = $("state").value;
           $("bState").readOnly = true;
           $("bZipCode").value = $("zipcode").value;
           $("bZipCode").readOnly = true;
        }
        else {
           $("cardHolderName").readOnly = false;
           $("bStAddress").readOnly = false;
           $("bSuiteNo").readOnly = false;
           $("bCity").readOnly = false;
           $("bState").readOnly = false;
           $("bZipCode").readOnly = false;
        }
    });
    
    $("cardHolderName").addEventListener("blur", function(e) {
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(checkName(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bStAddress").addEventListener("blur", function(e) {
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(checkAddress(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bSuiteNo").addEventListener("blur", function(e) {
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(checkSuite(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bCity").addEventListener("blur", function(e) {
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(checkCity(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bState").addEventListener("blur", function(e) {
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(checkState(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bZipCode").addEventListener("blur", function(e) {
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(checkZip(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
   
    $("cvv").addEventListener("blur", function(e) {
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(checkCVV(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Valid!");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    //Obtains the expiration date: the month & checks validity
    $("expiryMonth").addEventListener("blur", function(e){
        "use strict";
        if (isEmpty(e.currentTarget.id) && isEmpty("expiryYear")) {
            validateInput(e.currentTarget.id, false, "Error. Select a month and a year");
            validateInput("expiryYear", false, "Error. Select a month and a year");
        } else if (isEmpty(e.currentTarget.id)) {
            validateInput("expiryYear", "", "");
            validateInput(e.currentTarget.id, false, "Error. Select a month");        
        } else if (isEmpty("expiryYear")) {
            validateInput("expiryYear", false, "");
            validateInput(e.currentTarget.id, "", "Error. Select a year");
        } else if (checkExp(e.currentTarget.value, $("expiryYear").value)) {
            validateInput("expiryMonth", true, "Valid!");
            validateInput("expiryYear", true, "Valid!");
        } else {
            validateInput("expiryMonth", false, "Your card is expired! Please try a different card.");
            validateInput("expiryYear", false, "Your card is expired! Please try a different card.");
        }

    });
    
    //Obtains the expiration date: the year & checks validity
    $("expiryYear").addEventListener("blur", function(e){
        "use strict";
        if (isEmpty("expiryMonth") && isEmpty(e.currentTarget.id)) {
            validateInput(e.currentTarget.id, false, "Error. Select a month and year");
            validateInput("expiryMonth", false, "Error. Select a month and year");
        
        } else if (isEmpty(e.currentTarget.id)) {
            validateInput("expiryMonth", "", "");
            validateInput(e.currentTarget.id, false, "Error. Select year.");
        
        } else if (isEmpty("expiryMonth")) {
            validateInput(e.currentTarget.id, "", "");
            validateInput("expiryMonth", false, "Error. Select month.");
        
        } else if (checkExp($("expiryMonth").value, e.currentTarget.value)) {
            validateInput("expiryMonth", true, "Valid!");
            validateInput("expiryYear", true, "Valid!");
        
        } else {
            validateInput("expiryMonth", false, "Your card is expired");
            validateInput("expiryYear", false, "Your card is expired");
        }
    });
    
    //Obtains information about the card number the user entered
    $("cardNumber").addEventListener("keyup",function(e){
        "use strict";

        e.currentTarget.value = this.value.trim();
        var cardNum = e.currentTarget.value;
        var creditCardInputId = e.currentTarget.id;

        //Checks card validity
        //Gives appropriate errors if card is not valid
        //If card checks out, calls function to display to the user the credit card type
        if (checkNaN(cardNum)){
            validateInput(creditCardInputId, false, "Credit Card are restricted to numbers only.");
            this.value = this.value.slice(0, -1);
        } else if (!checkCardPrefix(cardNum)){
            validateInput(creditCardInputId, false, "Only Visa, MasterCard or American Express is accepted. Enter a different valid card.");
            this.value = this.value.slice(0, -1);
        }else if (!(checkLength(cardNum))){
            displayCardInfo(cardNum,creditCardInputId);
        }else if(!checkCard(cardNum)){
            validateInput(creditCardInputId, false, "Error. Invalid card numbers. Please re-enter your card information.");
        }else{
            validateInput(creditCardInputId, true, "Your " + cardType(cardNum) + " Card is valid!");
        }                            
    });
    
    //Confirms order after the billing has been checked. Calls the billing function.
    //If billing is valid, program has been completed.
    $("btnPay").addEventListener("click", function(){
        "use strict";
        if (checkBilling()) {
            window.confirm("Your order has been processed. Pizza ETA: 30 minutes!");
        } else return;
    });

});


