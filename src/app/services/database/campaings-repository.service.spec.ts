import { TestBed } from '@angular/core/testing';

import { CampaingsRepository } from './campaings-repository.service';

describe('CampaingsRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampaingsRepository = TestBed.get(CampaingsRepositoryService);
    expect(service).toBeTruthy();
  });
});
