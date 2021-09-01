'use strict';

const account1 = {
    name: 'Gopal Khatri',
    transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
    transactionDates: [
      '2019-11-18T21:31:17.178Z',
      '2019-12-23T07:42:02.383Z',
      '2021-06-10T09:15:04.904Z',
      '2020-04-01T10:17:24.185Z',
      '2021-06-13T14:11:59.604Z',
      '2020-07-26T17:01:17.194Z',
      '2020-07-28T23:36:17.929Z',
      '2021-06-15T10:51:36.790Z',
    ],
    interestRate: 1.2, // %
    password: 1111,
    currency: '€'
  };
  
  const account2 = {
    name: 'Yaduveer Khatri',
    transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    transactionDates: [
      '2019-11-01T13:15:33.035Z',
      '2021-06-13T09:48:16.867Z',
      '2019-12-25T06:04:23.907Z',
      '2021-06-09T14:18:46.235Z',
      '2020-02-05T16:33:06.386Z',
      '2020-04-10T14:43:26.374Z',
      '2021-06-17T18:49:59.371Z',
      '2020-07-26T12:01:20.894Z',
    ],
    interestRate: 1.5,
    password: 2222,
    interestRate: 1.2,
    currency: '$'
  };
  
  const account3 = {
    name: 'Paul Khatri',
    transactions: [200, -200, 340, -300, -20, 50, 400, -460],
    transactionDates: [
      '2020-02-05T16:33:06.386Z',
      '2020-04-10T14:43:26.374Z',
      '2021-06-16T18:49:59.371Z',
      '2021-06-14T12:01:20.894Z',
      '2019-12-25T06:04:23.907Z',
      '2020-01-25T14:18:46.235Z',
      '2019-11-01T13:15:33.035Z',
      '2021-06-11T09:48:16.867Z',
    ],
    interestRate: 0.7,
    password: 3333,
    currency: '£'
  };
  
  const account4 = {
    name: 'Rahul Negi',
    transactions: [430, 1000, 700, 50, 90],
    transactionDates: [
      '2019-12-23T07:42:02.383Z',
      '2021-06-12T17:01:17.194Z',
      '2020-07-28T23:36:17.929Z',
      '2021-06-15T09:15:04.904Z',
      '2020-05-08T14:11:59.604Z',
    ],
    interestRate: 1,
    password: 4444,
    currency: '₹'
  };


  const accounts = [account1, account2, account3, account4];

  let currentAccount = null;

  //element tags using querySelector()
  const elemWelcome = document.querySelector('.welcome');
  const elemUsername = document.querySelector('.login-input-username');
  const elemPassword = document.querySelector('.login-input-password');
  const btnLogin = document.querySelector('.login-btn');
  
  const elemLabelDate = document.querySelector('.date');
  const elemBalance = document.querySelector('.balance-value');
  const elemTransactions = document.querySelector('.transactions');
  const elemTransactionDate = document.querySelector('.transactions-date');

  const elemSummaryIn = document.querySelector('.summary-value-in');
  const elemSummaryOut = document.querySelector('.summary-value-out');
  const elemSummaryInterest = document.querySelector('.summary-value-interest');
  const btnSort = document.querySelector('.btn-sort');

  const elemSimulation = document.querySelector('.simulation');

  const elemTransferTo = document.querySelector('.form-input-to');
  const elemTransferAmount = document.querySelector('.form-input-amount');
  const btnTransfer = document.querySelector('.form-btn-transfer');

  const elemLoanAmount = document.querySelector('.form-input-loan-amount');
  const btnLoan = document.querySelector('.form-btn-loan');

  const elemCloseUsername = document.querySelector('.form-input-username');
  const elemClosePassword = document.querySelector('.form-input-password');
  const btnClose = document.querySelector('.form-btn-close');

  const elemTimer = document.querySelector('.timer');


  //generate usernames from each account and add this property to each account object
  accounts.forEach(function(account){
    const userName = account.name.toLowerCase().split(' ').map(item => item[0]).join('');
    account.username = userName;
  });


  //calculate number of days passed between two days
  const calcDaysPassed = (date1, date2)=> Math.abs(date2-date1) / (1000*60*60*24);

  //create dates
  function createDate(date){
    const now = new Date(date);

    const daysPassed = Math.round(calcDaysPassed(now,new Date()));
    
    if(daysPassed === 0) return 'TODAY';
    if(daysPassed === 1) return 'YESTERDAY';
    if(daysPassed <=10) return `${daysPassed} days ago`;

    const year = now.getFullYear();
    const month = `${now.getMonth()+1}`.padStart(2,0);
    const day = `${now.getDate()}`.padStart(2,0);
    return `${day}/${month}/${year}`;
  }

   //update current date;
   function updateDisplayCurrentDate(){
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth()+1}`.padStart(2,0);
    const day = `${now.getDate()}`.padStart(2,0);
    const hour = `${now.getHours()}`.padStart(2,0);
    const minute = `${now.getMinutes()}`.padStart(2,0);
    elemLabelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;
  }


  //implementation part
  //display transactions- deposits and withdrawl on transactions sections

  function updateDisplayTransactions(account,sorted = false){
    elemTransactions.innerHTML = '';

    const transaction = sorted ? account.transactions.slice().sort((a,b)=> a-b) : account.transactions;

    transaction.forEach(function(amount,index){
      const type = amount > 0 ? 'deposit' : 'withdrawal';

      const date = createDate(account.transactionDates[index]);

      const element = `<div class="transactions-row">
        <div class="transactions-type transactions-type-${type}">${index+1} ${type}</div>
        <div class="transactions-date">${date}</div>
        <div class="transactions-value">${type === 'deposit' ? '+' : '-'} ${account.currency} ${Math.abs(amount)}</div>
      </div>`;

      elemTransactions.insertAdjacentHTML('afterbegin',element);

    });
  }


  //display current balance
  function updateDisplayCurrentBalance(account){
    elemBalance.textContent = account.currency + account.transactions.reduce((acc,amount)=>acc+amount, 0).toFixed(2);
  }

  //display summary
  function updateDisplaySummary(account){
    const depositList = account.transactions.filter(amount=> amount > 0);
    const deposit = depositList.reduce((acc,amount)=>acc+amount, 0);
    const withdrawl = account.transactions.filter(amount=> amount < 0).reduce((acc,amount)=>acc+amount, 0);
    let interest = depositList.reduce((acc,amount)=> {
      const intAmount = (amount*account.interestRate) / 100;
      return acc + (intAmount >= 1 ? intAmount : 0);
    } , 0);

    const currency = account.currency;
    elemSummaryIn.textContent = currency + deposit.toFixed(2);
    elemSummaryOut.textContent = currency + Math.abs(withdrawl).toFixed(2);
    elemSummaryInterest.textContent = currency + interest.toFixed(2);
  }

  //display welcome message

  function updateDisplayWelcomeMessage(name){
    elemWelcome.textContent = `Welcome, ${name.split(' ')[0]}!`;
  }

  //account doesn't exists message

  function displayErrorMessage(){
    elemWelcome.textContent =  'Account doesn\'t exists. Try again with correct credentials!'
    elemSimulation.classList.add('hidden');
    currentAccount = null;
  }


  //display user interface
  function displayMainPage(account){
    elemSimulation.classList.remove('hidden');
    updateDisplayCurrentBalance(account);
    updateDisplayCurrentDate();
    updateDisplayTransactions(account);
    updateDisplaySummary(account);
    updateDisplayWelcomeMessage(account.name);
  }
  

  //implementing login and verification
  //event listener for login button
  //for click event

  let minutes = null;
  let seconds = null;

  //timer for logging out of the current account
  let isTimerActive = false;

  const logOutTimer = function(){
    minutes = 9;
    seconds = 60;
    elemTimer.textContent = `${minutes+1}:00`;
    if(!isTimerActive){
      isTimerActive = true;
      const timeout = setInterval(function(){
        seconds--;
        elemTimer.textContent = `${minutes}:${seconds === 60 ? '00' : `${seconds}`.padStart(2,0)}`;
        if(seconds === 0){
          minutes--;
          seconds = 60;
        }
        if(minutes === -1){
          minutes = 9;
          seconds = 60;
          elemWelcome.textContent = 'Log In to get started!';
          elemSimulation.classList.add('hidden');
          clearInterval(timeout);
          isTimerActive = false;
        }

      },1000);
    }
  };

  btnLogin.addEventListener('click', function(event){
    sorted = false;
    btnSort.textContent = '⇅ SORT';
    event.preventDefault();
    currentAccount = accounts.find(acc => acc.username === elemUsername.value && acc.password === Number(elemPassword.value));
    if(currentAccount){
      logOutTimer();
      displayMainPage(currentAccount);
    }
    else{
      minutes = -1;
      displayErrorMessage();
    }
    elemUsername.value = elemPassword.value = null;
  });

  //on button click the browser releoads the web page
  //to prevent reloading use event.preventDefault();
  //event listener for transfer button

  btnTransfer.addEventListener('click', function(event){
    event.preventDefault();
    logOutTimer();
    const transferAmount = Number(elemTransferAmount.value);
    const beneficiary = accounts.find(receiver => receiver.username === elemTransferTo.value);

    beneficiary.transactionDates.push(new Date().toISOString());
    currentAccount.transactionDates.push(new Date().toISOString());
    
    if(beneficiary && beneficiary.username != currentAccount.username && transferAmount > 0 && Number(elemBalance.textContent.slice(1)) >= transferAmount){
      currentAccount.transactions.push(0-transferAmount);
      updateDisplayTransactions(currentAccount);
      updateDisplayCurrentBalance(currentAccount);
      updateDisplaySummary(currentAccount);
      accounts.find(account => account.username === beneficiary.username).transactions.push(transferAmount);
    }

    elemTransferAmount.value = elemTransferTo.value = null;
  });


  //event listener for loan request
  btnLoan.addEventListener('click', function(event){
    event.preventDefault();
    logOutTimer();
    const amount = Number(elemLoanAmount.value);

    if(amount >0 && currentAccount.transactions.some(value => value >= amount*0.1)){
      setTimeout(function(){
        currentAccount.transactions.push(amount);
        currentAccount.transactionDates.push(new Date().toISOString());
        updateDisplayTransactions(currentAccount);
        updateDisplaySummary(currentAccount);
        updateDisplayCurrentBalance(currentAccount);
      },3000);
    }

    elemLoanAmount.value = null;
  });

  //event listener for closing an account
  btnClose.addEventListener('click', function(event){
    event.preventDefault();
    minutes = -1;

    const username = elemCloseUsername.value;
    const password = Number(elemClosePassword.value);

    if(currentAccount.username === username && currentAccount.password === password){
      accounts.splice(accounts.findIndex(acc=> acc.username === username && acc.password === password), 1);
      elemSimulation.classList.add('hidden');
      elemWelcome.textContent = 'Log In to get started!';
    }

    elemClosePassword.value = elemCloseUsername.value = null;
  });


  //event listener for sort button

  let sorted = false;

  btnSort.addEventListener('click',function(){
    console.log('sort');
    updateDisplayTransactions(currentAccount,!sorted);
    btnSort.textContent = `⇅ ${sorted ? 'SORT' : 'UNSORT'}`;
    sorted = !sorted; 
  });


  //event listener on balance label
  let colorState = false
  elemBalance.addEventListener('click',function(){
    [...elemTransactions.querySelectorAll('.transactions-row')].forEach(function(row,i){
      if(!colorState){
        row.style.backgroundColor= i%2 == 0 ? 'orangered' : '#39b385';
      }
      else row.style.backgroundColor='#fff';
    });
    colorState = !colorState;
  });



  


  
















  



  
