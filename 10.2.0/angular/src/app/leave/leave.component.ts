import {
  Component,
  Injector,
  ChangeDetectorRef,
  ViewChild,
  OnInit
} from '@angular/core';

import { finalize } from 'rxjs/operators';

import { BsModalService } from 'ngx-bootstrap/modal';

import { Table, TableModule } from 'primeng/table';

import { LazyLoadEvent, PrimeTemplate } from 'primeng/api';

import {
  Paginator,
  PaginatorModule
} from 'primeng/paginator';

import { FormsModule } from '@angular/forms';

import { CommonModule, NgIf } from '@angular/common';

import { appModuleAnimation } from '../../shared/animations/routerTransition';

import { PagedListingComponentBase } from '../../shared/paged-listing-component-base';

import { LocalizePipe } from '../../shared/pipes/localize.pipe';

import {
  LeaveDto,
  LeaveDtoServiceModuleServiceProxy
} from '../../shared/service-proxies/service-proxies';
import { StatusComponent } from './status/status.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-leave',

  templateUrl: './leave.component.html',

  styleUrls: ['./leave.component.css'],

  animations: [appModuleAnimation()],

  standalone: true,

  imports: [
    FormsModule,
    TableModule,
    PrimeTemplate,
    NgIf,
    PaginatorModule,
    LocalizePipe,
    CommonModule
  ],
})
export class LeaveComponent
  extends PagedListingComponentBase<LeaveDto>
  implements OnInit {

  @ViewChild('dataTable', { static: true })
  dataTable!: Table;

  @ViewChild('paginator', { static: true })
  paginator!: Paginator;

  leaves: LeaveDto[] = [];

  keyword = '';

  primengTableHelper: any;

  constructor(
    injector: Injector,
    private _leaveService: LeaveDtoServiceModuleServiceProxy,
    private _modalService: BsModalService,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  ngOnInit(): void {
    this.getAllLeaves();
  }

  getAllLeaves(): void {

    this.primengTableHelper.showLoadingIndicator();

    this._leaveService
      .getAll()
      .pipe(
        finalize(() => {
          this.primengTableHelper.hideLoadingIndicator();
        })
      )
      .subscribe((result) => {

        this.leaves = result;

        this.primengTableHelper.records = result;

        this.primengTableHelper.totalRecordsCount = result.length;

        this.cd.detectChanges();
      });
  }

  list(event?: LazyLoadEvent): void {

    if (this.primengTableHelper.shouldResetPaging(event)) {

      this.paginator.changePage(0);

      if (this.primengTableHelper.records?.length) {
        return;
      }
    }

    this.getAllLeaves();
  }

  createLeave(): void {

    const modalRef = this._modalService.show(
      CreateComponent,
      {
        class: 'modal-lg',
      }
    );

    modalRef.content?.onSave.subscribe(() => {

      this.getAllLeaves();

      this.refresh();
    });
  }

  editLeave(leave: LeaveDto): void {

    const modalRef = this._modalService.show(
      EditComponent,
      {
        class: 'modal-lg',

        initialState: {
          id: leave.id,
        },
      }
    );

    modalRef.content?.onSave.subscribe(() => {

      this.getAllLeaves();

      this.refresh();
    });
  }
  
  updateStatus(leave: LeaveDto): void {

  const modalRef = this._modalService.show(
    StatusComponent,
    {
      class: 'modal-md',

      initialState: {
        id: leave.id,
        status: leave.status
      }
    }
  );

  modalRef.content?.onSave.subscribe(() => {

    this.getAllLeaves();

    this.refresh();

  });
}

  delete(leave: LeaveDto): void {

    abp.message.confirm(
      'LeaveDeleteWarningMessage',
      undefined,
      (result: boolean) => {

        if (result) {

          this._leaveService.delete(leave.id).subscribe(() => {

            abp.notify.success('SuccessfullyDeleted');

            this.getAllLeaves();

            this.refresh();
          });
        }
      }
    );
  }

  getStatusName(status: number): string {

    switch (status) {

      case 1:
        return 'Pending';

      case 2:
        return 'Approved';

      case 3:
        return 'Rejected';

      default:
        return 'Unknown';
    }
  }
}