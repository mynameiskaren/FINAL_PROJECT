var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

function toggleOptions(toggle) {
    "use strict";
    $("optCheese").disabled = toggle;
    $("optSauce").disabled = toggle;
    var toppings =  document.getElementsByClassName("toppings");
    for (var j=0; j <  toppings.length; j++) {
        toppings[j].disabled = toggle;
    }  
}
function ReadOnlyForm(formId, isReadOnly) {
    "use strict";
    var f = document.forms[formId];
    for(var i=0,fLen=f.length;i<fLen;i++) {
      f.elements[i].readOnly = isReadOnly;  //the "O" must be upper case
      f.elements[i].disabled = isReadOnly;
    }
}

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
    }else{ /*neutral status*/
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

function isInputEmpty(input) {
    "use strict";
    return $(input).value.trim() === "" ? true : false;
}

function isValidFullName(fullName) {
    "use strict";
    return /^[a-z]+ [a-z]+$/i.test(fullName);
}

function isValidAddress(address) {
    "use strict";
    return /\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?/i.test(address);
}

function isValidSuiteNo(suiteNo) {
    "use strict";
    return suiteNo.trim() ===""? true :/^([a-zA-Z0-9 _-]+)$/.test(suiteNo);
}

function isValidCity(city) {
    "use strict";
    return /(?:[A-Z][a-z.-]+[ ]?)+/i.test(city);
}

function isValidState(state) {
    "use strict";
    var objRegExp = /^(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i; 
    return objRegExp.test(state);
}

function isValidUSZip(sZip) {
    "use strict";
    return /^\d{5}(-\d{4})?$/.test(sZip);
}

function isValidPhoneNumber(phoneNo) {
    "use strict";
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneNo);
}

function isValidEmail(email) {
    "use strict";
    return /\S+@\S+\.\S+/.test(email);
}

function isValidCVV(cvv) {
    "use strict";
    return /^[0-9]{3,4}$/.test(cvv);
}

function isValidExpirationDate(month,year) {
    "use strict";
    var cur_year = new Date().getFullYear();

    if(cur_year == parseInt(year,10)) {     
        var cur_month = new Date().getMonth() + 1; // getMonth() returns 0=January, 1=February 
        return parseInt(month,10) >= cur_month;
    } 
    return true;
}

function isCardNoValidPrefix(cardNo) {
    "use strict";
    if(cardNo!==""){
        var valid1stDigits = ["4","5","3"];
        var validPrefix2Digits = ["40","41", "42", "43", "44", "45", "46", "47", "48", "49","51","52","53","54","55","37"];
        if(cardNo.length === 1){
            return valid1stDigits.indexOf(cardNo[0]) > -1;
        }
        else {
            return validPrefix2Digits.indexOf(cardNo.substr(0,2)) > -1 ;
        }

    } else {
        return false;
    }  
}
    
function isNotNum(cardNo) {
    "use strict";
    var lastDigit = cardNo.slice(-1);
    return isNaN(parseInt(lastDigit,10));        
}

function isValidCardLength(cardNo) {
    "use strict";
    var carPrefix = parseInt(cardNo.substr(0,2), 10);
    switch(carPrefix) {
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
            if(cardNo.length === 13 || cardNo.length === 16) {
                return true;
            }
            break;
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
            if(cardNo.length === 16) {
                return true;
            }
            break;
        case 37:
            if(cardNo.length === 15) {
                return true;
            }
            break;
        default:
            return false;
    }
}
    
function isValidCreditCard(value) {
    "use strict";
    var cDigit="", nCheck = 0, nDigit = 0, bEven = false;  
    for (var n = value.length - 1; n >= 0; n--) {
        cDigit = value.charAt(n);
        nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) {                  
                nDigit = nDigit.toString();
            }
        }

        if(typeof nDigit === 'string' || nDigit instanceof String) { 

            nCheck += parseInt(nDigit[0], 10) + parseInt(nDigit[1], 10);
        }
        else {
            nCheck += nDigit;

        }

        bEven = !bEven;
    }
    return (nCheck % 10) == 0;
}
    
