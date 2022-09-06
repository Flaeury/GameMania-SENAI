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

  onSubmit() { 
    console.log(this.userModel)

    const listaPalavras: string[] = ["select ", "from ", "drop ", "or ", "having ", "group ", "by ", "insert ", "exec ", "\"", "\'", "--", "#", "*", ";"];

    listaPalavras.forEach( palavra => {
      if(this.userModel.email?.toLowerCase().includes(palavra)) {
        this.mensagem = "Dados inválidos"

        return;
      }
    });

    this.loginService.login(this.userModel).subscribe( (response) => {

      localStorage.setItem("nomeUsuario", response.body.user.nome)
      alert("Login com sucesso!");
      this.router.navigateByUrl("/");

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
