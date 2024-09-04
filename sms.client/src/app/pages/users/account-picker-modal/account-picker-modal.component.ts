import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { BasePagedListComponent } from '../../../shared/components/base-paged-list-component';
import { AccountService } from '../../../core/services/account.service';
import { Account } from '../../../shared/models/users/user';



@Component({
  selector: 'app-account-picker-modal',
  templateUrl: './account-picker-modal.component.html',
  styles: [
  ]
})
export class AccountPickerModalComponent extends BasePagedListComponent implements OnInit {
  //items: CostCenter[]=[];
  @Output() itemSelectedEvent: EventEmitter<any> = new EventEmitter();
  items: Account[]=[];
  @Input() accountType:number=1

  constructor(
    private accountService:AccountService,
    public activeModal: NgbActiveModal
    ) {
    super();
  }

  ngOnInit(): void {   
    this.loadItems();
  }

  loadItems() {
    this.accountService
      .list(this.accountType,this.page, this.pageSize, this.search)
      .pipe(first())
      .subscribe({
        next: (_) => {
          this.items = _.data;
          debugger;
          this.totalCount = _.metaData.totalCount;
        },
        error: (errors) => {
          this.errors = errors;
        },
      });
  }
  add(item:any){
    this.itemSelectedEvent.emit(item);
    return false

    //this.activeModal.close(item);
  }
  done(){
    this.activeModal.dismiss();
  }

}
