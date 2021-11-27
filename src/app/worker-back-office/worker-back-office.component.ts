import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Worker} from "../../model/worker";
import {HttpErrorResponse} from "@angular/common/http";
import {WorkerService} from "../../service/worker.service";
import {NgForm} from "@angular/forms";
import {Role} from "../../model/role";
import {RoleService} from "../../service/role.service";
import {NationalPark} from "../../model/nationalPark";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-workers-back-office',
  templateUrl: './worker-back-office.component.html',
  styleUrls: ['./worker-back-office.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class WorkersBackOfficeComponent implements OnInit {
  public worker: Worker[] = [];
  public editWorker: Worker | undefined;
  public deleteWorker: Worker | undefined;
  public roleAll: Role[] = [];
  public role: string = "Choose worker role";
  nationalParkId!: number;
  constructor(private route: ActivatedRoute, private workerService : WorkerService, private roleService : RoleService){}

  ngOnInit() {
    this.getWorker();
    this.getRole();
  }

  public getRole(): void {
    this.roleService.getRole().subscribe(
      (response : Role[]) => {
        this.roleAll = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }
  public getWorker(): void {
    this.route.queryParams.subscribe(params => {
      const nationalParkId = params['id'];
      this.nationalParkId = nationalParkId;
      console.log(nationalParkId);
      this.workerService.getWorkers(nationalParkId).subscribe(
        (response : Worker[]) => {
          this.worker = response;
        },
        (error : HttpErrorResponse) => {
          alert(error.error);
        }
      );
    });

  }

  public onAddWorker(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-worker-form').click();
    this.workerService.addWorker(addForm.value).subscribe(
      (response: Worker) => {
        console.log(response);
        this.getWorker();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateWorker(worker: Worker): void {
    this.workerService.updateWorker(worker).subscribe(
      (response) => {
        console.log(response);
        this.getWorker();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteWorker(workerId: number): void {
    console.log(workerId);
    this.workerService.deleteWorker(workerId).subscribe(
      (response: void) => {
        this.getWorker();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchWorker(key: string): void {
    console.log(key);
    const results: Worker[] = [];
    for (const worker of this.worker) {
      if (worker.username.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(worker);
      }
    }
    this.worker = results;
    if (results.length === 0 || !key) {
      this.getWorker();
    }
  }
  public onOpenAddModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addWorkerModal');
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
  public onOpenModal(worker: Worker, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addWorkerModal');
    }
    if (mode === 'edit') {
      console.log(this.editWorker);
      this.editWorker = worker;
      console.log(this.editWorker);
      button.setAttribute('data-target', '#updateWorkerModal');
    }
    if (mode === 'delete') {
      this.deleteWorker = worker;
      button.setAttribute('data-target', '#deleteWorkerModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

}
