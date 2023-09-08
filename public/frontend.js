    const adicionarTopico = document.getElementById("adicionarTopico");
    const conteudo = document.getElementById("conteudo");
    const inputConteudo = document.getElementById("inputConteudo");

       const tasks = []

      function adicionaItemNaLista(){

        const novaCheckBox = document.createElement("input");
        novaCheckBox.type = "checkbox";

        const label = document.createElement("label");
        label.textContent=inputConteudo.value;
        
        const div = document.createElement("div");
        div.classList.add('topico');

        const hr = document.createElement("hr")

        conteudo.appendChild(div);
        div.appendChild(novaCheckBox);
        div.appendChild(label);
        conteudo.appendChild(hr);
        let task = label.textContent;
        tasks.push({task: label.textContent})
        document.getElementById('inputConteudo').value='';
        console.log(tasks)
        
      }
    
    adicionarTopico.addEventListener("click", adicionaItemNaLista)
    module.exports =  tasks;
