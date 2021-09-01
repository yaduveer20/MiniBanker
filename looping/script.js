'use script';

//#challenge 1

function checkDogs(dogsJulia, dogsKate){
    const newDogsJulia = dogsJulia.slice();
    newDogsJulia.splice(0,1);
    newDogsJulia.splice(-2);
    const allDogs = [...newDogsJulia, ...dogsKate];
    const onlyDogs = newDogsJulia.concat(dogsKate);

    console.log(allDogs,onlyDogs);

    onlyDogs.forEach(function(dog,i){
        console.log(`Dog number ${i+1} is ${dog >= 3 ? 'an adult' : 'a puppy'}, and is ${dog} years old.`);
    });
}

checkDogs([9,16,6,8,3], [10,5,6,1,4]);

//map method

const eurTransactions = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];

const eurToUsd = 1.19;

const usdTransactions = eurTransactions.map(function(value){
    return Math.ceil(value *= eurToUsd);
});

console.log(usdTransactions);
console.log(eurTransactions);


//computing usernames

const account1 = {
    name: 'Gopal Khatri',
    transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    password: 1111,
  };
  
  const account2 = {
    name: 'Yaduveer Khatri',
    transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  };
  
  const account3 = {
    name: 'Paul Khatri',
    transactions: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    password: 3333,
  };
  
  const account4 = {
    name: 'Rahul Negi',
    transactions: [430, 1000, 700, 50, 90],
    interestRate: 1,
    password: 4444,
  };

  const accounts = [account1,account2,account3,account4];
  console.log(accounts);

  const user = 'Yaduveer Paul Khatri';
  const username = user.toLowerCase().split(' ').map(function(item){
      return item[0];
  }).join('');

  console.log(username);

  
  const accountUsername = accounts.map(function(account){
      return account.name.toLowerCase().split(' ').map(function(item){
          return item[0];
      }).join('');
  });

  console.log(accountUsername);
  console.log(accounts[1].name);

  //create username function
  const createUsername = function(user){
      return user.name.toLowerCase().split(' ').map(item=>item[0]).join('');
  }

  accounts.forEach(account => {
      account.user = createUsername(account);
  });

  console.log(accounts); 


  //filter method

  const deposits = eurTransactions.filter(value=>value>0);
  console.log(deposits);

  //reduce method

  const balance = eurTransactions.reduce(function(acc,value,i,arr){
      return acc + value;
  }, 0);

  console.log(balance);

  //finding maximum value using reduce
  const maxTransaction = eurTransactions.reduce(function(acc,value){
      return value > acc ? value : acc;
  },Number.MIN_VALUE);

  console.log(maxTransaction);


  //
  ///

  ////
  /////
  //challenge #2

  const calcAverageHumanAge = function(ages){
        const humanAge = ages.map(function(dogAge){
            return dogAge <= 2 ? 2*dogAge : 16+dogAge*4;
        }).filter(age=>age>=18);

        console.log(humanAge);
        const avgHumanAge = humanAge.reduce(function(acc,value){
            return acc + value;
        },0) / humanAge.length;

        console.log(`Average age: ${avgHumanAge}`);
        
  };

  calcAverageHumanAge([5,2,4,1,15,8,3]);



  