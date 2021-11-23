import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {NationalParkService} from "../../service/nationalPark.service";
import {NationalPark} from "../../model/nationalPark";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public nationalPark! : NationalPark;
  constructor(private route: ActivatedRoute, private nationalParkService: NationalParkService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const nationalParkId = params['nationalParkId'];
      console.log(nationalParkId);
      this.nationalParkService.getNationalParkPage(nationalParkId).subscribe(
        (response : NationalPark) => {
          this.nationalPark = response;
        },
        (error : HttpErrorResponse) => {
          alert(error.message);
        }
      );
    });
  }

}
