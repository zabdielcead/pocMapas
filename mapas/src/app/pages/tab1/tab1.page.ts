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
  dataDos: any = {
    'type': 'FeatureCollection',
    'features': [{
            'type': 'Feature',
            'properties': { 
              'description': 'id1<strong>PENI</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">2X1 Café</a> Cualquier café 2x1 - Vigencia: 21-12-2021 6:00 p.m.</p>',
              'icon': 'theatre'
      
             },
            'geometry': {
                'type': 'Point',
                // 'coordinates': [-99.2457321,    19.355098299996999 ]
                'coordinates': this.createCoorRandom()
            }
        },
        {
            'type': 'Feature',
            // 'properties': { 'PROVEEDOR': 'VIPS', 'OFERTA': '2X1', 'TIPO': 'DESAYUNO', 'SUCURSAL': 'SUC1', 'VIGENCIA': '08/06/2020' },  titulo descripcion telefono
            'properties': { 
              'description': 'id2<strong>VAKITA</strong><p><a (click)="clickoferta()" >2X1 Café</a> Cualquier café 2x1 - Vigencia: 21-12-2021 6:00 p.m.</p> <ion-button (click)="clickoferta()">Default</ion-button>',                     
              'icon': 'theatre'
             },
            'geometry': {
                'type': 'Point',
                // 'coordinates': [-99.23787321, 19.398098299996999 ]
                'coordinates': this.createCoorRandom()
            }
        }

    ]
};
jsonObject :any =  JSON.stringify(this.dataDos);

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

  createCoorRandom() {
    var r = 300/111300 // = 100 meters
  , y0 = this.lat
  , x0 = this.lng
  , u = Math.random()
  , v = Math.random()
  , w = r * Math.sqrt(u)
  , t = 2 * Math.PI * v
  , x = w * Math.cos(t)
  , y1 = w * Math.sin(t)
  , x1 = x / Math.cos(y0);

    var newY = y0 + y1;
    var newX = x0 + x1;

    return new Array(Number(newX), Number(newY));
  }

  clickoferta(){
   return {
    'type': 'FeatureCollection',
    'features': [{
            'type': 'Feature',
            'properties': { 
              'description': 'id1<strong>Cafetería</strong><p> Cualquier café 2x1 - Vigencia: 21-12-2021 6:00 p.m.</p>',
              'icon': 'theatre'
      
             },
            'geometry': {
                'type': 'Point',
                // 'coordinates': [-99.2457321,    19.355098299996999 ]
                'coordinates': this.createCoorRandom()
            }
        },
        {
            'type': 'Feature',
            // 'properties': { 'PROVEEDOR': 'VIPS', 'OFERTA': '2X1', 'TIPO': 'DESAYUNO', 'SUCURSAL': 'SUC1', 'VIGENCIA': '08/06/2020' },  titulo descripcion telefono
            'properties': { 
              'description': 'id2<strong>Renta Departamento</strong><p> $5000.00 mensuales </p>',
              'icon': 'theatre'
             },
            'geometry': {
                'type': 'Point',
                // 'coordinates': [-99.23787321, 19.398098299996999 ]
                'coordinates': this.createCoorRandom()
            }
        }

    ]
   }
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
          // 'tiles': [ 'URL'],
          'data':  {
            'type': 'FeatureCollection',
            'features': [{
                    'type': 'Feature',
                    'properties': { 
                      'description': 'id1<strong>Cafetería</strong><p> Cualquier café 2x1 - Vigencia: 21-12-2021 6:00 p.m.</p>',
                      'icon': 'theatre'
              
                     },
                    'geometry': {
                        'type': 'Point',
                        // 'coordinates': [-99.2457321,    19.355098299996999 ]
                        'coordinates': this.createCoorRandom()
                    }
                },
                {
                    'type': 'Feature',
                    // 'properties': { 'PROVEEDOR': 'VIPS', 'OFERTA': '2X1', 'TIPO': 'DESAYUNO', 'SUCURSAL': 'SUC1', 'VIGENCIA': '08/06/2020' },  titulo descripcion telefono
                    'properties': { 
                      'description': 'id2<strong>Renta Departamento</strong><p> $5000.00 mensuales </p>',
                      'icon': 'theatre'
                     },
                    'geometry': {
                        'type': 'Point',
                        // 'coordinates': [-99.23787321, 19.398098299996999 ]
                        'coordinates': this.createCoorRandom()
                    }
                }
        
            ]
        }
          // 'tileSize': 200
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

        map.on('click', 'points', function(e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;
          console.log('punto', description);
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map);
          });
          // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'points', function() {
            map.getCanvas().style.cursor = 'pointer';
          });
          // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'points', function() {
            map.getCanvas().style.cursor = '';
          });

        setInterval(( ) => {
            map.getSource('pointsSource').setData(this.clickoferta());
           // window.location.reload();
          }, 9000);





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
