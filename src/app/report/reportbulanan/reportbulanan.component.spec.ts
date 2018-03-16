import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbulananComponent } from './reportbulanan.component';

describe('ReportbulananComponent', () => {
  let component: ReportbulananComponent;
  let fixture: ComponentFixture<ReportbulananComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportbulananComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportbulananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
