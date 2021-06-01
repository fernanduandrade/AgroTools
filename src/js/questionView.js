window.onload = viewQuizAnswered();
 
function viewQuizAnswered(){
    const wrapper = document.getElementById('list-wrapper') 
    const quizId = JSON.parse(localStorage.getItem("quizId"));

    axios.get(`http://localhost:8001/quiz/${quizId}`).then((res) => {

        const quiz = res.data;
        
       
        quizResult = quiz.perguntas.map((pergunta, index) => {
            return`
                <div class="view__container">
                    <p class="view__container--question">${pergunta}</p>
                    <p class="view__container--answer">${quiz.respostas[index]}</p>
                </div> 
		    `
        });

        const quizCard = `
            <div>
                <h2 class="heading-secondary-title">
                    ${quiz.título}
                </h2>
            </div>

            <p class="view__text"><strong>Respondido Dia:</strong> ${formatDate(quiz.dataCadastroResposta)}</p> 
            <p class="view__text u-margin-bottom-small" id="cidade"></p>

            ${quizResult.join('')}
           
            
        `
        wrapper.innerHTML += quizCard;

        
        axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${quiz.localização.latitude}&lon=${quiz.localização.longitude}&&appid=85812a665afff669cc042a095668e586`).then((res) => {
            cityLocation = {...res.data}
            cidade = document.getElementById('cidade')
            cidade.innerHTML += `<strong>Localização:</strong> ${cityLocation[0].name}`;
        }).catch(err => console.log(err))
        
    });
}
