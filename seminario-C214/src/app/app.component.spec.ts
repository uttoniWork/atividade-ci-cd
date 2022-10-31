import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {

  let app: AppComponent; //instancia o componente
  let fixture: ComponentFixture<AppComponent>;
  let imc: number;
  let resposta: string;

  const imcAPMock = {
    altura: 1.72,
    peso: 70
  }

  const imcOCIIMock = {
    altura: 1.53,
    peso: 90
  }

  const imcInvalidoMock = {
    altura: 1.39,
    peso: -1
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent); // cria um componente para testes
    app = fixture.componentInstance; 
    fixture.detectChanges(); // faz o data binding com o componente
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('entradaDados', () => {
    it('should calculate the IMC', () => {
      imc = app.entradaDados(imcAPMock.altura, imcAPMock.peso);
      expect(imc).toEqual(23.66);
    });

    it('should return text Peso Normal!', () => {
      app.entradaDados(imcAPMock.altura, imcAPMock.peso);
      resposta = app.resposta;
      expect(resposta).toEqual('Peso normal!');
    });

    it('should not return text Obesidade I!', () => {
      app.entradaDados(imcOCIIMock.altura, imcOCIIMock.peso);
      resposta = app.resposta;
      expect(resposta).not.toEqual('Obesidade I!');
    })

    it('should call limpaCampos function', () => {
      spyOn(app, 'limpaCampos');
      app.entradaDados(imcAPMock.altura, imcAPMock.peso);
      expect(app.limpaCampos).toHaveBeenCalled();
    });
  });

  describe('confereDados', () => {
    it('should call entradaDados if there is no error', () => {
      spyOn(app, 'entradaDados');
      app.confereDados(imcOCIIMock.altura, imcOCIIMock.peso);
      expect(app.entradaDados).toHaveBeenCalledWith(imcOCIIMock.altura, imcOCIIMock.peso);
    })
    it('should throw an exception if the data is invalid', () => {
      expect(() => { app.confereDados(imcInvalidoMock.altura, imcInvalidoMock.peso); }).toThrowError('Altura e peso não podem ser 0, altura deve ser superior a 1.40cm e peso superior a 40kg');
    });
  });

  describe('limpaCampos', () => {
    it('should clean the input fields', () => {
      app.limpaCampos();
      expect(app.altura).toEqual(0);
      expect(app.peso).toEqual(0);
    });
  });
});
