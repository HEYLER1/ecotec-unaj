import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusCard } from './campus-card';

describe('CampusCard', () => {
  let component: CampusCard;
  let fixture: ComponentFixture<CampusCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampusCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampusCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
