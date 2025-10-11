import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeListComponent } from './sede-list';

describe('SedeList', () => {
  let component: SedeListComponent;
  let fixture: ComponentFixture<SedeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SedeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
