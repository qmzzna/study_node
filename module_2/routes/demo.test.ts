const query = require("../controller/userController")

it('returns the user of the all', async () => {
  const data = await query();
  expect(data[0].id).toEqual(3);
  expect(data[0].login).toEqual("admin");
  expect(data[0].password).toEqual(123456);
  expect(data[0].age).toEqual(18);
  expect(data[0].isDelete).toEqual(false);

});