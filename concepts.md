# CONCEPTS
Async in JavaScript refers to a keyword placed before a function to indicate that it returns a promise. This enables asynchronous programming, allowing functions to be executed concurrently, rather than synchronously, improving code efficiency and readability.

Here’s a breakdown of the key concepts:

## Single-threadedness: 
    JavaScript is single-threaded, meaning only one line of code can be executed at a time. To overcome this, it uses the callback queue and event loop to manage asynchronous operations.

## Promises: 
    A promise is a result object that can be either fulfilled (with a value) or rejected (with an error). Async functions always return promises, which can be handled using .then() and .catch() methods.

## Async/await syntax:
    This syntax is built on top of promises and provides a more readable and synchronous-like way to write asynchronous code. The async keyword is used before a function, indicating it returns a promise. Within the function, the await keyword is used to pause execution until the promise is resolved or rejected.

Example:

async function fetchAndProcessData() {

    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
  
  // Process data

}

In this example, fetchAndProcessData is an async function that waits for the fetch promise to resolve, then waits for the json() promise to resolve, before executing the rest of the code.

## Concurrency: 
    Async programming enables concurrency, allowing multiple tasks to be executed simultaneously, improving overall program performance and responsiveness.

In summary, async in JavaScript is a keyword that indicates a function returns a promise, enabling asynchronous programming and concurrency. The async/await syntax provides a more readable and synchronous-like way to write asynchronous code, making it easier to manage promises and improve code efficiency.