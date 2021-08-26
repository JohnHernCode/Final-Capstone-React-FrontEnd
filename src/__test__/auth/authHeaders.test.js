import authHeaders from '../../api/authHeaders';

test('should return axios request headers', () => {
  const headerData = authHeaders();
  expect(headerData.headers['Content-Type']).toEqual('application/json');
});
