import { Component, OnInit } from '@angular/core';
import {Animal} from "../../model/animal";
import {HttpErrorResponse} from "@angular/common/http";
import {AnimalService} from "../../service/animal.service";
import {SpeciesService} from "../../service/species.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NationalPark} from "../../model/nationalPark";
import {NationalParkService} from "../../service/nationalPark.service";
import {WorkerService} from "../../service/worker.service";
import {Worker} from "../../model/worker";
declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  nationalPark! : NationalPark;
  public animals : Animal[] = [];
  public workers : Worker[] = [];
  clicked : boolean = false;
  clickedAnimal! : Animal;
  animalLat! :number;
  animalLng! :number;
  animalMap :boolean = false;
  workerMap :boolean = false;
  nationalParkId!:number;
  map :any;
  markers: any;
  //Aberdare
  public latitude : number[] = [-0.41640388574487475, -0.4569022963354209, -0.39491733839090776, -0.40681116796771183];
  public longitude : number[] = [36.667437472833164, 36.674056399435756, 36.64047350037442, 36.6869172104318];

  //Askania-Nova
  // public latitude : number[] = [46.45891564072584, 46.45992548222519, 46.45965524478609];
  // public longitude : number[] = [33.86569793382252, 33.86858852587495, 33.87040546945076];

  constructor(private workerService: WorkerService, private router: Router, private route: ActivatedRoute, private animalService : AnimalService, private speciesService : SpeciesService, private nationalParkService : NationalParkService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const nationalParkId = params['id'];
      console.log(nationalParkId);
      this.nationalParkId = nationalParkId;
    });
    this.nationalParkService.getNationalParkPage(this.nationalParkId).subscribe(
      (response : NationalPark) => {
        this.nationalPark = response;
        this.map = L.map('map').setView([this.nationalPark.latitude, this.nationalPark.longitude], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGFzaGFhbmQwMSIsImEiOiJja3YyOGE0MW0zdnRkMm5zN2ltZWl0am9rIn0.3OIsOgNmXV0YDWuSV53ztA', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoiZGFzaGFhbmQwMSIsImEiOiJja3YyOGE0MW0zdnRkMm5zN2ltZWl0am9rIn0.3OIsOgNmXV0YDWuSV53ztA'
        }).addTo(this.map);
      })

  }

  close() {
    this.clicked = false;
  }

  goToAnimals() {
    this.router.navigate([':id/animals'], {queryParams: {id: this.nationalPark.id}});
  }

  goToWorkers() {
    this.router.navigate([':id/workers'], {queryParams: {id: this.nationalPark.id}});
  }

  showAnimalMap() {
    this.animalMap = true;
    this.workerMap = false;
    if (this.markers) {
      this.map.removeLayer(this.markers);
    }
    if (this.animalMap) {
      this.markers = L.layerGroup().addTo(this.map);
      this.animalService.getAnimals(this.nationalParkId).subscribe(
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
                let lati : number = this.latitude[i];
                console.log(lati);
                let lon : number = this.longitude[i];
                var marker = L.marker([lati, lon], {icon: icon}).addTo(this.map).bindPopup(this.animals[i].name);
                this.markers.addLayer(marker);
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
  }

  showWorkerMap() {
    this.workerMap = true;
    this.animalMap = false;
    if (this.markers) {
      this.map.removeLayer(this.markers);
    }
    if (this.workerMap) {
      this.markers = L.layerGroup().addTo(this.map);
      this.workerService.getWorkers(this.nationalParkId).subscribe(
        (response : Worker[]) => {
          this.workers = response;
          console.log(this.workers)
          for (let i = 0; i < this.workers.length; i++) {
            console.log(this.workers[i]);
            this.workerService.getIconUrl(this.workers[i].id).subscribe(
              (response : string) => {
                console.log(response);
                var icon =L.icon({
                  iconUrl: response,
                  iconSize: [45, 45],
                })
                let lati : number = this.latitude[i];
                console.log(lati);
                let lon : number = this.longitude[i];
                var marker = L.marker([lati, lon], {icon: icon}).addTo(this.map).bindPopup(this.workers[i].username);
                this.markers.addLayer(marker);
                const onClick = () => {
                  //this.clicked = true;
                  //this.clickedAnimal = this.animals[i];
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
                  this.workers[i].latitude = lati;
                  this.workers[i].longitude = lon;
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
  }
}
