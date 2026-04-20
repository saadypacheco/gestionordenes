import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatosFormPage } from './datos-form.page';

describe('DatosFormPage', () => {
  let component: DatosFormPage;
  let fixture: ComponentFixture<DatosFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
