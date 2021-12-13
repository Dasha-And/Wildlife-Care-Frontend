import { Component, OnInit } from '@angular/core';
import {NationalPark} from "../../model/nationalPark";
import {HttpErrorResponse} from "@angular/common/http";
import {NationalParkService} from "../../service/nationalPark.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-superdmin-back-office',
  templateUrl: './superadmin-back-office.component.html',
  styleUrls: ['./superadmin-back-office.component.css']
})
export class SuperadminBackOfficeComponent implements OnInit {
  public nationalParks: NationalPark[] = [];
  public editNationalPark: NationalPark | undefined;
  public deleteNationalPark: NationalPark | undefined;

  constructor(private nationalParkService : NationalParkService){}

  ngOnInit() {
    this.getNationalPark();
  }

  public getNationalPark(): void {
    this.nationalParkService.getNationalPark().subscribe(
      (response : NationalPark[]) => {
        this.nationalParks = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

  public onAddNationalPark(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-nationalPark-form').click();
    this.nationalParkService.addNationalPark(addForm.value).subscribe(
      (response: NationalPark) => {
        console.log(response);
        this.getNationalPark();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateNationalPark(nationalPark: NationalPark): void {
    this.nationalParkService.updateNationalPark(nationalPark).subscribe(
      (response) => {
        console.log(response);
        this.getNationalPark();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteNationalPark(nationalParkId: number): void {
    console.log(nationalParkId);
    this.nationalParkService.deleteNationalPark(nationalParkId).subscribe(
      (response: void) => {
        this.getNationalPark();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchNationalPark(key: string): void {
    console.log(key);
    const results: NationalPark[] = [];
    for (const nationalPark of this.nationalParks) {
      if (nationalPark.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(nationalPark);
      }
    }
    this.nationalParks = results;
    if (results.length === 0 || !key) {
      this.getNationalPark();
    }
  }
  public onOpenAddModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addNationalParkModal');
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
  public onOpenModal(nationalPark: NationalPark, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addNationalParkModal');
    }
    if (mode === 'edit') {
      console.log(this.editNationalPark);
      this.editNationalPark = nationalPark;
      console.log(this.editNationalPark);
      button.setAttribute('data-target', '#updateNationalParkModal');
    }
    if (mode === 'delete') {
      this.deleteNationalPark = nationalPark;
      button.setAttribute('data-target', '#deleteNationalParkModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

}
