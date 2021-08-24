import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import './card-demo.css';

class checkoutApp extends Component {

    componentDidMount() {
      const mpgsSessionScript = document.createElement("script");    mpgsSessionScript.async = true;    mpgsSessionScript.src = "https://test-tyro.mtf.gateway.mastercard.com/form/version/58/merchant/TYRO_318/session.js";    this.div.appendChild(mpgsSessionScript);
      mpgsSessionScript.onload = function(){
        const PaymentSession = window.PaymentSession;
      
        //Normal MPGS code goes here

      configureSession();
      

      function configureSession(){
          
      
              PaymentSession.configure({
                //If using 3DS you must send request to merchant server to create a session id prior to configuration
                //session: sessionId,
      fields: {
            // ATTACH HOSTED FIELDS TO YOUR PAYMENT PAGE FOR A CREDIT CARD
            card: {
              number: "#ccnumber",
              securityCode: "#cvv2",
              expiryMonth: "#cc-exp-month",
              expiryYear: "#cc-exp-year", 
              nameOnCard: "#nameoncard"
      
            }
          },
          frameEmbeddingMitigation: ["x-frame-options"],
          callbacks: {
           initialized: function(response) {
           // HANDLE INITIALIZATION RESPONSE
           console.log("configuration ran");
             console.log(response);
      
           },
           formSessionUpdate: function(response) {
           console.log("card-number update: " + JSON.stringify(response));
           document.getElementById("response").innerText = JSON.stringify(response);
           // HANDLE RESPONSE FOR UPDATE SESSION
           if (response.status) {
               if ("ok" == response.status) {
                   console.log("Session updated with data: " + response.session.id);
                   var sessionId = response.session.id;
                          document.getElementById("sessionId").innerText = sessionId;
      
           if (response.sourceOfFunds.provided.card.number) {
           console.log("valid card was provided.");
          
           }
           if (response.sourceOfFunds.provided.card.number) {
           console.log("valid card was provided.");
           
           
          }
      
          } else if ("fields_in_error" == response.status)  {
                   console.log("Session update failed with field errors.");
                   if (response.errors.cardNumber) {
                   console.log("Card number invalid or missing.");
                    }
      } 
      }
      }
      },
      interaction: {
          displayControl: {
              formatCard: "EMBOSSED",
              invalidFieldCharacters: "REJECT"
               }
           }
      });
      
      
      PaymentSession.onValidityChange(["card.number"], function(selector, result) {
      var ccnumberDiv = document.getElementById("ccnumber-border");
      if (result.isValid) {
          //handle valid results
          console.log('The entered value is valid.');
      
      
          ccnumberDiv.classList.remove("is-invalid");
        ccnumberDiv.classList.add("valid");

      } else {
          //handle invalid results
          if (result.isIncomplete) {
              console.log('Field value is incomplete, please enter full value.');
          }
          if (result.hasError) {
              console.log('Error has been detected on the hosted field.');
          }
          if (result.errorReason) {
              switch (result.errorReason) {
                  case 'EMPTY':
                      console.log('Field is mandatory field, please enter the value.');
                      break;
                  case 'INVALID_CHARACTERS':
                      console.log('There is invalid character in the hosted field.');
                      break;
                  //this event is fired on "card.number" and "giftCard.number" fields
                  case 'NOT_SUPPORTED':
                      console.log('The card number you entered is not supported.');
                      break;
                  case 'INVALID_VALUE':
                      console.log('The value you entered is incorrect, please check the value and try again.');
                      break;
                  case 'INVALID_LENGTH':
                      console.log('The value you entered is too long.');
                      break;
                  //this event is fired on "card.expiryYear" field
                  case 'EXPIRED':
                      console.log('The date you entered is expired.');
                      break;
                  default:
                      break;
              }
          }
         
      }
      });
      
      var validity = {
      nameoncard: 0,
      ccnumber: 0,
      "cc-exp-month": 0,  
      "cc-exp-year": 0,
      cvv2: 0
      }
      
      var cvvEmptyState = true;
      
      PaymentSession.onEmptinessChange(["card.number"], function(selector, result) {
      
      var ccNumberValidDiv = document.getElementById("ccnumber-border");
      var ccNumberTypeDiv = document.getElementById("card-type");
      //handle change event
      if (result.isEmpty) {
          // field has empty value
          ccNumberValidDiv.classList.remove("is-invalid");
          ccNumberValidDiv.classList.remove("is-valid");
          ccNumberTypeDiv.classList.remove("visa");
          ccNumberTypeDiv.classList.add("blank-card"); 
          console.log("Element with selector " + selector + " has changed it's emptiness status to empty");
      
      } else if (!result.isEmpty) {
          // field has non-empty value
          
          console.log("Element with selector " + selector + " has changed it's emptiness status to non-empty");
      }
      });
      
      PaymentSession.onEmptinessChange(["card.securityCode"], function(selector, result) {
      //handle change event
      if (result.isEmpty) {
          // field has empty value
          cvvEmptyState = true;
          console.log("Element with selector " + selector + " has changed it's emptiness status to empty");
      } else if (!result.isEmpty) {
          // field has non-empty value
          cvvEmptyState = false;
          console.log("Element with selector " + selector + " has changed it's emptiness status to non-empty");
      }
      });
      
      PaymentSession.onValidityChange(["card.number", "card.nameOnCard", "card.expiryMonth", "card.expiryYear", "card.securityCode"], function(selector, result) {
      console.log("here is the selector: " + selector);
      console.log("here is the result: " + JSON.stringify(result));
      var selector = selector.substring(1);
      var ccnumberDiv = document.getElementById("ccnumber");
      var validityState = "is-invalid";
      if (result.isValid) {
          //handle valid results
          console.log('The entered value is valid.');
          // set a state to valid
      
          validityState = "is-valid";
      
      
      } 
      switch (selector) {
              case "nameoncard":
              document.getElementById(selector).classList.remove("is-invalid");
              document.getElementById(selector).classList.remove("is-valid");
              document.getElementById(selector).classList.add(validityState);
                  break;
              case "ccnumber":
              ccnumberDiv.classList.remove("is-invalid");
              ccnumberDiv.classList.remove("valid");
              ccnumberDiv.classList.add(validityState);
                  break;
                  case "cc-exp-month":
              document.getElementById(selector).classList.remove("is-invalid");
              document.getElementById(selector).classList.remove("is-valid");
              document.getElementById(selector).classList.add(validityState);
                  break;
                  case "cc-exp-year":
                  document.getElementById(selector).classList.remove("is-invalid");
              document.getElementById(selector).classList.remove("is-valid");
              document.getElementById(selector).classList.add(validityState);
                  break;
                  case "cvv2":
                
                  document.getElementById(selector).classList.remove("is-invalid");
              document.getElementById(selector).classList.remove("is-valid");
                if (cvvEmptyState == false){
      
              
                  
              document.getElementById(selector).classList.add(validityState);
      
            }
                  break;
          }
      
      
      if (result.isValid) {
          //handle valid results
          console.log('The entered value is valid.');
      validity[selector]=1;
      console.log("card validity check : " + JSON.stringify(validity));
      var total = 0;
      
      
      for(var item in validity) {
        total = total + validity[item];
      console.log("total: " + total);
      }
      if (total == 5){
      document.getElementById("payment-button").removeAttribute("disabled");
      }
      
      } else {
          //handle invalid results
          if (result.isIncomplete) {
              console.log('Field value is incomplete, please enter full value.');
          }
          }
      
      });
      
      PaymentSession.onCardTypeChange(function(selector, result, scopeId) {
      var cardTypeDiv = document.getElementById("card-type");
      console.log("onCardTypeChange event fired: " + JSON.stringify(result));
      //handle change event
      if (result.status === 'SUPPORTED') {
        //$(ccnumber).switchClass( "invalid", "valid");
        
          //display card scheme based on result
          switch (result.brand) {
              case "VISA":
              cardTypeDiv.setAttribute("class", "visa");
             // cardTypeDiv.classList.add("align-self-top");
            // cardTypeDiv.innerHTML = "";
                  break;
              case "MASTERCARD":
              cardTypeDiv.setAttribute("class", "mastercard");
                  break;
              case "AMEX":
              cardTypeDiv.setAttribute("class", "amex");
              document.getElementById("cvv2").setAttribute("placeholder", "••••");
              console.log("scopeId = " + scopeId);
              PaymentSession.setFocus('card.securityCode', scopeId);
      
              PaymentSession.setPlaceholderShownStyle(['card.securityCode'], {
                color: 'green',
                fontWeight: 'bold',
                textDecoration: 'underline'
      });
                  break;
          }
          
      
      } else {
              
          if (result.status === 'INSUFFICIENT_LENGTH') {
          // selector for invalid field is provided
          console.log('Minimum of 10 digits required to determine card type.');
         
          }
          if (result.status === 'NOT_SUPPORTED') {
          console.log('The card type you entered is not supported.');
      
          }
      
      }
      });
      
      }
      
      function extraCvvCallback(result){
      console.log("extra CVV callback fired, result: " + JSON.stringify(result));
      }
      


      
//end MPGS code

      };

    }
    
