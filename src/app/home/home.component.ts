import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Item, ListOfItems } from '../constant/home/home';
import { ApiService } from '../service/api.service';
import { Store } from '@ngrx/store';
import { editItem, initItem, removeItem, save } from '../store/actions';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  listOfUser: Item[]
  userMange: FormGroup;
  private destroyed = new Subject<boolean>();

  constructor(
    private apiService: ApiService,
    private store: Store<{userState: Array<ListOfItems>}>,
    private formBuilder: FormBuilder
  ) {
    store.select(state => state.userState).pipe().subscribe((response:any)=> {
        this.listOfUser = response.items;
        this.userMange = this._createGroup();
    })
   }

  ngOnInit(): void {
    this.apiService.getUserList().pipe(
      takeUntil(this.destroyed),
    ).subscribe((result: Item[]) => {
      this.store.dispatch(initItem(result));
    }, (error) => {
      console.log(error);
    });
    
  }

  private _createGroup(): FormGroup {
    const group = this.formBuilder.group({});
    this.listOfUser.forEach(control => group.addControl(control.id.toString(), this.formBuilder.control(control.name,[Validators.required])));
    return group;
  }

  public deleteUser(id: number): void {
    const index = this.listOfUser.map((x) => x.id).indexOf(id);
    this.store.dispatch(removeItem(index));
  } 

  public editUser (item:Item): void {
    this.store.dispatch(editItem(item));
  }

  public saveItem(item:Item): void {
    if(this.userMange.controls[item.id].valid){
      this.store.dispatch(save(item, this.userMange.controls[item.id].value));
    }
  }
  
  
  public ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}
