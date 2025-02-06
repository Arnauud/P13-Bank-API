export const persistUserToStorage = ({ firstName, lastName, email, token, rememberMe }) => {
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify({ firstName, lastName, email }));
      localStorage.setItem('token', token);
      localStorage.setItem('rememberMe', 'true');
    } else {
      sessionStorage.setItem('user', JSON.stringify({ firstName, lastName, email }));
      sessionStorage.setItem('token', token);
    }
  };
  
  export const clearUserFromStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };
  
  export const getStoredUser = () => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  };
  

  export const getStoredToken = () => {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    return rememberMe ? localStorage.getItem('token') : sessionStorage.getItem('token');
  };
  