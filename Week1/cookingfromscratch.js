function paymentProcessor(resolve, reject) {
  setTimeout(() => {
    resolve("Transaction Success!");
  }, 5000);
}

function transactionStatus() {
  return new Promise(paymentProcessor);
}

async function startTransaction() {
  console.log("Transaction Started!");
  const data = await transactionStatus();
  console.log(data);
}

startTransaction();
