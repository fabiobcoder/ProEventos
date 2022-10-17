import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any=[];
  public eventosFiltrados: any = [];
  widthImg = 150;
  marginImg = 2;
  showImg = true;
  private _listFilter = '';

  public get listFilter(): string{
      return this._listFilter;
  }

  public set listFilter(value: string){
    this._listFilter = value;
    this.eventosFiltrados = this.listFilter ? this.eventFilter(this.listFilter) : this.eventos;
  }

  eventFilter (byFilter: string): any {
    byFilter = byFilter.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string }) => evento.tema.toLocaleLowerCase().indexOf(byFilter) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(byFilter) !== 1
    )
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEvento();
  }

  alterarImagem(){
    this.showImg = !this.showImg;
  }

  public getEvento(): void {
this.http.get('https://localhost:5001/api/Eventos/').subscribe(
    response => {
    this.eventos = response;
    this.eventosFiltrados = this.eventos;
  },
  error => console.log(error)
    );
  }
}


