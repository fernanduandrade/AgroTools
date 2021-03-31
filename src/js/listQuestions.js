window.onload = createList();

function saveId(id){
    return window.localStorage.setItem("quizId", JSON.stringify(id));
}

function createList(){
    let wrapper = document.getElementById('list-wrapper');

    const apiUrl = "http://localhost:8001/quiz/"

    axios.get(apiUrl).then((res) => {
        const quizData = res.data;
        for (let i in quizData){
            if(quizData[i].respondido === false) {
                const questions = `
                    <div id="data-row">
                    <div class="card size">
                        <div class="card-body">
                            <h5 class="card-title text-center">${quizData[i].título}</h5>
                            <hr>  
                            <p class="text">Criado por: <strong>${quizData[i].usuário}</strong></p>
                            <p class="text">Dia: <strong>${quizData[i].dataCadastroPergunta}</strong></p>
                            <p class="text">Quantidade de perguntas: <strong>${quizData[i].perguntas.length}<strong></p>
                            <a href="./responder-questionario.html" class="btn btn-block btn-dark" onclick="saveId('${quizData[i].id}')" id="button">Responder</a>
                        </div>
                    </div>
                    
                    </div>
                `
                wrapper.innerHTML += questions;
            }
        };
    });
}