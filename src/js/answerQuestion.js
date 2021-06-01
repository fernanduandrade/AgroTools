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
    const wrapper = document.getElementById('quizForm')
    const quizId = JSON.parse(localStorage.getItem("quizId"));

    axios.get(`http://localhost:8001/quiz/${quizId}`).then((res) => {
        const quizData = res.data;
        questions = quizData.perguntas.map(item => {
            return `
                <p class="form__text"><strong>${item}<strong></p>
                <div class="form__group">
                    <input type="text" class="form__input" name="respostas[]" id="respostas" required> 
                </div>
        `
        });

        const quizForm = `
            <div class="u-margin-bottom-small">
                <h2 class="heading-secondary-title">
                    ${quizData.título}
                </h2>
            </div>

            <div class="row">
                <div class="col-1-of-2-form u-margin-bottom-medium">
                    <label class="form__label">Latitude</label>
                    <input type="text" class="form__input" id="latitude" name="latitude" placeholder="Latitude">
                </div>

                <div class="col-1-of-2-form u-margin-bottom-medium">
                    <label class="form__label">Longitude</label>
                    <input type="text" class="form__input" id="longitude" name="longitude" placeholder="Longitude">
                </div>
            </div>

            <div class="form__group col-1-of-4-form">
                <input type="date" class="form__input" id="dataCadastroResposta" name="dataCadastroResposta" required placeholder="Data">
                <label class="form__label">Data da Resposta</label>
            </div>

            ${questions.join('')}

            <button type="submit" id="questionario" class="btn btn--purple">Enviar Respostas</button>

        `

        wrapper.innerHTML += quizForm;

        const form = document.getElementById("quizForm");
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