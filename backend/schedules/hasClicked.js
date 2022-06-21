import cron from 'node-cron';
import fetch from 'node-fetch';
import { login } from '../authentication/authentication.js';
export const resetHasClicked = async () => {
  cron.schedule(
    '0 0 * * *',
    async () => {
      const getToken = await login(
        process.env.CLICK_EMAIL,
        process.env.CLICK_PASSWORD
      );
      if (getToken) {
        const token = getToken.idToken;
        const response = await fetch(
          'https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=' +
            token,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          console.log(await response.json());
        } else {
          const users = await response.json();
          for (const key in users) {
            const hasClicked = false;
            users[key].hasClicked = hasClicked;

            const response2 = await fetch(
              `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/users/${key}.json?auth=` +
                token,
              {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(users[key]),
              }
            );

            if (!response2.ok) {
              console.log(
                (await response.json()) +
                  `update failed for user ${users[key.email]}`
              );
            }
          }
        }
      }

      console.log('Resetted all hasClicked to false');
    },
    {
      scheduled: true,
      timezone: 'Europe/Copenhagen',
    }
  );
};
