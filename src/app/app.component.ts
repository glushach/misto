import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {HttpClient} from '@angular/common/http';
import {User} from './interfaces';
import * as tt from '@tomtom-international/web-sdk-maps';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  userData: User[];
  map: any;
  marker: any;

  constructor(
    private swUpdate: SwUpdate,
    private httpclient: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }

    this.map = tt.map({
      key: 'F1OWcKpYObaXEAz0re3etTj8xf8G20I7',
      container: 'map',
      zoom: 1.2
    });
    this.getJsonData();
  }

  getJsonData(): void {
    this.httpclient.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe((res: User[]) => {
      this.userData = res;
      for (let i = 0; i < this.userData.length; i++) {
        this.marker = new tt.Marker({draggable: false})
          .setLngLat([this.userData[i].address.geo.lng, this.userData[i].address.geo.lat])
          .addTo(this.map);
      }
    });
  }
}
