import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Item } from '../constant/home/home';
import { deleteAll, editAll } from '../store/actions';

import { AddUserComponent } from './add-user.component';
import { STORE_MOCK } from './store-mock';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let store: Store<Item>;

  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of(STORE_MOCK));
    dispatch = jasmine.createSpy();
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: Store,
          useClass: StoreMock,
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check store', () => {
    expect(component.listOfUser.length).toBe(2)
  });

  it('should check add input validation', () => {
    expect(component.addUserForm.controls['addUserInput'].invalid).toBeTruthy();
    component.addUserForm.controls['addUserInput'].setValue('srini');
    expect(component.addUserForm.controls['addUserInput'].valid).toBeTruthy();
  });

  it("should action call deleteAll()", () => {
    const id = component.listOfUser[1].id
    component.deleteAllUser();
    expect(store.dispatch).toHaveBeenCalledWith(deleteAll());
  });

  it("should action call editAll()", () => {
    const id = component.listOfUser[1].id
    component.editAllUser();
    expect(store.dispatch).toHaveBeenCalledWith(editAll());
  });
});
