import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPersonal } from './form-personal';

describe('FormPersonal', () => {
  let component: FormPersonal;
  let fixture: ComponentFixture<FormPersonal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPersonal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPersonal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