function creditCardType(cardNo) {
    "use strict";
    switch(cardNo.substr(0,1)) {
        case "4":
            return "Visa";
        case "5":
            return "Master";
        case "3":       
            return "American Express";
        default:
            break;
    }
}

function isValidDeliveryForm() {
    "use strict";
    var isValid=[];
    var arrRequired = ["name", "addressType", "stAddress", "city", "state", "zipcode", "phoneno", "email"];
    for (var i = 0; i< arrRequired.length; i++) {
        if(isInputEmpty(arrRequired[i])) {
            validateInput(arrRequired[i], false, $(arrRequired[i]).name + " is required");
            isValid.push(false);
        } else {
                switch(arrRequired[i]) {
                    case "name":
                        isValid.push(isValidFullName($(arrRequired[i]).value));
                        isValidFullName($(arrRequired[i]).value) ? validateInput(arrRequired[i], true, "Confirmed.") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + "is invalid");
                        break;
                    case "addressType":
                        if($(arrRequired[i]).value === "other" && isInputEmpty("otherAddressType") ) {
                            validateInput("otherAddressType", false, $("otherAddressType").name + " is required");
                            isValid.push(false);
                        } else if ($(arrRequired[i]).value !== "house" && $(arrRequired[i]).value !== "other" && isInputEmpty("suiteno") ) {
                             validateInput("suiteno", false, $("suiteno").name + " is required");
                             isValid.push(false);
                        } else if ($(arrRequired[i]).value !== "house" && !isValidSuiteNo("suiteno") ) {
                             validateInput("suiteno", false, $("suiteno").name + " is invalid");
                             isValid.push(false);
                        }
                        else {
                            validateInput(arrRequired[i], true, "Confirmed.");
                            validateInput("suiteno", true, "Confirmed.");
                             isValid.push(true);
                        }
                        break;
                    case "stAddress":
                        isValid.push(isValidAddress($(arrRequired[i]).value));
                        isValidAddress($(arrRequired[i]).value) ? validateInput(arrRequired[i], true, "Confirmed.") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + "is invalid");
                        break;
                    case "city":
                        isValid.push(isValidCity($(arrRequired[i]).value));
                        isValidCity($(arrRequired[i]).value) ? validateInput(arrRequired[i], true, "Confirmed.") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + "is invalid");
                        break;
                    case "state":
                        isValid.push(isValidState($(arrRequired[i]).value));
                        isValidState($(arrRequired[i]).value) ? validateInput(arrRequired[i], true, "Confirmed.") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + "is invalid");
                        break;
                    case "zipcode":
                        isValid.push(isValidUSZip($(arrRequired[i]).value));
                        isValidUSZip($(arrRequired[i]).value) ? validateInput(arrRequired[i], true, "Confirmed.") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + "is invalid");
                        break;
                    case "phoneno":
                        isValid.push(isValidPhoneNumber($(arrRequired[i]).value));
                        isValidPhoneNumber($(arrRequired[i]).value) ? validateInput(arrRequired[i], true, "Confirmed.") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + "is invalid");
                        break;
                    case "email":
                        isValid.push(isValidEmail($(arrRequired[i]).value));
                        isValidEmail($(arrRequired[i]).value) ? validateInput(arrRequired[i], true, "Confirmed.") : validateInput(arrRequired[i], false, $(arrRequired[i]).name + "is invalid");
                        break;
                    default:
                }
        }
    }
    
    return !isValid.includes(false);    
}

function isValidOrderForm() {
    "use strict";
    if ($("total").value !== ""){
        return true;
    }else {
        window.alert('Please order your pizza!');
        return false;
    }      
}

