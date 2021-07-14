import React from 'react';
import {YMaps, Map, Placemark, ZoomControl, GeolocationControl} from 'react-yandex-maps';
import {PlacemarkCords} from '../../const';

const MainContact = () => {
  return (
    <section className="page-main__contact contact">
      <div className="container">
        <h2 className="contact__title">Отделения Лига Банка</h2>
        <YMaps>
          <div className="contact__map">
            <Map
              className="map__body map__body--desktop"
              defaultState={{
                center: [56.86, 56.59],
                zoom: 5,
                controls: [],
              }}
            >
              <ZoomControl
                options={{
                  position: {right: `10px`, bottom: `120px`}
                }} />
              <GeolocationControl
                options={{
                  position: {right: `10px`, bottom: `80px`}
                }} />
              {PlacemarkCords.desktop.map((mark, index) => (
                <Placemark
                  key={index}
                  geometry={mark} />
              ))}
            </Map>
            <Map
              className="map__body map__body--tablet"
              defaultState={{
                center: [57.9909, 67.6896],
                zoom: 5,
                controls: [],
              }}
            >
              <ZoomControl
                options={{
                  position: {right: `10px`, bottom: `120px`}
                }} />
              <GeolocationControl
                options={{
                  position: {right: `10px`, bottom: `80px`}
                }} />
              {PlacemarkCords.tablet.map((mark, index) => (
                <Placemark
                  key={index}
                  geometry={mark} />
              ))}
            </Map>
            <Map
              className="map__body map__body--mobile"
              defaultState={{
                center: [58.2525, 78.1163],
                zoom: 5,
                controls: [],
              }}
            >
              <ZoomControl
                options={{
                  position: {right: `10px`, bottom: `120px`}
                }} />
              <GeolocationControl
                options={{
                  position: {right: `10px`, bottom: `80px`}
                }} />
              {PlacemarkCords.mobile.map((mark, index) => (
                <Placemark
                  key={index}
                  geometry={mark} />
              ))}
            </Map>
          </div>
        </YMaps>
      </div>
    </section>
  );
};

export default MainContact;
