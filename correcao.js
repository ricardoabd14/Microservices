"use strict";
function formatarNumero(input) {
    input.value = input.value.replace(/\D/g, ""); // Remove todos os caracteres que não são dígitos
    const regexCelular = /^(\d{2})(\d{5})(\d{4})$/; // Formato para celular: (DD) 9XXXX-XXXX
    const regexFixo = /^(\d{2})(\d{4})(\d{4})$/; // Formato para telefone fixo: (DD) XXXX-XXXX
    if (input.value.length == 11) {
        input.value = input.value.replace(regexCelular, "($1) $2-$3");
    }
    else {
        input.value = input.value.replace(regexFixo, "($1) $2-$3");
    }
}
function buscarMunicipio() {
    const uf = document.getElementById("estado");
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.value}/municipios`;
    if (uf.value == "") {
        return;
    }
    fetch(url)
        .then((response) => response.json())
        .then((data) => adicionarMunicipio(data))
        .then((error) => alert(error));
}
function adicionarMunicipio(data) {
    //console.log(data)
    let municipioSelect = document.getElementById("municipio");
    municipioSelect.innerHTML = "";
    data.forEach(function (municipio) {
        let option = document.createElement("option");
        option.value = municipio.id;
        option.text = municipio.nome;
        municipioSelect.appendChild(option);
    });
}
function upgrade(select) {
    const containerUpgrade = document.getElementById("veiculosUpgrade");
    const containerPadrao = document.getElementById("veiculosPadrao");
    if (select) {
        containerUpgrade.classList.remove("esconderElemento");
        containerPadrao.classList.add("esconderElemento");
    }
    else {
        containerUpgrade.classList.add("esconderElemento");
        containerPadrao.classList.remove("esconderElemento");
    }
}
