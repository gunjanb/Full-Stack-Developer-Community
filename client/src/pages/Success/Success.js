import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../../components/JumbotronJumbotron';
import { ADD_ORDER } from '../../utils/mutations';
import { idbPromise } from '../../utils/helper';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const contributions = cart.map((item) => item._id);

      if (contributions.length) {
        const { data } = await addOrder({ variables: { contributions } });
        const contributionData = data.addOrder.contributions;

        contributionData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your donation!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;