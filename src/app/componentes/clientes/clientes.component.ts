import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.servicio';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes?:Cliente[];
  cliente:Cliente={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }
  @ViewChild("clienteForm") clienteForm: NgForm;
  
  @ViewChild("botonCerrar") botonCerrar: ElementRef;


  constructor(private ClienteServicio: ClienteServicio,
              private flashMessages: FlashMessagesService) { }
  
  ngOnInit(): void {
    this.ClienteServicio.getClientes().subscribe(
      clientes =>{
        this.clientes=clientes;
      }
    );
    
  }
  getSaldoTotal(){
    let saldoTotal:number=0;
    if(this.clientes!=null){
      this.clientes.forEach(cliente => {
        saldoTotal+=cliente.saldo;
      });
    }
    return saldoTotal;
  }

  agregar({value,valid}:{value:Cliente,valid: boolean}){
    if(!valid){
      this.flashMessages.show("Por favor llena el formulario correctamente",{
        cssClass: 'alert-danger',timeout:4000
      })
    }else{
      this.ClienteServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }
  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }
}
