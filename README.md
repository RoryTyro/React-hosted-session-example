# MPGS hosted session in React demo 
This example is to show how the MPGS hosted session library can be used in React. It demonstrates that the Session.JS library can be used in a Single page application when switching between components. 

## Quick start guide:

### Prerequisites

You will need NPM & Node.js installed in your environement. Please see node JS installation instructions at the bottom of this page if not already installed otherwise skip.
___

### Clone repositry 
### `git clone https://github.com/roryTyro/React-hosted-session-example/`

### Install the application: 
### `npm install`

### Run the application: 

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

___
### Node installation instructions (if not installed already)
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm
      
- #### Node installation on Mac

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo install nodejs
      $ sudo install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g
