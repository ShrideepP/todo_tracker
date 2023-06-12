const URL = import.meta.env.VITE_API_URL;
const USER_ID = localStorage.getItem('userId');
const USER_TOKEN = localStorage.getItem('token');

export {
    URL,
    USER_ID,
    USER_TOKEN,
};
