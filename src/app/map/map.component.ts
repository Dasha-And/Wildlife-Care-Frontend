import { Component, OnInit } from '@angular/core';
import {Animal} from "../../model/animal";
import {HttpErrorResponse} from "@angular/common/http";
import {AnimalService} from "../../service/animal.service";
import {SpeciesService} from "../../service/species.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NationalPark} from "../../model/nationalPark";
import {NationalParkService} from "../../service/nationalPark.service";
declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  nationalPark! : NationalPark;
  public animals : Animal[] = [];
  clicked : boolean = false;
  clickedAnimal! : Animal;
  animalLat! :number;
  animalLng! :number;

  //Aberdare
  public latitude : number[] = [-0.41640388574487475, -0.4569022963354209, -0.39491733839090776, -0.40681116796771183];
  public longitude : number[] = [36.667437472833164, 36.674056399435756, 36.64047350037442, 36.6869172104318];

  //Askania-Nova
  // public latitude : number[] = [46.45891564072584, 46.45992548222519, 46.45965524478609];
  // public longitude : number[] = [33.86569793382252, 33.86858852587495, 33.87040546945076];

  constructor(private router: Router, private route: ActivatedRoute, private animalService : AnimalService, private speciesService : SpeciesService, private nationalParkService : NationalParkService) { }

  ngOnInit(): void {

    // var bigLionIcon = L.icon({
    //   iconUrl: 'https://img.icons8.com/external-victoruler-flat-victoruler/50/000000/external-lion-animals-victoruler-flat-victoruler.png',
    //
    //   iconSize:     [55, 55], // size of the icon// point of the icon which will correspond to marker's location
    // });
    // L.marker([-0.41640388574487475, 36.667437472833164], {icon: bigLionIcon}).addTo(map);
    // L.marker([-0.4090890570759807, 36.6880408101332], {icon: bigLionIcon}).addTo(map);
    // L.marker([-0.4569022963354209, 36.674056399435756], {icon: bigLionIcon}).addTo(map);
    // L.marker([-0.39491733839090776, 36.64047350037442], {icon: bigLionIcon}).addTo(map);
    // L.marker([-0.40681116796771183, 36.6869172104318], {icon: bigLionIcon}).addTo(map);
    this.route.queryParams.subscribe(params => {
      const nationalParkId = params['id'];
      console.log(nationalParkId);
      this.nationalParkService.getNationalParkPage(nationalParkId).subscribe(
        (response : NationalPark) => {
          this.nationalPark = response;
          let map = L.map('map').setView([this.nationalPark.latitude, this.nationalPark.longitude], 13);
          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGFzaGFhbmQwMSIsImEiOiJja3YyOGE0MW0zdnRkMm5zN2ltZWl0am9rIn0.3OIsOgNmXV0YDWuSV53ztA', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZGFzaGFhbmQwMSIsImEiOiJja3YyOGE0MW0zdnRkMm5zN2ltZWl0am9rIn0.3OIsOgNmXV0YDWuSV53ztA'
          }).addTo(map);
          this.animalService.getAnimals(nationalParkId).subscribe(
            (response : Animal[]) => {
              this.animals = response;
              console.log(this.animals)
              for (let i = 0; i < this.animals.length; i++) {
                console.log(this.animals[i]);
                this.animalService.getIconUrl(this.animals[i].id).subscribe(
                  (response : string) => {
                    console.log(response);
                    var icon =L.icon({
                      iconUrl: response,
                      iconSize: [55, 55],
                    })
                    // let marker = L.marker([this.latitude[i], this.longitude[i]], {icon: icon}).addTo(map);
                    // marker.bindPopup(this.animals[i].name);
                    let lati : number = this.latitude[i];
                    console.log(lati);
                    let lon : number = this.longitude[i];
                    var marker = L.marker([lati, lon], {icon: icon}).addTo(map).bindPopup(this.animals[i].name);

                    const onClick = () => {
                      this.clicked = true;
                      this.clickedAnimal = this.animals[i];
                    }
                    marker.on('click', onClick)

                    const increment = () =>{
                      if (i %2 == 0) {
                        lati = lati + 0.0002;
                        lon = lon - 0.0002;

                      } else {
                        lati = lati - 0.0002;
                        lon = lon + 0.0002;
                      }
                      // if (marker) {
                      //   map.removeLayer(marker)
                      // }
                      this.animals[i].latitude = lati;
                      this.animals[i].longitude = lon;
                      marker.setLatLng([lati, lon]);
                    }

                    setInterval(() => {
                      increment()
                    }, 1000)
                  }
                )
              }
            },
            (error : HttpErrorResponse) => {
              alert(error.error);
            }
          );
        }
      )

    });


  }

  close() {
    this.clicked = false;
  }

  goToAnimals() {
    this.router.navigate([':id/animals'], {queryParams: {id: this.nationalPark.id}});
  }
}
