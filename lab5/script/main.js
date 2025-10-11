<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>José Cardoso</title>
    <link rel="stylesheet" href="/lab4/css/style.css">
</head>

<body>
    <header>
        <h1>JavaScript bué louco</h1>
    </header>

    <section>
        <p></p>
        <button id="red">Red</button>
    </section>


    <section id="section-id">
        <label for="palavra">3. Experimenta a escrever...</label>
        <input id="palavra" type="text">
    </section>


    <section id="esction-cor">
        <label for="texto-cor">3. Experimenta uam cor em inglês...</label>
        <input id="texto-cor" type="text">
        <button>submeter</button>
    </section>

    <script>
        const passa = document.querySelector('#passa');

        function onMouseOver() {
            passa.textContent = "1. Obrigado por passres!"
        }

        function onMouseOut() {
            passa.textContent = "1. Passa por aqui";
        }

        passa.onmouseover = onMouseOver;
        passa.onmouseout = onMouseOut;
    </script>

    <script>
        const pinta = document.querySelector('#pinta');


        pintaRed = function () {
            pinta.style.color = "red";
        }

        document.querySelector('#red').onclick = pintaRed;
        document.querySelector('#green').onclick = () => { pinta.style.color = "green"; }
        document.querySelector('#blue').eventListener('click', () => { pinta.style.color = "green" });
    </script>

    <script>

        //vars
        const inputColorir = document.querySelector('#palavra');
        //const inputColorir = document.querySelector('#section-id input');

        const cores = ['red', 'blue', 'green'];

        let index = 0;


        //funções/acoes/handlers
        function colorir(){
            inputColorir.style.background = cores[index];
            index = (index + 1) % cores.length;
        }

        //event listener

        inputColorir.onkeyup = colorir;


    </script>

     <script>

        //vars
        const inputCor = document.querySelector('#text-cor');
        const buttonCor = document.querySelector('#section-cor button');



        //funções/acoes/handlers
        function colorirBackground(){
            document.querySelector("body").style.background = inputCor.value;
        }

        //event listener

        buttonCor.onclick = colorirBackground;


    </script>



    <script src="/lab5/script/main.js"></script>
</body>

</html>