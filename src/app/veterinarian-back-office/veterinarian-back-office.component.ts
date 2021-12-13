import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AnimalVaccination} from "../../model/animalVaccination";
import {HttpErrorResponse} from "@angular/common/http";
import {AnimalVaccinationService} from "../../service/animalVaccination.service";
import {NgForm} from "@angular/forms";
import {Role} from "../../model/role";
import {RoleService} from "../../service/role.service";
import {NationalPark} from "../../model/nationalPark";
import {ActivatedRoute} from "@angular/router";
import {VaccineService} from "../../service/vaccine.service";
import {Vaccine} from "../../model/vaccine";
import {AnimalService} from "../../service/animal.service";
import {Animal} from "../../model/animal";

@Component({
  selector: 'app-veterinarian-back-office',
  templateUrl: './veterinarian-back-office.component.html',
  styleUrls: ['./veterinarian-back-office.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class VeterinarianBackOfficeComponent implements OnInit {
  public animalVaccination: AnimalVaccination[] = [];
  public editAnimalVaccination: AnimalVaccination | undefined;
  public deleteAnimalVaccination: AnimalVaccination | undefined;
  public vaccineAll: Vaccine[] = [];
  public animalAll: Animal[] = [];
  public vaccine: string = "Choose vaccine";
  public animal: string = "Choose animal";
  nationalParkId!: number;
  constructor(private route: ActivatedRoute, private animalVaccinationService : AnimalVaccinationService, private vaccineService : VaccineService, private animalService: AnimalService){}

  ngOnInit() {
    this.getAnimalVaccination();
    this.getVaccine();
    this.getAnimal();
  }

  public getVaccine(): void {
    this.vaccineService.getVaccine().subscribe(
      (response : Vaccine[]) => {
        this.vaccineAll = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

  public getAnimal(): void {
    this.animalService.getAnimals(this.nationalParkId).subscribe(
      (response : Animal[]) => {
        this.animalAll = response;
        console.log(response)
      },
      (error : HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }
  public getAnimalVaccination(): void {
    this.route.queryParams.subscribe(params => {
      const nationalParkId = params['id'];
      this.nationalParkId = nationalParkId;
      console.log(nationalParkId);
      this.animalVaccinationService.getAnimalVaccinations(nationalParkId).subscribe(
        (response : AnimalVaccination[]) => {
          this.animalVaccination = response;
        },
        (error : HttpErrorResponse) => {
          alert(error.error);
        }
      );
    });

  }

  public onAddAnimalVaccination(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-animalVaccination-form').click();
    this.animalVaccinationService.addAnimalVaccination(addForm.value).subscribe(
      (response: AnimalVaccination) => {
        console.log(response);
        this.getAnimalVaccination();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateAnimalVaccination(animalVaccination: AnimalVaccination): void {
    this.animalVaccinationService.updateAnimalVaccination(animalVaccination).subscribe(
      (response) => {
        console.log(response);
        this.getAnimalVaccination();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAnimalVaccination(animalVaccinationId: number): void {
    console.log(animalVaccinationId);
    this.animalVaccinationService.deleteAnimalVaccination(animalVaccinationId).subscribe(
      (response: void) => {
        this.getAnimalVaccination();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchAnimalVaccination(key: string): void {
    console.log(key);
    const results: AnimalVaccination[] = [];
    for (const animalVaccination of this.animalVaccination) {
      if (animalVaccination.animal.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(animalVaccination);
      }
    }
    this.animalVaccination = results;
    if (results.length === 0 || !key) {
      this.getAnimalVaccination();
    }
  }
  public onOpenAddModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addAnimalVaccinationModal');
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
  public onOpenModal(animalVaccination: AnimalVaccination, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAnimalVaccinationModal');
    }
    if (mode === 'edit') {
      console.log(this.editAnimalVaccination);
      this.editAnimalVaccination = animalVaccination;
      console.log(this.editAnimalVaccination);
      button.setAttribute('data-target', '#updateAnimalVaccinationModal');
    }
    if (mode === 'delete') {
      this.deleteAnimalVaccination = animalVaccination;
      button.setAttribute('data-target', '#deleteAnimalVaccinationModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

}
