window.onload = questionAnswered();

function saveId(id){
    return window.localStorage.setItem("quizId", JSON.stringify(id));
}

function questionAnswered(){
    const wrapper = document.getElementById('answeredQuizes');
    const apiUrl = "http://localhost:8001/quiz/";

    axios.get(apiUrl).then((res) => {

        const quizAnswered = res.data;

        for (let i in quizAnswered){
            if(quizAnswered[i].respondido ===  true) {
        
                let questionarios = `
                    <div class="col-1-of-3-card">    
                        <div class="card u-margin-bottom-medium">
                            <h4 class="card__heading">
                                <span class="card__heading-span card__heading-span--1">
                                    ${quizAnswered[i].título}
                                </span>
                            </h4>
                            <div class="card__details">
                                <ul>
                                    <li><b>Criado por:</b> ${quizAnswered[i].usuário}</li>
                                    <li><b>Respondido dia:</b> ${formatDate(quizAnswered[i].dataCadastroResposta)}</li>
                                </ul>
                            </div>
                            <a href="./visualizar-questionario.html" class="btn-card" onclick="saveId('${quizAnswered[i].id}')" id="button">Ver resultado &rarr;</a>
                        </div>
                    </div>

                `
                wrapper.innerHTML += questionarios;
            } 
        }
    });
}