import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,

  ChangeDetectorRef
} from '@angular/core';
import moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { AppComponentBase } from '../../../shared/app-component-base';

import {
  LeaveDto,
  LeaveDtoServiceModuleServiceProxy,
  UpdateleaveDto
} from '../../../shared/service-proxies/service-proxies';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';

import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';

import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';

import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

@Component({
  selector: 'app-edit-leave',

  templateUrl: './edit.component.html',

  styleUrl: './edit.component.css',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    AbpModalHeaderComponent,
    AbpValidationSummaryComponent,
    AbpModalFooterComponent,
    LocalizePipe,
  ],
})
export class EditComponent
  extends AppComponentBase
  implements OnInit {

  @Output() onSave = new EventEmitter<any>();

  saving = false;

  id!: number;

  leave: LeaveDto = new LeaveDto();

  leaveTypes = [
    { id: 1, name: 'Sick Leave' },
    { id: 2, name: 'Casual Leave' },
    { id: 3, name: 'Annual Leave' }
  ];

  constructor(
    injector: Injector,
    private _leaveService: LeaveDtoServiceModuleServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {

  this._leaveService.getById(this.id).subscribe(result => {

    this.leave = result;

    if (this.leave.startDate) {
      this.leave.startDate = moment(this.leave.startDate)
        .format('YYYY-MM-DD') as any;
    }

    if (this.leave.endDate) {
      this.leave.endDate = moment(this.leave.endDate)
        .format('YYYY-MM-DD') as any;
    }

    this.cd.detectChanges();
  });
}

  save(): void {

    if (!this.leave.employeeName ||
      this.leave.employeeName.trim() === '') {

      this.notify.warn('Employee Name is required');

      return;
    }

    if (!this.leave.leaveType) {

      this.notify.warn('Leave Type is required');

      return;
    }

    if (!this.leave.startDate) {

      this.notify.warn('Start Date is required');

      return;
    }

    if (!this.leave.endDate) {

      this.notify.warn('End Date is required');

      return;
    }

   const startDate = moment(this.leave.startDate);
       const endDate = moment(this.leave.endDate);
   
       if (endDate.isBefore(startDate)) {
         this.notify.warn(
           'End Date cannot be earlier than Start Date'
         );
         return;
       }

    this.saving = true;

    const input = new UpdateleaveDto();

    input.init(this.leave);

    this._leaveService.update(input).subscribe(
      () => {

        this.notify.info(
          this.l('SavedSuccessfully')
        );

        this.bsModalRef.hide();

        this.onSave.emit();
      },
      (error) => {

        this.notify.error(
          error?.error?.error?.message ||
          'Something went wrong'
        );

        this.saving = false;

        this.cd.detectChanges();
      }
    );
  }
}