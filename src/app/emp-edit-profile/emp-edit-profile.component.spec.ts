import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEditProfileComponent } from './emp-edit-profile.component';

describe('EmpEditProfileComponent', () => {
  let component: EmpEditProfileComponent;
  let fixture: ComponentFixture<EmpEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpEditProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
