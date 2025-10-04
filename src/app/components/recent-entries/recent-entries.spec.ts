import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentEntries } from './recent-entries';

describe('RecentEntries', () => {
  let component: RecentEntries;
  let fixture: ComponentFixture<RecentEntries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentEntries]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentEntries);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
