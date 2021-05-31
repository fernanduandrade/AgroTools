window.onload = createList();

function saveId(id){
    return window.localStorage.setItem("quizId", JSON.stringify(id));
}

function createList(){
    let wrapper = document.getElementById('answeredQuizes');

    const apiUrl = "http://localhost:8001/quiz/"

    axios.get(apiUrl).then((res) => {
        const quizData = res.data;
        for (let i in quizData){
            if(quizData[i].respondido === false) {
                const questions = `
                    <div class="col-1-of-3-card">    
                        <div class="card u-margin-bottom-medium">
                            <h4 class="card__heading">
                                <span class="card__heading-span card__heading-span--1">
                                ${quizData[i].título}
                                </span>
                            </h4>
                            <div class="card__details">
                                <ul>
                                    <li><strong>Criado por:</strong> ${quizData[i].usuário}</li>
                                    <li><strong>Enviado dia:</strong> ${formatDate(quizData[i].dataCadastroResposta)}</li>
                                    <li><strong>Quantidade de perguntas: </strong>${quizData[i].perguntas.length}</li>
                                </ul>
                            </div>
                            <a href="./responder-questionario.html" class="btn-card" onclick="saveId('${quizData[i].id}')" id="button">Ver resultado &rarr;</a>
                        </div>
                    </div>   
                `
                wrapper.innerHTML += questions;
            }
        };
    });
}