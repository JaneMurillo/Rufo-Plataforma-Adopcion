import React from 'react';
import { CardEvents } from '../../../components/cards/cardevents/cardevents';
import './eventscontent.css';
import eventsimg from './perro-eventos.png';

export function EventsContent() {
  return (
    <>
      <div className="eventscontent-container">
        <h1>Eventos del mes</h1>
        <div className="cards-container-div-events">
          <CardEvents
            day="Lunes"
            numberday="13"
            title="Evento de baño de perros"
            hours="10:00 - 12:00 hrs"
          />
          <CardEvents
            day="Lunes"
            numberday="13"
            title="Evento de baño de perros"
            hours="10:00 - 12:00 hrs"
          />
          <CardEvents
            day="Lunes"
            numberday="13"
            title="Evento de baño de perros"
            hours="10:00 - 12:00 hrs"
          />
          <CardEvents
            day="Lunes"
            numberday="13"
            title="Evento de baño de perros"
            hours="10:00 - 12:00 hrs"
          />
          <CardEvents
            day="Lunes"
            numberday="13"
            title="Evento de baño de perros"
            hours="10:00 - 12:00 hrs"
          />
          <CardEvents
            day="Lunes"
            numberday="13"
            title="Evento de baño de perros"
            hours="10:00 - 12:00 hrs"
          />
        </div>
        <div className="bottomimg-div-eventos">
          <img className="eventsimg" alt="eventsimg" src={eventsimg} />
          <div className="elipse-eventos-div"></div>
        </div>
      </div>
    </>
  );
}
