import axios from 'axios';
import { useEffect, useState } from 'react';
import { TicketsPage } from '../ticketsPage/TicketsPage';
import styles from './MainPage.module.css';

export const MainPage = () => {
  const [tickets, setTickets] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [all, setAll] = useState(false);
  const [withoutStops, setWithoutStops] = useState(false);
  const [oneStop, setOneStop] = useState(false);
  const [twoStops, setTwoStops] = useState(false);
  const [threeStops, setThreeStops] = useState(false);

  useEffect(() => {
    axios.get('https://front-test.beta.aviasales.ru/search').then(response => {
      console.log(response.data.searchId);
      axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${response.data.searchId}`).then(r => {
        setTickets(r.data.tickets);
      });
    });
  }, []);

  const sortTicketsByPrice = () => {
    setSorted([...tickets.sort((a, b) => a.price - b.price).slice(0, 5)]);
  };

  const sortTicketsByDuration = () => {
    setSorted([
      ...tickets
        .sort(
          (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
        )
        .slice(0, 5),
    ]);
  };

  const filterTickets = (state, setState, stops) => {
    setState(!state);
    if (!state) {
      setSorted(
        tickets
          .filter(ticket => ticket.segments[0].stops.length === stops && ticket.segments[1].stops.length === stops)
          .slice(0, 5)
      );
    } else {
      setSorted(tickets.slice(0, 5));
    }
  };

  const showAllTickets = () => {
    setAll(!all);
    setSorted(tickets.slice(0, 5));
  };

  return (
    <div className={styles.main}>
      <img
        src="https://os-helper.ru/wp-content/uploads/2019/09/logo-25.png"
        width="50px"
        className={styles.planeImg}
        alt="plane logo"
      ></img>
      <div className={styles.content}>
        <div className={styles.filters}>
          <p>Количество пересадок</p>
          <Checkbox label="Все" value={all} onChange={showAllTickets} />
          <Checkbox
            label="Без пересадок"
            value={withoutStops}
            onChange={() => filterTickets(withoutStops, setWithoutStops, 0)}
          />
          <Checkbox label="1 пересадка" value={oneStop} onChange={() => filterTickets(oneStop, setOneStop, 1)} />
          <Checkbox label="2 пересадки" value={twoStops} onChange={() => filterTickets(twoStops, setTwoStops, 2)} />
          <Checkbox
            label="3 пересадки"
            value={threeStops}
            onChange={() => filterTickets(threeStops, setThreeStops, 3)}
          />
        </div>
        <TicketsPage
          sorted={sorted}
          sortTicketsByPrice={sortTicketsByPrice}
          sortTicketsByDuration={sortTicketsByDuration}
        />
      </div>
    </div>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};
