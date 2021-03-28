import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { API_MOCK } from './api-mock';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provider: ApiService,
        useValue: API_MOCK
      }],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API Services', () => {
    const  ROOT_URL = "assets/user.json";
    expect(service).toBeTruthy();
    service.getUserList().toPromise();
    const apiCall = httpMock.expectOne({});
    expect(apiCall.request.method).toBe('GET');
  });

});
