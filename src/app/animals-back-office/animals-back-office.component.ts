import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Animal} from "../../model/animal";
import {HttpErrorResponse} from "@angular/common/http";
import {AnimalService} from "../../service/animal.service";
import {NgForm} from "@angular/forms";
import {Species} from "../../model/species";
import {SpeciesService} from "../../service/species.service";
import {NationalPark} from "../../model/nationalPark";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-animals-back-office',
  templateUrl: './animals-back-office.component.html',
  styleUrls: ['./animals-back-office.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AnimalsBackOfficeComponent implements OnInit {
  public animal: Animal[] = [];
  public editAnimal: Animal | undefined;
  public deleteAnimal: Animal | undefined;
  public speciesAll: Species[] = [];
  public species: string = "Choose animal species";
  constructor(private route: ActivatedRoute, private animalService : AnimalService, private speciesService : SpeciesService){}

  ngOnInit() {
    this.getAnimal();
    this.getSpecies();
  }

  public getSpecies(): void {
    this.speciesService.getSpecies().subscribe(
      (response : Species[]) => {
        this.speciesAll = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }
  public getAnimal(): void {
    this.route.queryParams.subscribe(params => {
      const nationalParkId = params['id'];
      console.log(nationalParkId);
      this.animalService.getAnimals(nationalParkId).subscribe(
        (response : Animal[]) => {
          this.animal = response;
        },
        (error : HttpErrorResponse) => {
          alert(error.error);
        }
      );
    });

  }

  public onAddAnimal(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-animal-form').click();
    this.animalService.addAnimal(addForm.value).subscribe(
      (response: Animal) => {
        console.log(response);
        this.getAnimal();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateAnimal(animal: Animal): void {
    this.animalService.updateAnimal(animal).subscribe(
      (response) => {
        console.log(response);
        this.getAnimal();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAnimal(animalId: number): void {
    console.log(animalId);
    this.animalService.deleteAnimal(animalId).subscribe(
      (response: void) => {
        this.getAnimal();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchAnimal(key: string): void {
    console.log(key);
    const results: Animal[] = [];
    for (const animal of this.animal) {
      if (animal.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(animal);
      }
    }
    this.animal = results;
    if (results.length === 0 || !key) {
      this.getAnimal();
    }
  }
  public onOpenAddModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addAnimalModal');
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
  public onOpenModal(animal: Animal, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAnimalModal');
    }
    if (mode === 'edit') {
      console.log(this.editAnimal);
      this.editAnimal = animal;
      console.log(this.editAnimal);
      button.setAttribute('data-target', '#updateAnimalModal');
    }
    if (mode === 'delete') {
      this.deleteAnimal = animal;
      button.setAttribute('data-target', '#deleteAnimalModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

}

