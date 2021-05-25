window.onload = viewQuizAnswered();
 
function viewQuizAnswered(){
    const wrapper = document.getElementById('list-wrapper') 
    const quizId = JSON.parse(localStorage.getItem("quizId"));

    axios.get(`http://localhost:8001/quiz/${quizId}`).then((res) => {

        const quiz = res.data;
        
        quizQuestions = quiz.perguntas.map(pergunta => `<p class="question">${pergunta}</p>`);
        quizAnswers = quiz.respostas.map(resposta => `<p class="answer">${resposta}</p>`);

        const quizCard = `
            <h1 class="text-center">${quiz.título}</h1>
            <hr>
            <p><strong>Respondido Dia: ${quiz.dataCadastroResposta}<strong></p> 
            <p id="cidade"></p>
            <div  class="border border-dark">
                ${quizQuestions.join('')}     
                ${quizAnswers.join('')}    
            </div>
           
            
        `
        wrapper.innerHTML += quizCard;

        
        axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${quiz.localização.latitude}&lon=${quiz.localização.longitude}&&appid=85812a665afff669cc042a095668e586`).then((res) => {
            cityLocation = {...res.data}
            cidade = document.getElementById('cidade')
            cidade.innerHTML += 'Localização: ' + cityLocation[0].name
        }).catch(err => console.log(err))
        
    });
}
