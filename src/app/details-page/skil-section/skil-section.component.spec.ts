import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkilSectionComponent } from './skil-section.component';

describe('SkilSectionComponent', () => {
  let component: SkilSectionComponent;
  let fixture: ComponentFixture<SkilSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkilSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkilSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
