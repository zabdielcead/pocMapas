import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var mapboxgl: any;  // porque ya existe en los scripts en index html
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit {
  lat: number;
  lng: number;

  constructor(private geolocation: Geolocation) {}

  ngOnInit() {
     this.geolocation.getCurrentPosition().then((resp) => {
      this.lat  = resp.coords.latitude;
      this.lng  = resp.coords.longitude;
      this.cargaMapa();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  cargaMapa() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiemFiZGllbGNlYWQiLCJhIjoiY2p6Yms3ZnJtMDBiaDNmcXNnYTZobGkyMiJ9.e6lr4n-fXyxnR3ndc8l17w';
    const map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/light-v10',
        center: [this.lng, this.lat],
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map',
        antialias: true
      });

    map.on('load', () => {
        map.resize();
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        new mapboxgl.Marker().setLngLat([this.lng, this.lat]).addTo(map);
        console.log('latitude', this.lat);
        console.log('lng', this.lng);

        let labelLayerId;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
          }
        }



        map.addSource('pointsSource', {
          'type': 'geojson',
          //'tiles': [ 'URL'],
          'data':  {
            'type': 'FeatureCollection',
            'features': [{
                    'type': 'Feature',
                    //'properties': { 'PROVEEDOR': 'STARBUCKS', 'OFERTA': '2X1', 'TIPO': 'CAFÉ', 'SUCURSAL': 'SUC1', 'VIGENCIA': '08/06/2020' },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-99.2457321,
                            19.355098299996999
                        ]
                    }
                },
                {
                    'type': 'Feature',
                    //'properties': { 'PROVEEDOR': 'VIPS', 'OFERTA': '2X1', 'TIPO': 'DESAYUNO', 'SUCURSAL': 'SUC1', 'VIGENCIA': '08/06/2020' },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-99.23787321,
                            19.398098299996999
                        ]
                    }
                }
        
            ]
        }
          //'tileSize': 200
        });

        map.addLayer({
          id: 'points',
          type: 'circle',
          source: 'pointsSource',
          paint: {
            'circle-radius': 6,
            'circle-color': '#B42222'
            },
            filter: ['==', '$type', 'Point']
        }, labelLayerId);
      });



   /*
       map.on('load', () => { // flecha para que tengamos this
          map.resize();
          // Insert the layer beneath any symbol layer.
          const layers = map.getStyle().layers;
          new mapboxgl.Marker().setLngLat([this.lng, this.lat]).addTo(map);
          let labelLayerId;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
              labelLayerId = layers[i].id;
              break;
            }
          }
          map.addLayer({
            /*
              'id': '3d-buildings',
              'source': 'composite',
              'source-layer': 'building',
              'filter': ['==', 'extrude', 'true'],
              'type': 'fill-extrusion',
              'minzoom': 15,
              'paint': {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': [
                  'interpolate', ['linear'], ['zoom'],
                  15,
                  0,
                  15.05,
                  ['get', 'height']
                ],
                'fill-extrusion-base': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['get', 'min_height']
                ],
                'fill-extrusion-opacity': .6
                }
             
            id: 'points',
            source: '',
            type: 'circle'
          }, labelLayerId);
        });
        */

  }

}
