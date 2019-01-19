
// Unit Test 시에 req, res 는 external dependency 이므로 mock 해야한다.
// 그러나 res 가 포괄하는 status, send 등을 mocking 하게 될 경우 Unit Testing 난이도가 어려워진다. 
// 그리고 향후에 유지 가능하지도 않다. 따라서 Integration Testing 으로 넘긴다.
module.exports = function(req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden
  
  if(!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};