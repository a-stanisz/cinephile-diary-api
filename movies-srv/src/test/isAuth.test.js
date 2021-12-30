const expect = require('chai').expect;
// const authMiddleware = require('../middleware/isAuth');

// it('should throw an error if no Authorization Header is present', async (done) => {
//   const req = {
//     get: () => null,
//   };
//   const result = await authMiddleware(req, {}, () => {})
//   expect(result).to.be(Error);
//   done();
// });

describe('Some naive assertion', () => {
  it('should pass the test', () => {
    expect([]).to.be.an('array').that.is.empty;
  })
})