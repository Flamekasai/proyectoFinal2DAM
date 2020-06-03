import { TestBed } from '@angular/core/testing';

import { CampaignsRepository } from './campaigns-repository.service';

describe('CampaignsRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampaignsRepository = TestBed.get(CampaignsRepositoryService);
    expect(service).toBeTruthy();
  });
});
