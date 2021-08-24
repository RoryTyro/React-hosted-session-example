# MPGS hosted session in React demo 
This example is to show how the MPGS hosted session library can be used in React. It demonstrates that the Session.JS library can be used in a Single page application when switching between components. 

## Quick start guide:

Clone repositry 
### `git clone https://github.com/roryTyro/React-hosted-session-example/`

Install the application: 
### `npm install`

Run the application: 

### `npm start`

## Solution explanation:
It relies on the componentDidLoad() call back to detirmine when to mount the Session.js library into the HTML DOM when it fires. It will need to be done in a react component. Using this the be able to re-initialise the session.js library when navigating away from the checkout component/page. 

The relevant code in this example can be found in checkout.js.

This example below should demonstrate it:

```jsx

class checkoutApp extends Component {

    componentDidMount() {
      const mpgsSessionScript = document.createElement("script");    
mpgsSessionScript.async = true;
mpgsSessionScript.src = ‘https://test-tyro.mtf.gateway.mastercard.com/form/version/58/merchant/TYRO_318/session.js’;    
this.div.appendChild(mpgsSessionScript);
      mpgsSessionScript.onload = function(){
            
            //the session.js library is now available but only by using window.[function], store it in an object called PaymentSession for ease of use: 
            const PaymentSession = window.PaymentSession;
      
            //Normal MPGS code goes here eg: 
            PaymentSession.configure(parameters);

      }
      render() {
            return (
            /*Add your payment page HTML here */
            <div className="checkoutApp" ref={el => (this.div = el)}>
          {/*Session.js Script is inserted here */}
            );
}
}
}

```

___
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

