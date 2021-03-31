window.onload = questionAnswered();

function saveId(id){
    return window.localStorage.setItem("quizId", JSON.stringify(id));
}

function questionAnswered(){
    const wrapper = document.getElementById('list-wrapper');
    const apiUrl = "http://localhost:8001/quiz/";

    axios.get(apiUrl).then((res) => {

        const quizAnswered = res.data;

        for (let i in quizAnswered){
            if(quizAnswered[i].respondido ===  true) {
        
                let questionarios = `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title text-center">${quizAnswered[i].título}</h5>
                            <hr>  
                            <p class="text">Respondido: <strong>${quizAnswered[i].dataCadastroResposta}</strong></p>
                            <a href="./visualizar-questionario.html" class="btn btn-block btn-dark" onclick="saveId('${quizAnswered[i].id}')" id="button">Ver</a>
                        </div>
                    </div>
                `
                wrapper.innerHTML += questionarios;
            } 
        }
    });
}