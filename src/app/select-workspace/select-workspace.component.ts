import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NationalParkService } from 'src/service/nationalPark.service';

@Component({
  selector: 'app-select-workspace',
  templateUrl: './select-workspace.component.html',
  styleUrls: ['./select-workspace.component.css']
})
export class SelectWorkspaceComponent implements OnInit {

  public nationalParkId: number | undefined;

  constructor(private router: Router, private nationalParkService: NationalParkService) { }

  ngOnInit(): void {
  }


  goToLogin() {
    var id:string = (<HTMLInputElement>document.getElementById("nationalParkId")).value;
    this.nationalParkId = +id;
    this.router.navigate(['/login/:nationalParkId'], {queryParams: {nationalParkId: this.nationalParkId}});
    console.log(this.nationalParkId);
  }
}
