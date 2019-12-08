import { errorMsg } from './errorResponse';

export const registerUser = data => {
  fetch('/api/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (res.status === 200) {
        return res.json().then(body => alert(`${body.msg}`));
      } else {
        res.json(400).then(body => alert(`Unable to register the user: \n ${errorMsg(body.error)}`));
        throw new Error(`unable to register the user, ${res.status} error`);
      }
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
};
