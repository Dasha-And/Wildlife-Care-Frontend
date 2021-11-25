import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {NationalParkService} from "../../service/nationalPark.service";
import {NationalPark} from "../../model/nationalPark";
import {FormControl, FormGroup} from "@angular/forms";
import {WorkerService} from "../../service/worker.service";
import {Worker} from "../../model/worker";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public nationalPark! : NationalPark;
  loginForm!: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private nationalParkService: NationalParkService, private workerService: WorkerService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
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

  login() {
    this.workerService.login(this.loginForm.value).subscribe(
      (response: Worker) => {
        console.log(response);
        this.loginForm.reset();
        if (response.role == 'ROLE_ADMIN') {
          this.router.navigate(['/map/:id'], {queryParams: {id: this.nationalPark.id}});
        } else if (response.role == 'ROLE_VETERINARIAN') {

        }
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
        console.log(error.error)
      }
    );
  }
}
