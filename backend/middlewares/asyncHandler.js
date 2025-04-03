const asyncHandler = fn => (req, res, next) => 
    // Wrap the function in a Promise to handle async errors
    Promise
      .resolve(fn(req, res, next)) // Call the async function with (req, res, next)
      .catch(error => { // Catch any error that occurs inside the async function
          res.json({ message: error.message }); // Send a 500 error response with the error message
      });
  
  export default asyncHandler; // Export the asyncHandler function for use in other files