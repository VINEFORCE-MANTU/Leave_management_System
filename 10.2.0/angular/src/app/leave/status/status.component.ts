import {
  Component,
  EventEmitter,
  Output,
  Injector
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { AppComponentBase } from '../../../shared/app-component-base';

import {
  LeaveDtoServiceModuleServiceProxy,
  UpdateLeaveStatusDto
} from '../../../shared/service-proxies/service-proxies';

@Component({
  selector: 'app-status',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './status.component.html',

  styleUrl: './status.component.css'
})
export class StatusComponent extends AppComponentBase {

  id!: number;

  status!: number;

  saving = false;

  @Output()
  onSave = new EventEmitter<any>();

  statusList = [
    { id: 2, name: 'Approved' },
    { id: 3, name: 'Rejected' }
  ];

  constructor(
    injector: Injector,
    private _leaveService: LeaveDtoServiceModuleServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  save(): void {

    if (!this.status) {

      this.notify.warn(
        'Please select a status'
      );

      return;
    }

    this.saving = true;

    const input = new UpdateLeaveStatusDto();

    input.id = this.id;

    input.status = this.status;

    this._leaveService
      .updateStatus(input)
      .subscribe(
        () => {

          this.notify.success(
            'Status Updated Successfully'
          );

          this.bsModalRef.hide();

          this.onSave.emit();
        },
        () => {

          this.saving = false;
        }
      );
  }
}