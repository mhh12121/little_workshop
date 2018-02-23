import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiphyWebComponent } from './giphy-web.component';

describe('GiphyWebComponent', () => {
  let component: GiphyWebComponent;
  let fixture: ComponentFixture<GiphyWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiphyWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphyWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
