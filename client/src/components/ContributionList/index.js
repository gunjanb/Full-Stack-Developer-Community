import React, { useEffect } from 'react';
import ContributionItem from '../ContributionItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CONTRIBUTIONS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_CONTRIBUTIONS } from '../../utils/queries';
import { idbPromise } from '../../utils/helper';
import spinner from '../../assets/spinner.gif';

function ContributionList() {
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(QUERY_ALL_CONTRIBUTIONS);
  console.log('data:\n', JSON.stringify(data, null, 2));

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_CONTRIBUTIONS,
        contributions: data.contributions,
      });
      data.contributions.forEach((contribution) => {
        idbPromise('contributions', 'put', contribution);
      });
    } else if (!loading) {
      idbPromise('contributions', 'get').then((contributions) => {
        dispatch({
          type: UPDATE_CONTRIBUTIONS,
          contributions,
        });
      });
    }
  }, [data, loading, dispatch]);

  return (
    <div className="my-2">
      <h2>Choose a dollar amount contribution:</h2>
      {state.contributions.length ? (
        <div className="flex-row">
          {data.contributions.map(contribution => (
            <ContributionItem
              key={contribution._id}
              _id={contribution._id}
              image={contribution.image}
              name={contribution.name}
              price={contribution.price}
              quantity={contribution.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't picked a contribution amount!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ContributionList;
