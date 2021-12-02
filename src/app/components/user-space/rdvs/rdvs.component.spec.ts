import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvsComponent } from './rdvs.component';

describe('RdvsComponent', () => {
  let component: RdvsComponent;
  let fixture: ComponentFixture<RdvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