function isValidBillingForm() {
    "use strict";
    var isInputsValid = [], isSelectsValid = [];
    var inputs = document.forms["billingInfo"].querySelectorAll("input[type=text]");
    for (var i = 0; i< inputs.length; i++) {
        if(isInputEmpty(inputs[i].id)) {
            if (inputs[i].id === "bSuiteNo") {
                isInputsValid.push(true);
                
            } else {
                validateInput(inputs[i].id, false, inputs[i].name + " is required");
                isInputsValid.push(false);
            }
           
        } else {
             switch(inputs[i].id) {
                    case "cardHolderName":
                        isInputsValid.push(isValidFullName($(inputs[i].id).value));
                        break;
                    case "cardNumber":
                        isInputsValid.push(isValidCreditCard($(inputs[i].id).value));
                        break;
                    case "bStAddress":
                        isInputsValid.push(isValidAddress($(inputs[i].id).value));
                        break;
                    case "bSuiteNo":
                        isInputsValid.push(isValidSuiteNo($(inputs[i].id).value));
                        break;
                    case "bCity":
                        isInputsValid.push(isValidCity($(inputs[i].id).value));
                        break;
                    case "bState":
                        isInputsValid.push(isValidState($(inputs[i].id).value));
                        break;
                    case "bZipCode":
                        isInputsValid.push(isValidUSZip($(inputs[i].id).value));
                        break;
                    case "cvv":
                        isInputsValid.push(isValidCVV($(inputs[i].id).value));
                        break;
                    default:
            }
            isInputsValid[i] ? validateInput(inputs[i].id, true, "Confirmed.") : validateInput(inputs[i].id, false, inputs[i].name + " is invalid");
        }
    }
    //validate expiration date
    var message="";
    var selects = document.forms["billingInfo"].getElementsByTagName('select'); 
    for (var j = 0; j< selects.length; j++) {
        if(isInputEmpty(selects[j].id)) {
            isSelectsValid.push(false);
            message += selects[j].name + " ";
            validateInput(selects[j].id, false, message + "is required");
        } else {
           if(j !== 0) {
               isSelectsValid.push(isValidExpirationDate(selects[j-1].value,selects[j].value));
           }
        }
        
    }
    return !isInputsValid.includes(false) &&  !isSelectsValid.includes(false);
          
}

function showHint(cardNo, creditCardInputId) {
    "use strict";
    var cardNoLength = cardNo.length;
    switch(creditCardType(cardNo)) {
        case "Visa":
            if (cardNoLength < 16 && cardNoLength !=13) {
                return  validateInput(creditCardInputId, false, "Valid number of digits for Visa is 13 or 16");
            } else if (cardNoLength > 16) {
                return  validateInput(creditCardInputId, false, "Your Visa contains more than 16 digits which is invalid.");
            }
            break;
        case "Master":
            if (cardNoLength < 16) {
                return  validateInput(creditCardInputId, false, "Valid number of digits for Maseter Card is 16");
            } else if (cardNo.length > 16) {
                return  validateInput(creditCardInputId, false, "Your Master Card contains more than 16 digits which is invalid.");
            }
            break;
        case "American Express":       
            if (cardNoLength < 15) {
                return  validateInput(creditCardInputId, false, "Valid number of digits for American Express is 15");

            } else if (cardNo.length > 15) {
                return  validateInput(creditCardInputId, false, "Your American Express contains more than 15 digits which is invalid.");
            }
            break;
        default:
            break;
    }
}

function calculateTotal() {
    "use strict";
    
    var count = 0;
    var toppings = document.getElementsByClassName("toppings");
    for (var i=0; i< toppings.length; i++) {       
       if (toppings[i].checked == true){
          count++;
       }
    }
    
    var sizeCost = parseFloat($("sizeCost").value);
    var optCheese = parseFloat($("optCheese").value);
    var optSauce = parseFloat($("optSauce").value);
    var subtotalToppings = count * 0.99;
    var total = parseFloat((sizeCost + optCheese + optSauce + subtotalToppings).toPrecision(4));

    $("total").value = total;
}

