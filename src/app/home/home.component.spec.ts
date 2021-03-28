import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { EDIT_STORE_MOCK, STORE_MOCK } from '../add-user/store-mock';
import { API_MOCK } from '../service/api-mock';
import { ApiService } from '../service/api.service';
import { deleteAll, editItem, removeItem, save } from '../store/actions';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let apiService: ApiService;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store;

  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of(STORE_MOCK));
    dispatch = jasmine.createSpy();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [HomeComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj(
            'getUserList',
            {
              'getUserList': of(API_MOCK),
            },
          ),
        },
        {
          provide: Store,
          useClass: StoreMock,
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    apiService.getUserList();
  });

  it('should check api return', () => {
    expect(component.listOfUser.length).toBe(2)
  });

  it("should action call removeItem()", () => {
    const id = component.listOfUser[1].id
    component.deleteUser(id);
    expect(store.dispatch).toHaveBeenCalledWith(removeItem(1));
  });

  it("should action call editItem()", () => {
    const item = component.listOfUser[1]
    component.editUser(item);
    expect(store.dispatch).toHaveBeenCalledWith(editItem(item));
  });

  it("should action call saveItem()", () => {
    const item = component.listOfUser[1];
    component.userMange.controls[item.id].setValue('srini');
    component.saveItem(item);
    expect(store.dispatch).toHaveBeenCalledWith(save(item, component.userMange.controls[item.id].value));
  });
});
