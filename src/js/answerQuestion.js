window.onload = questionData();

getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "O seu navegador não suporta Geolocalização.";
    }
}

function showPosition(position) {
    const latitude = document.getElementById("latitude").value = position.coords.latitude;
    const longitude = document.getElementById("longitude").value = position.coords.longitude;
}

function questionData() {
    const wrapper = document.getElementById('form-wrapper')
    const quizId = JSON.parse(localStorage.getItem("quizId"));

    axios.get(`http://localhost:8001/quiz/${quizId}`).then((res) => {
        const quizData = res.data;
        questions = quizData.perguntas.map(item => {
            return `
                <p class="question"><strong>${item}<strong></p>
                <div class="form-group">
                    <input type="text" class="form-control" name="respostas[]" id="respostas" required> 
                </div>
        `
        });

        const questionCard = `
            <form id="main-form" class=" container rounded" method="POST">
                <h1 class="text-center">QUIZ - ${quizData.título}</h1>
                <hr>
                <div class="container>
                    <div class="form-group">
                        <div class="row">
                            <div class="col">
                                <label class="label-text">Latitude</label>
                                <input type="text" class="form-control" id="latitude" name="latitude" placeholder="Latitude">
                            </div>
                            <div class="col">
                            <label class="label-text">Longitude</label>
                            <input type="text" class="form-control" id="longitude" name="longitude" placeholder="Longitude">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="label-text">Data da Resposta</label>
                        <input type="date" class="form-control" id="dataCadastroResposta" name="dataCadastroResposta" required placeholder="Data">
                    </div>

                    ${questions.join('')}
                    </div>  
                <button type="submit" id="questionario" class="btn btn-block btn-primary mb-2">Enviar Respostas</button>
            </form>

        `

        wrapper.innerHTML += questionCard;

        const form = document.getElementById("main-form");
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const answers = [];
            let quizAnswer = document.querySelectorAll('#respostas');
            quizAnswer.forEach((input) => input ? answers.push(input.value) : answers.push(""));
            const quizDataCadastroResposta = document.getElementById('dataCadastroResposta').value;
            const quizLatitude = document.getElementById('latitude').value;
            const quizLongitude = document.getElementById('longitude').value;

            const quizData = {
                localização: {
                    latitude: quizLatitude,
                    longitude: quizLongitude
                },
                dataCadastroResposta: quizDataCadastroResposta,
                respostas: answers,
                respondido: true
            }

            axios.put(`http://localhost:8001/quiz/${quizId}/`, quizData).then(() => {
                swal('Questionário respondido!');
                setTimeout(function () {
                    location.href = '../index.html';
                }, 3000);
            }).catch(err => console.log(err));
        });
    }).catch(err => console.log(err));
}