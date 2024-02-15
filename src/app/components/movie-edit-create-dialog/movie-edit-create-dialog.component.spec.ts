import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieEditCreateDialogComponent } from './movie-edit-create-dialog.component';

describe('MovieEditCreateDialogComponent', () => {
  let component: MovieEditCreateDialogComponent;
  let fixture: ComponentFixture<MovieEditCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieEditCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieEditCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
