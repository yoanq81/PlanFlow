import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set empty token and get user not authenticate', () => {
    const testToken = '';
    service.setToken(testToken);
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should set and get token correctly', () => {
    const testToken = 'test-token';
    service.setToken(testToken);
    expect(service.token()).toBe(testToken);
    expect(service.isAuthenticated()).toBeTrue();
  });
});
