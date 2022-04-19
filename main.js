var previsão_1 = "";
var previsão_2 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90,
});
var camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("resultado").innerHTML = '<img id="imagem_capturada" src="'+data_uri+'"/>';
    })
}

console.log("Versão: ", ml5.verson);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/u_uyXpgtS/model.json", modelLoaded);
function modelLoaded() {
    console.log("Modelo carregado")
}


function speak(dado) {
    var fala = window.speechSynthesis;
    var texto = "A primeira previsão é:" + previsão_1;
    var texto2 = "A segunda previsão é:" + previsão_2;
    var fala_dado = new SpeechSynthesisUtterance(texto + texto2);
    fala.speak(fala_dado);
}

function check() {
    img = document.getElementById("imagem_capturada");
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("resultado_emocao1").innerHTML = results[0].label;
        document.getElementById("resultado_emocao2").innerHTML = results[1].label;
        previsão_1 = results[0].label;
        previsão_2 = results[1].label;
        speak();
        if (results[0].label = "Feliz") {
            document.getElementById("resultado_emoji1").innerHTML = "&#128516;";
            console.log("Feliz");
        }
        else if (results[0].label = "Dormindo") {
            document.getElementById("resultado_emoji1").innerHTML = "&#128564;";
        }
        else if (results[0].label = "Surpreso") {
            document.getElementById("resultado_emoji1").innerHTML = "&#128561;";
        }

        if (results[1].label = "Feliz") {
            document.getElementById("resultado_emoji2").innerHTML = "&#128516;";
        }
        else if (results[1].label = "Dormindo") {
            document.getElementById("resultado_emoji2").innerHTML = "&#128564;";
        }
        else if (results[1].label = "Surpreso") {
            document.getElementById("resultado_emoji2").innerHTML = "&#128561;";
        }
    }
}