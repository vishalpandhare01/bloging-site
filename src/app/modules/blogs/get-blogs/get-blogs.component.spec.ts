import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBlogsComponent } from './get-blogs.component';

describe('GetBlogsComponent', () => {
  let component: GetBlogsComponent;
  let fixture: ComponentFixture<GetBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetBlogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
