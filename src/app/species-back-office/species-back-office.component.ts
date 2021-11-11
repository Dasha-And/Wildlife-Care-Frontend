import { Component, OnInit } from '@angular/core';
import {Species} from "../../model/species";
import {HttpErrorResponse} from "@angular/common/http";
import {SpeciesService} from "../../service/species.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-species-back-office',
  templateUrl: './species-back-office.component.html',
  styleUrls: ['./species-back-office.component.css']
})
export class SpeciesBackOfficeComponent implements OnInit {
  public species: Species[] = [];
  public editSpecies: Species | undefined;
  public deleteSpecies: Species | undefined;

  constructor(private speciesService : SpeciesService){}

  ngOnInit() {
    this.getSpecies();
  }

  public getSpecies(): void {
    this.speciesService.getSpecies().subscribe(
      (response : Species[]) => {
        this.species = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

  public onAddSpecies(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-species-form').click();
    this.speciesService.addSpecies(addForm.value).subscribe(
      (response: Species) => {
        console.log(response);
        this.getSpecies();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateSpecies(species: Species): void {
    this.speciesService.updateSpecies(species).subscribe(
      (response) => {
        console.log(response);
        this.getSpecies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteSpecies(speciesId: number): void {
    console.log(speciesId);
    this.speciesService.deleteSpecies(speciesId).subscribe(
      (response: void) => {
        this.getSpecies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchSpecies(key: string): void {
    console.log(key);
    const results: Species[] = [];
    for (const species of this.species) {
      if (species.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(species);
      }
    }
    this.species = results;
    if (results.length === 0 || !key) {
      this.getSpecies();
    }
  }
  public onOpenAddModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addSpeciesModal');
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
  public onOpenModal(species: Species, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSpeciesModal');
    }
    if (mode === 'edit') {
      console.log(this.editSpecies);
      this.editSpecies = species;
      console.log(this.editSpecies);
      button.setAttribute('data-target', '#updateSpeciesModal');
    }
    if (mode === 'delete') {
      this.deleteSpecies = species;
      button.setAttribute('data-target', '#deleteSpeciesModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

}
