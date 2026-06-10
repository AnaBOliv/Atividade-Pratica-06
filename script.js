const form =
document.getElementById(
    "cepForm"
);

const cepInput =
document.getElementById(
    "cep"
);

const resultado =
document.getElementById(
    "resultado"
);

const erroCep =
document.getElementById(
    "erroCep"
);

const temaBtn =
document.getElementById(
    "temaBtn"
);

temaBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );

        temaBtn.textContent =
        document.body.classList.contains(
            "dark"
        )
        ? "☀️"
        : "🌙";
    }
);

cepInput.addEventListener(
    "input",
    () => {

        let valor =
        cepInput.value.replace(
            /\D/g,
            ""
        );

        if(valor.length > 5){

            valor =
            valor.slice(0,5)
            + "-"
            + valor.slice(5,8);
        }

        cepInput.value =
        valor;
    }
);

form.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        erroCep.textContent =
        "";

        const cep =
        cepInput.value.replace(
            /\D/g,
            ""
        );

        if(
            cep.length !== 8
        ){

            erroCep.textContent =
            "Digite um CEP válido.";

            return;
        }

        resultado.innerHTML =
        "<p>Consultando CEP...</p>";

        try{

            const resposta =
            await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
            );

            if(
                !resposta.ok
            ){

                throw new Error(
                    "Erro na requisição"
                );
            }

            const dados =
            await resposta.json();

            if(
                dados.erro
            ){

                resultado.innerHTML =
                "<p>CEP não encontrado.</p>";

                return;
            }

            resultado.innerHTML =

            `
            <div class="info">
                <strong>Logradouro:</strong>
                ${dados.logradouro}
            </div>

            <div class="info">
                <strong>Bairro:</strong>
                ${dados.bairro}
            </div>

            <div class="info">
                <strong>Cidade:</strong>
                ${dados.localidade}
            </div>

            <div class="info">
                <strong>Estado:</strong>
                ${dados.uf}
            </div>
            `;

        }
        catch(erro){

            console.error(
                erro
            );

            resultado.innerHTML =

            `
            <p>
                Erro ao consultar o CEP.
                Tente novamente.
            </p>
            `;
        }
    }
);
