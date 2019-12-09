import { errorMsg } from './errorResponse';

export const registerUser = data => {
  try {
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status === 201) {
          return res.json().then(body => {
            localStorage.setItem('shakespeareToken', body.token);
            alert('User successfully registered');
          });
        } else {
          return res.json().then(body => alert(`Unable to register the user: \n${errorMsg(body.error)}`));
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  } catch (error) {
    alert(`Error registering user: ${error}`);
  }
};
