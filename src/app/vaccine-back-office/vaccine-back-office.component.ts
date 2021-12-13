import { Component, OnInit } from '@angular/core';
import {Vaccine} from "../../model/vaccine";
import {HttpErrorResponse} from "@angular/common/http";
import {VaccineService} from "../../service/vaccine.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-vaccine-back-office',
  templateUrl: './vaccine-back-office.component.html',
  styleUrls: ['./vaccine-back-office.component.css']
})
export class VaccineBackOfficeComponent implements OnInit {
  public vaccine: Vaccine[] = [];
  public editVaccine: Vaccine | undefined;
  public deleteVaccine: Vaccine | undefined;

  constructor(private vaccineService : VaccineService){}

  ngOnInit() {
    this.getVaccine();
  }

  public getVaccine(): void {
    this.vaccineService.getVaccine().subscribe(
      (response : Vaccine[]) => {
        this.vaccine = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

  public onAddVaccine(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-vaccine-form').click();
    this.vaccineService.addVaccine(addForm.value).subscribe(
      (response: Vaccine) => {
        console.log(response);
        this.getVaccine();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateVaccine(vaccine: Vaccine): void {
    this.vaccineService.updateVaccine(vaccine).subscribe(
      (response) => {
        console.log(response);
        this.getVaccine();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteVaccine(vaccineId: number): void {
    console.log(vaccineId);
    this.vaccineService.deleteVaccine(vaccineId).subscribe(
      (response: void) => {
        this.getVaccine();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchVaccine(key: string): void {
    console.log(key);
    const results: Vaccine[] = [];
    for (const vaccine of this.vaccine) {
      if (vaccine.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(vaccine);
      }
    }
    this.vaccine = results;
    if (results.length === 0 || !key) {
      this.getVaccine();
    }
  }
  public onOpenAddModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addVaccineModal');
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
  public onOpenModal(vaccine: Vaccine, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addVaccineModal');
    }
    if (mode === 'edit') {
      console.log(this.editVaccine);
      this.editVaccine = vaccine;
      console.log(this.editVaccine);
      button.setAttribute('data-target', '#updateVaccineModal');
    }
    if (mode === 'delete') {
      this.deleteVaccine = vaccine;
      button.setAttribute('data-target', '#deleteVaccineModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

}
