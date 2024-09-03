import { Component } from '@angular/core';
import { Cliente } from '../../../interfaces/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-cliente.component.html',
  styleUrl: './list-cliente.component.scss'
})
export class ListClienteComponent {
  list:Cliente[]=[]

  constructor( private service:ClienteService){
    this.get()
  }

  get(){
    this.service.list().subscribe(result => {
      this.list = result//.sort((a, b) => a.inicio.localeCompare(b.inicio));
    })
  }

}
