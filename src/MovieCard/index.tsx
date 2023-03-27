import './index.scss';
import filmIcon from '../assets/film.svg';
import awardIcon from '../assets/award.svg';

import type { MovieData } from '../api';
import { useState } from 'react';

interface Props {
  data: MovieData
}

const MovieCard = (props: Props) => {
  const { data } = props;
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="card">
      <div className='card__banner'>
        <img src={filmIcon} className='card__banner__icon' />
      </div>
      <div className='card__title'>{data.name}</div>
      <div className='card__runtime'>{`${data.runtimeInMinutes} min`}</div>


      <div className='card_awards'>
        <img src={awardIcon} className='card__awards__icon' />
        <span>{data.academyAwardWins} Wins & {data.academyAwardNominations} Nominations</span>
      </div>

      <div className='card_metrics'>
        <div>
          <div className="metrics-title">
            <span>Budget</span>
          </div>
          <div className="metrics-content">
            <span>${data.budgetInMillions}</span>
          </div>
        </div>

        <div>
          <div className="metrics-title">
            <span>Revenue</span>
          </div>
          <div className="metrics-content">
            <span>${data.boxOfficeRevenueInMillions}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard
