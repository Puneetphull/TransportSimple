import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripRouteComponent } from './trip-route.component';

describe('TripRouteComponent', () => {
  let component: TripRouteComponent;
  let fixture: ComponentFixture<TripRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