window.addEventListener("load", function () {
    "use strict";
     var doughSizePrize = {
                         handTossed:[{size:"Small", price:"$9.99"},
                                     {size:"Medium", price:"$12.99"},
                                     {size:"Large", price:"$14.99"},
                         ],
                         thinCrust:[{size:"Medium", price:"$11.99"},
                                     {size:"Large", price:"$13.99"},
                         ],
                         newYorkStyle:[{size:"Large", price:"$16.99"},
                                     {size:"Extra Large", price:"$19.99"},
                         ],
                         glutenFree:[{size:"Small", price:"$10.99"}]                                
                         }
     
    var optdoughlist =  document.getElementsByName('optdough');
    var optdoughItems = [].slice.call(optdoughlist);
    
    //  hide the input for billing information initially
    $("billingInfo").style.display ="none";
    
    //  hide the input for other address type initially
    $("otherAddressType").style.display = "none";
    
    // Disable Build Your Oder Form rest of the controls except Dough Options
    toggleOptions(true);
    
   //Order Form input fields event listeners
    optdoughItems.forEach(function (item) {
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
        toggleOptions(false);
        calculateTotal();
       
     });
    });
    
    $("sizeCost").addEventListener("change", calculateTotal);
    $("optCheese").addEventListener("change", calculateTotal);
    $("optSauce").addEventListener("change", calculateTotal);
    
    var optToppingsList =  document.getElementsByClassName('toppings');
    var optToppingsItems = [].slice.call(optToppingsList);
    
    optToppingsItems.forEach(function (item) {
        "use strict";
        item.addEventListener('change',function(){
            calculateTotal();
        });
    });
    
    
    //Delivery Form input fields event listeners
    $("name").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(isValidFullName(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
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
                
                 //  Only house and other Address Type don't need suite no
                 if (this.value !== "house") {
                    validateInput("suiteno", false, "Suite Number is required for Address Type: " + $("addressType").value); 
                 }
                 else {
                     validateInput("suiteno", "", "");
                 }
                 validateInput(e.currentTarget.id, true, "Confirmed.");
            }
           
        } else {
            //Choose ... is selected
            $("otherAddressType").style.display = "none";
            validateInput(e.currentTarget.id, false, "Please choose an address type");
        }
        
    });
    
     $("otherAddressType").addEventListener("change", function(e){
        "use strict";
         if(e.currentTarget.value !=="") {          
            validateInput(e.currentTarget.id, true, "Confirmed.");   
        } else {
            validateInput(e.currentTarget.id, false, "Please provide an address type"); 
        }
    });
    
    $("stAddress").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(isValidAddress(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
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
                if(isValidSuiteNo(e.currentTarget.value)) {
                    validateInput(e.currentTarget.id, true, "Confirmed.");   
                } else {
                    validateInput(e.currentTarget.id, false, "invalid input"); 
                }
            }
            
        }else{
            if(isValidSuiteNo(e.currentTarget.value)) {
                validateInput(e.currentTarget.id, "", "");   
            } else {
                validateInput(e.currentTarget.id, false, "invalid input"); 
            }
        }
        
    });
    
    $("city").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(isValidCity(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("state").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim().toUpperCase();
        if(isValidState(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("zipcode").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(isValidUSZip(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("phoneno").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(isValidPhoneNumber(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("email").addEventListener("blur", function(e){
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(isValidEmail(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    //Delivery Form and Order Form Confirmation and Checkout
    $("btnFinishBuildPizza").addEventListener("click",function(e) {
        "use strict";
        if (this.innerHTML.trim() === "Finished Building Pizza") {
            if((!isValidDeliveryForm()) || (!isValidOrderForm())) {
                e.stopImmediatePropagation();     
            }
        }else{
             $("billingInfo").style.display = "none";
             ReadOnlyForm("deliveryLocation", false);
             ReadOnlyForm("order", false);
             $("btnFinishBuildPizza").innerHTML = "Finished Building Pizza";
             e.stopImmediatePropagation();
        }
      
    });
    
    $("proceedToCheckout").addEventListener("click", function() {
        "use strict";
        $("Confirmation_buildingPizza").style.display = "none";
        $("billingInfo").style.display = "block";
        ReadOnlyForm("deliveryLocation", true);
        ReadOnlyForm("order", true);
        $("btnFinishBuildPizza").innerHTML = "Change Delivery Location or Order";
        $("billingInfo").scrollIntoView();
    });
    
    // Billing Form event listeners
    $("sameAsDeli").addEventListener("click", function() {
        "use strict";
        if(this.checked) {
           // disable those inputs which same as deilvery information
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
        if(isValidFullName(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bStAddress").addEventListener("blur", function(e) {
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(isValidAddress(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bSuiteNo").addEventListener("blur", function(e) {
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(isValidSuiteNo(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bCity").addEventListener("blur", function(e) {
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(isValidCity(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bState").addEventListener("blur", function(e) {
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(isValidState(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("bZipCode").addEventListener("blur", function(e) {
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(isValidUSZip(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
   
    $("cvv").addEventListener("blur", function(e) {
        "use strict";
        e.currentTarget.value = this.value.trim();
        if(isValidCVV(e.currentTarget.value)) {
            validateInput(e.currentTarget.id, true, "Confirmed.");   
        } else {
            validateInput(e.currentTarget.id, false, "invalid input"); 
        }
    });
    
    $("expiryMonth").addEventListener("blur", function(e){
         "use strict";
         if (isInputEmpty(e.currentTarget.id) && isInputEmpty("expiryYear")) {
            validateInput(e.currentTarget.id, false, "Please select a month and a year");
            validateInput("expiryYear", false, "Please select a month and a year");
         } else if (isInputEmpty(e.currentTarget.id)) {
            validateInput("expiryYear", "", "");
            validateInput(e.currentTarget.id, false, "Please select a month");        
         } else if (isInputEmpty("expiryYear")) {
            validateInput("expiryYear", false, "");
            validateInput(e.currentTarget.id, "", "Please select a year");
         } else if (isValidExpirationDate(e.currentTarget.value, $("expiryYear").value)) {
             validateInput("expiryMonth", true, "Confirmed.");
             validateInput("expiryYear", true, "Confirmed.");
         } else {
            validateInput("expiryMonth", false, "Your card is expired");
            validateInput("expiryYear", false, "Your card is expired");
         }

    });
    
    $("expiryYear").addEventListener("blur", function(e){
         "use strict";
         if (isInputEmpty("expiryMonth") && isInputEmpty(e.currentTarget.id)) {
            validateInput(e.currentTarget.id, false, "Please select a month and a year");
            validateInput("expiryMonth", false, "Please select a month and a year");
         } else if (isInputEmpty(e.currentTarget.id)) {
            validateInput("expiryMonth", "", "");
            validateInput(e.currentTarget.id, false, "Please select a year");
           
         } else if (isInputEmpty("expiryMonth")) {
            validateInput(e.currentTarget.id, "", "");
            validateInput("expiryMonth", false, "Please select a month");
         } else if (isValidExpirationDate($("expiryMonth").value, e.currentTarget.value)) {
             validateInput("expiryMonth", true, "Confirmed.");
             validateInput("expiryYear", true, "Confirmed.");
         } else {
            validateInput("expiryMonth", false, "Your card is expired");
            validateInput("expiryYear", false, "Your card is expired");
         }
    });
    
    $("cardNumber").addEventListener("keyup",function(e){
       "use strict";
       e.currentTarget.value = this.value.trim();
       var cardNo = e.currentTarget.value;
       var creditCardInputId = e.currentTarget.id;
       if (isNotNum(cardNo)) {
          validateInput(creditCardInputId, false, "Credit Card can't contain non numeric character!");
          this.value = this.value.slice(0, -1);

       } else if (!isCardNoValidPrefix(cardNo)){
          validateInput(creditCardInputId, false, "Sorry! Only Visa(4), MasterCard(51,52,53,54,55) or American Express(37) are accepted");
          this.value = this.value.slice(0, -1);
       }else if (!(isValidCardLength(cardNo))){
          
          showHint(cardNo,creditCardInputId);
       }else if(!isValidCreditCard(cardNo)){
          validateInput(creditCardInputId, false, "Invalid Card Number");
       }else{
          validateInput(creditCardInputId, true, "Your " + creditCardType(cardNo) + " Card Confirmed.");
       }                            
    });
    
    // Read to Pay
    $("btnPay").addEventListener("click", function(){
        "use strict";
        if (isValidBillingForm()) {
            window.confirm("Thanks for your order!");
        } else {
            return;
        }
    });
    
});


