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
        ```text
        {
            "id": "1",
            "título": "Quiz nº 1",
            "usuário": "Fernando",
            "dataCadastroPergunta": "2021/02/03",
            "localização": {
                "latitude": "-5.1697377",
                "longitude": "-41.703652299999995"
            },
            "perguntas": [
                "Qual o nome do seu primeiro pet?"
            ],
            "dataCadastroResposta": "2021/02/28",
            respostas": [
                "Billy"
            ],
            "respondido": true
        }
        ```
## O app
**Criando um questionário**

Para criar um questionário o usuário deverá informar um título, o seu nome, a data do cadastro da pergunta e cadastrar as perguntas(quantas quiser)

**Respondendo um questionário**

Quando o usuário for responder um questionário ele irá informar permitir que o navegador use a localização. Após o usuário irá informar a data da resposta e a respostas das perguntas.

**Questionários respondidos**

O usuário pode ver os questionários já respondidos, nele informa o título do questionário, a data que foi respondido, a localização e as respostas.

## Nota

Para o retorno da localização foi utilizado o [OpenWeatherMap](https://openweathermap.org/), então é necessário ter um cadastro para poder obter a API key e a aplicação rodar normalmente.

