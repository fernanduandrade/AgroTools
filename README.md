# QUIZ-MAKER    

O quiz-maker é um web app para responder e criar questionários baseado no desafio do agrotools.

## Back-end API
Os endpoints da API são:
|Rotas| Método | Descrição |
|---|---|---|
|`localhost:8001/quiz`| `GET` | Retorna todos os questionários registrados. |
|`localhost:8001/quiz/:id`| `GET` | Retorna apenas um questionário. |
|`localhost:8001/quiz`| `POST` | Utilizado para criar um novo questionário. |
|`localhost:8001/quiz/:id`| `PUT` | Atualiza os dados do questionário. |

+ Exemplo do Resquest/Get (application/json)
    + Body 
        {
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "1",
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"título": &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Quiz nº 1",
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"usuário": "Fernando",
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"dataCadastroPergunta": "2021/02/03",
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"localização": {
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"latitude": "-5.1697377",
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "longitude": "-41.703652299999995"
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"perguntas": [
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Qual o nome do seu primeiro pet?"
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"dataCadastroResposta": "2021/02/28",
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;respostas": [
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Billy"
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;],
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"respondido": true
            }
## O app
**Criando um questionário**

Para criar um questionário o usuário deverá informar um título, o seu nome, a data do cadastro da pergunta e cadastrar as perguntas(quantas quiser)

**Respondendo um questionário**

Quando o usuário for responder um questionário ele irá informar permitir que o navegador use a localização. Após o usuário irá informar a data da resposta e a respostas das perguntas.

**Questionários respondidos**

O usuário pode ver os questionários já respondidos, nele informa o título do questionário, a data que foi respondido, a localização e as respostas.

## Nota

Para o retorno da localização foi utilizado o [OpenWeatherMap](https://openweathermap.org/), então é necessário ter um cadastro para poder obter a API key e a aplicação rodar normalmente.

