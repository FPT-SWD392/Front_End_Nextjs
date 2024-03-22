export const apiClientFetch = async (path: string, role: 'admin' | 'user', body: any): Promise<any> => {
  const res = await fetch(`/api/${role}?path=` + path, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify(body)
  });
  return await res.json();
};

export const apiServerFetch = async (url: string, method: 'GET' | 'POST' | 'PUT', body?: any, accessToken?: string): Promise<any> => {
  let headers: any = {
    'Content-type': 'application/json'
  };
  let newBody: any = {};
  if (accessToken) {
    headers = { ...headers, Authorization: `Bearer ${accessToken}` };
  }
  if (body) {
    newBody = { body: JSON.stringify(body) };
  }
  const res = await fetch(process.env.PRIVATE_BACKEND_ENDPOINT + url, {
    method,
    headers,
    cache: 'no-cache',
    ...newBody
  });
  if (res.status !== 200) {
    throw new Error('Backend error');
  }
  let response = {};
  try {
    response = await res.json();
  } catch (error: any) {}
  return response;
};

export const apiServerSubmitForm = async (url: string, method: 'POST', body?: any, accessToken?: string): Promise<any> => {
  let headers: any = {
    accept: '*/*'
  };
  if (accessToken) {
    headers = { ...headers, Authorization: `Bearer ${accessToken}` };
  }
  let newBody: any = {};
  if (body) {
    newBody = { body };
  }
  const res = await fetch('https://projectswd392.azurewebsites.net' + url, {
    method,
    headers,
    cache: 'no-cache',
    ...newBody
  });
  if (res.status !== 200) {
    console.log(res)
    throw new Error('Backend error');
  }
  return await res.json();
};

export const errorSystem = (error: string, data: any) => {
  return { ...data, error };
};
