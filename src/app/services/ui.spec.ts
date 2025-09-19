import { TestBed } from '@angular/core/testing';

import { Ui } from './ui';

describe('Ui', () => {
  let service: Ui;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ui);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
