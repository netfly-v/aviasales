import styles from './TicketsPage.module.css';

export const TicketsPage = ({ sorted, sortTicketsByPrice, sortTicketsByDuration }) => {
  const showTime = time => {
    if (time.getHours() < 10) {
      return `0${time.getHours()}:${time.getMinutes()}`;
    } else if (time.getMinutes() < 10) {
      return `${time.getHours()}:0${time.getMinutes()}`;
    } else if (time.getHours() < 10 && time.getMinutes() < 10) {
      return `0${time.getHours()}:0${time.getMinutes()}`;
    } else {
      return `${time.getHours()}:${time.getMinutes()}`;
    }
  };

  const getDepartureTime = date => {
    const currentTime = new Date(date);
    return showTime(currentTime);
  };

  const getArrivalTime = (date, flightTime) => {
    const currentTime = new Date(date);
    currentTime.setMinutes(currentTime.getMinutes() + flightTime);
    return showTime(currentTime);
  };

  const getTimeFromMins = mins => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes} мин`;
  };

  const getNumOfStops = stops =>
    stops.length === 0
      ? `${stops.length} пересадок`
      : stops.length === 1
      ? `${stops.length} пересадка`
      : `${stops.length} пересадки`;

  return (
    <div className={styles.ticketsPage}>
      {console.log(sorted)}
      <div className={styles.menu}>
        <button className={styles.button} onClick={sortTicketsByPrice}>
          САМЫЙ ДЕШЕВЫЙ
        </button>
        <button className={styles.button} onClick={sortTicketsByDuration}>
          САМЫЙ БЫСТРЫЙ
        </button>
      </div>

      {sorted.map(ticket => (
        <div className={styles.ticketsResult}>
          <div className={styles.resultHeader}>
            <p className={styles.price}>{ticket.price} P</p>
            <img
              className={styles.logo}
              src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
              alt="company logo"
            ></img>
          </div>
          <div className={styles.resultContent}>
            <table>
              <tbody>
                <tr className={styles.elementRow}>
                  <td className={styles.elementCell}>
                    <p className={styles.cellHeader}>
                      {ticket.segments[0].origin}-{ticket.segments[0].destination}
                    </p>
                    <p className={styles.cellContent}>
                      {getDepartureTime(ticket.segments[0].date)} -{' '}
                      {getArrivalTime(ticket.segments[0].date, ticket.segments[0].duration)}
                    </p>
                  </td>
                  <td className={styles.elementCell}>
                    <p className={styles.cellHeader}>В пути</p>
                    <p className={styles.cellContent}>{getTimeFromMins(ticket.segments[0].duration)}</p>
                  </td>
                  <td className={styles.elementCell}>
                    <p className={styles.cellHeader}>{getNumOfStops(ticket.segments[0].stops)}</p>
                    <p className={styles.cellContent}>
                      {ticket.segments[0].stops.length > 0 ? ticket.segments[0].stops.join(', ') : 'без пересадок'}
                    </p>
                  </td>
                </tr>
                <tr className={styles.elementRow}>
                  <td className={styles.elementCell}>
                    <p className={styles.cellHeader}>
                      {ticket.segments[1].origin}-{ticket.segments[1].destination}
                    </p>
                    <p className={styles.cellContent}>
                      {getDepartureTime(ticket.segments[1].date)} -{' '}
                      {getArrivalTime(ticket.segments[1].date, ticket.segments[1].duration)}
                    </p>
                  </td>
                  <td className={styles.elementCell}>
                    <p className={styles.cellHeader}>В пути</p>
                    <p className={styles.cellContent}>{getTimeFromMins(ticket.segments[1].duration)}</p>
                  </td>
                  <td className={styles.elementCell}>
                    <p className={styles.cellHeader}>{getNumOfStops(ticket.segments[1].stops)}</p>
                    <p className={styles.cellContent}>
                      {ticket.segments[1].stops.length > 0 ? ticket.segments[1].stops.join(', ') : 'без пересадок'}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};
