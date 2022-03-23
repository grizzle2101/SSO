import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementPanelComponent } from './user-management-panel.component';

describe('UserManagementPanelComponent', () => {
  let component: UserManagementPanelComponent;
  let fixture: ComponentFixture<UserManagementPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
