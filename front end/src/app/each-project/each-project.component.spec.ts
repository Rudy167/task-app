import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachProjectComponent } from './each-project.component';

describe('EachProjectComponent', () => {
  let component: EachProjectComponent;
  let fixture: ComponentFixture<EachProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
