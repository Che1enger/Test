export const getUsers = async (page = 1, count = 6) => {
    const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`);
    const data = await response.json();
    return data;
  };
  
  export const getToken = async () => {
    const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token');
    const data = await response.json();
    return data.token;
  };
  
  export const getPositions = async () => {
    const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
    const data = await response.json();
    return data.success ? data.positions : [];
  };
  
  export const registerUser = async (formData, token) => {
    const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      method: 'POST',
      body: formData,
      headers: { 'Token': token }
    });
    return await response.json();
  };