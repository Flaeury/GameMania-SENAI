import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  userModel = new User();

  mensagem = ""

  receberDados() { 
    console.log(this.userModel)

    this.loginService.login(this.userModel).subscribe( (response) => {

      localStorage.setItem("nomeUsuario", response.body.user.nome)

      this.router.navigateByUrl("/")

    }, (respostaErro) => {

      let erro = ['Password is too short', 'Incorrect password', 'Email and password are required', 'Email format is invalid', 'Cannot find user' ]

      if (respostaErro.error == erro[0]) {
        this.mensagem = "Senha muito curta"
      } else if(respostaErro.error == erro[1]) {
        this.mensagem = "Senha Incorreta"
      } else if (respostaErro.error == erro[2]) {
        this.mensagem = "E-mail e senha são obrigatórios"
      } else if (respostaErro.error == erro[3]) {
        this.mensagem = "Formato de e-mail inválido"
      } else if (respostaErro.error == erro[4]) {
        this.mensagem = "Usuário não encontrado"
      } else {
        this.mensagem = "Ocorreu um erro, tente novamente"
      }
      
    } )
  }
}
