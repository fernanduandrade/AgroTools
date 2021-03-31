window.onload = viewQuizAnswered();
 
function viewQuizAnswered(){
    const wrapper = document.getElementById('list-wrapper') 
    const quizId = JSON.parse(localStorage.getItem("quizId"));

    axios.get(`http://localhost:8001/quiz/${quizId}`).then((res) => {

        const quiz = res.data;
        
        quizResult = quiz.perguntas.map(pergunta => {
            return quiz.respostas.map(resposta => {
                return`
                 <div  class="border border-dark quiz-container">
                     <p class="question">${pergunta}</p>
                     <p class="answer">${resposta}</p>
                 </div> 
		`
            });
        });

        const quizCard = `
            <h1 class="text-center">${quiz.título}</h1>
            <hr>
            <p><strong>Respondido Dia: ${quiz.dataCadastroResposta}<strong></p> 
            <p id="cidade"></p>
           
            ${quizResult[0].join('')}       
            
        `
        wrapper.innerHTML += quizCard;

        
        axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${quiz.localização.latitude}&lon=${quiz.localização.longitude}&&appid=85812a665afff669cc042a095668e586`).then((res) => {
            cityLocation = {...res.data}
            cidade = document.getElementById('cidade')
            cidade.innerHTML += 'Localização: ' + cityLocation[0].name
        }).catch(err => console.log(err))
        
    });
}
