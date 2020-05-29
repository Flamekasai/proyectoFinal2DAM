import { TestBed } from '@angular/core/testing';

import { UsersRepository } from './users-repository.service';

describe('UsersRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersRepositoryService = TestBed.get(UsersRepository);
    expect(service).toBeTruthy();
  });
});
