import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeList } from './sede-list';

describe('SedeList', () => {
  let component: SedeList;
  let fixture: ComponentFixture<SedeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SedeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
