import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsStudent } from './forms-student';

describe('FormsStudent', () => {
  let component: FormsStudent;
  let fixture: ComponentFixture<FormsStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
