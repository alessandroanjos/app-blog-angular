import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDeleteDialog } from './post-delete-dialog';

describe('PostDeleteDialog', () => {
  let component: PostDeleteDialog;
  let fixture: ComponentFixture<PostDeleteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDeleteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDeleteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
