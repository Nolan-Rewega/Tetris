import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrlPanelComponent } from './ctrl-panel.component';

describe('CtrlPanelComponent', () => {
  let component: CtrlPanelComponent;
  let fixture: ComponentFixture<CtrlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtrlPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtrlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