    render() {
      return (
          <>
<h1>React hosted session example</h1>
<Link to='/'>Home page</Link>
      
<form role="form" class="form-pay" id="form-pay">
    <div class="text-center mb-4">
        <p>Please do not use real card details</p>
    </div>

    <label for="ccnumber">Card number</label>
    <div class="form-row ">
        <div class="form-label-group col">
            <input type="tel" class="form-control " id="ccnumber" required autofocus readOnly={true} autocomplete="cc-number"/>
            <span id="card-type" class="material-icons align-self-top md-48"></span> 
        </div>
<div id="">
  
</div>
</div>
<label for="nameoncard">Name on card</label>
<div class="form-label-group">
<input type="text" id="nameoncard" class="form-control" required autofocus autocomplete="cc-name" readOnly={true}/>
</div>

<label for="cc-exp-month">Exp Month</label>
<div class="form-label-group">
<input type="tel" id="cc-exp-month" class="form-control" required autofocus autocomplete="cc-exp-month" readOnly={true}/>
</div>

<label for="cc-exp-year">Exp Year</label>
<div class="form-label-group">
<input type="tel" id="cc-exp-year" class="form-control" required autofocus autocomplete="cc-exp-year" readOnly={true}/>
</div>

<div class="col-sm-3 form-label-group">
             CVV
        <input type="password" class="form-control" id="cvv2"  autocomplete="off" readOnly={true}/>
      </div>
</form>
<div class="col-md-12 text-center">
<button type="button" id="payment-button" onClick={() => { window.PaymentSession.updateSessionFromForm('card', undefined)}} class="text-center mb-4 btn btn-lg btn-primary btn-block" >Pay</button>
        </div>
<div id="response" ></div>
<div id="sessionId" ></div>
            <div className="checkoutApp" ref={el => (this.div = el)}>
          {/*Session.js Script is inserted here */}
        </div>    
</>     

      );
    }
  }

  export default checkoutApp;