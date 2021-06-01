function newQuestion() {
    const newQuestion = '<input style="margin-top: 10px;" type="text" class="form-control" id="perguntas" name="perguntas[]">';
    document.getElementById('questions').innerHTML += newQuestion;
}

function sendQuestion() {
    const form = document.getElementById("quizForm");
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let questions = [];
        let quizQuestions = document.querySelectorAll('#perguntas');
        quizQuestions.forEach((input) => input ? questions.push(input.value) : questions.push(""));
        const quizTitulo = document.getElementById('título').value;
        const quizUsuario = document.getElementById('usuário').value;
        const quizDataCadastroPergunta = document.getElementById('dataCadastroPergunta').value;
        
        const quizData = {
            título: quizTitulo,
            usuário: quizUsuario,
            dataCadastroPergunta: quizDataCadastroPergunta,
            perguntas: questions,
        }

        axios.post(`http://localhost:8001/quiz`, quizData).then(() => {
            swal("Questionário criado com sucesso!");
            setTimeout(function() {
                location.href = '../index.html';
            }, 3000);
        }).catch(err => console.log(err));
    });
}