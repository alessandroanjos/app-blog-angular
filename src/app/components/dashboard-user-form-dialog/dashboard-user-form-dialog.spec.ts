import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardUserFormDialog } from './dashboard-user-form-dialog';

describe('DashboardUserFormDialog', () => {
  let component: DashboardUserFormDialog;
  let fixture: ComponentFixture<DashboardUserFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUserFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardUserFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
