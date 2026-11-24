/* =====================================================
   PORTFÓLIO DIGITAL - EMILLY AMORIM (4º BIMESTRE)
   Compatível com GitHub Pages e Salvamento Automático
===================================================== */

const disciplinas = [
    {
        id: "ia",
        nome: "Inteligência Artificial",
        icone: "🤖",
        descricao: "Introdução à IA, aprendizado de máquina e automação inteligente"
    },
    {
        id: "banco",
        nome: "Modelagem e Desenvolvimento de Banco de Dados",
        icone: "🗄️",
        descricao: "Modelagem de dados, criação de tabelas e consultas SQL"
    },
    {
        id: "back-end",
        nome: "Programação Back-End",
        icone: "⚙️",
        descricao: "Lógica do servidor, criação de APIs e conexão com banco de dados"
    },
    {
        id: "front-end",
        nome: "Programação Front-End",
        icone: "🎨",
        descricao: "Interfaces web responsivas com HTML5, CSS3 e JavaScript"
    },
    {
        id: "mobile",
        nome: "Programação Mobile",
        icone: "📱",
        descricao: "Desenvolvimento de aplicativos para dispositivos móveis"
    },
    {
        id: "projeto",
        nome: "Projeto Multidisciplinar em Desenvolvimento de Sistemas",
        icone: "🚀",
        descricao: "Projetos integrados aplicando disciplinas técnicas para solução de problemas"
    },
    {
        id: "versionamento",
        nome: "Versionamento de Código e Sistemas de Mensageria",
        icone: "🔀",
        descricao: "Controle de versão com Git, GitHub e sistemas de mensageria"
    }
];

const blocosAtividades = [22, 23, 24, 25, 26, 27, 28, 29];
let dadosGlobais = {};

function escaparHTML(texto) {
    if (!texto) return "";
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* =====================================================
   CARREGAR DADOS (LOCALSTORAGE OU ARQUIVO JSON)
===================================================== */
async function carregarDadosIniciais() {
    // Garante que novos acessos comecem sempre no modo visitante
    if (sessionStorage.getItem("portfolio_admin_logado") === null) {
        sessionStorage.setItem("portfolio_admin_logado", "false");
    }

    const salvoNoNavegador = localStorage.getItem("portfolio_emilly_4bim_v5");
    if (salvoNoNavegador) {
        try {
            dadosGlobais = JSON.parse(salvoNoNavegador);
            criarDisciplinas();
            return;
        } catch (e) {
            console.error("Erro ao ler localStorage:", e);
        }
    }

    try {
        const resposta = await fetch("dados.json");
        if (resposta.ok) {
            dadosGlobais = await resposta.json();
        } else {
            dadosGlobais = {};
        }
    } catch (erro) {
        console.log("Nenhum arquivo dados.json externo encontrado. Usando dados vazios.");
        dadosGlobais = {};
    }
    criarDisciplinas();
}

/* =====================================================
   GERENCIAMENTO DE MODO ADM (SENHA: 1234)
===================================================== */
function verificarAdmin() {
    return sessionStorage.getItem("portfolio_admin_logado") === "true";
}

function alternarAdmin() {
    if (verificarAdmin()) {
        sessionStorage.setItem("portfolio_admin_logado", "false");
        alert("🔓 Modo ADM desativado. Agora está em modo visualização (Visitante).");
        atualizarInterfaceAdmin();
        criarDisciplinas();
    } else {
        const senha = prompt("🔒 Digite a senha de Administrador (ADM):");
        if (senha === "1234") {
            sessionStorage.setItem("portfolio_admin_logado", "true");
            alert("✅ Modo ADM ativado! Suas alterações serão salvas automaticamente.");
            atualizarInterfaceAdmin();
            criarDisciplinas();
        } else if (senha !== null) {
            alert("❌ Senha incorreta!");
        }
    }
}

function garantirBotaoAdmFlutuante() {
    let btnFlutuante = document.getElementById("btnAdmFlutuante");
    if (!btnFlutuante) {
        btnFlutuante = document.createElement("button");
        btnFlutuante.id = "btnAdmFlutuante";
        btnFlutuante.onclick = alternarAdmin;
        btnFlutuante.style.cssText = `
            position: fixed;
            left: 20px;
            bottom: 20px;
            z-index: 9999;
            background: #2d3748;
            color: white;
            border: none;
            padding: 8px 14px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            opacity: 0.85;
            transition: 0.2s;
        `;
        btnFlutuante.onmouseover = () => btnFlutuante.style.opacity = "1";
        btnFlutuante.onmouseout = () => btnFlutuante.style.opacity = "0.85";
        document.body.appendChild(btnFlutuante);
    }
    
    const isAdmin = verificarAdmin();
    btnFlutuante.textContent = isAdmin ? "🔓 Sair ADM" : "🔒 ADM";
    btnFlutuante.style.background = isAdmin ? "#38a169" : "#2d3748";
}

function atualizarInterfaceAdmin() {
    const isAdmin = verificarAdmin();
    const btnAdm = document.getElementById("btnAdm");
    const controleSecao = document.getElementById("secaoControles");

    garantirBotaoAdmFlutuante();

    if (btnAdm) {
        if (isAdmin) {
            btnAdm.textContent = "🔓 Sair ADM";
            btnAdm.classList.add("ativo");
        } else {
            btnAdm.textContent = "🔒 ADM";
            btnAdm.classList.remove("ativo");
        }
    }

    if (controleSecao) {
        controleSecao.style.display = isAdmin ? "block" : "none";
    }

    if (isAdmin) {
        document.body.classList.remove("modo-visitante");
    } else {
        document.body.classList.add("modo-visitante");
    }
}

/* =====================================================
   CRIAR DISCIPLINAS E BLOCOS
===================================================== */
function criarDisciplinas() {
    const container = document.getElementById("conteudoDisciplinas");
    if (!container) return;
    
    const isAdmin = verificarAdmin();
    container.innerHTML = "";

    disciplinas.forEach((disciplina) => {
        const secao = document.createElement("section");
        secao.className = "disciplina";
        secao.id = disciplina.id;

        secao.innerHTML = `
            <div class="container">
                <div class="cabecalho-disciplina">
                    <span class="tag">${disciplina.icone} ${disciplina.nome}</span>
                    <h2>${disciplina.nome}</h2>
                    <p>${disciplina.descricao} — <strong>4º Bimestre</strong></p>
                </div>
                <div class="semanas">
                    ${blocosAtividades.map((numero) => criarBlocoAtividade(disciplina, numero, dadosGlobais, isAdmin)).join("")}
                </div>
            </div>
        `;
        container.appendChild(secao);
    });

    atualizarInterfaceAdmin();
}

function criarBlocoAtividade(disciplina, numero, dadosSalvos, isAdmin) {
    const chave = `${disciplina.id}-semana-${numero}`;
    let dados = dadosSalvos[chave] || { tituloLicao: "", textoAtividade: "", anexos: [] };

    let listaAnexosHTML = "";
    if (dados.anexos && dados.anexos.length > 0) {
        listaAnexosHTML = dados.anexos.map((anexo, index) => {
            return `
                <div class="anexo-item">
                    <a href="${escaparHTML(anexo.url || '#')}" download="${escaparHTML(anexo.nomeArquivo || 'arquivo')}" target="_blank">📄 ${escaparHTML(anexo.titulo)} (${escaparHTML(anexo.nomeArquivo || 'Arquivo Salvo')})</a>
                    ${isAdmin ? `<button type="button" class="btn-remover-anexo" onclick="removerAnexo('${disciplina.id}', ${numero}, ${index})">🗑️ Remover</button>` : ''}
                </div>
            `;
        }).join("");
    } else {
        listaAnexosHTML = `<p class="sem-anexos">Nenhum arquivo anexado ainda.</p>`;
    }

    return `
        <article class="semana">
            <h3>📝 Semana ${numero}</h3>

            <!-- TÍTULO DA ATIVIDADE -->
            <div class="campo">
                <label for="titulo-licao-${chave}">📌 Título / Assunto da Atividade</label>
                ${isAdmin 
                    ? `<input type="text" id="titulo-licao-${chave}" value="${escaparHTML(dados.tituloLicao)}" placeholder="Digite o título ou assunto da atividade..." oninput="salvarAutomaticamente('${disciplina.id}', ${numero})">`
                    : `<p style="font-weight: 600; color: #2d3748; font-size: 16px; padding: 6px 0;">${escaparHTML(dados.tituloLicao) || "Sem título definido"}</p>`
                }
            </div>

            <!-- CAMPO DE TEXTO PARA CONVERTER EM WORD COM FONTE ARIAL -->
            ${isAdmin ? `
            <div class="campo" style="background: #fffaf0; padding: 16px; border-radius: 12px; border: 1px solid #fbd38d;">
                <label for="texto-atividade-${chave}">📝 Atividade em Texto (Converter para documento Word com fonte Arial)</label>
                <textarea id="texto-atividade-${chave}" rows="4" placeholder="Cole ou digite o texto da sua atividade aqui..." style="width:100%; padding:12px; border:1px solid #e2e8f0; border-radius:10px; font-size:14px; outline:none; background:#ffffff; font-family: Arial, sans-serif;" oninput="salvarAutomaticamente('${disciplina.id}', ${numero})">${escaparHTML(dados.textoAtividade || "")}</textarea>
                <button type="button" class="btn" style="margin-top:10px; background:#c05621; color:white; padding:10px 18px; border-radius:8px; border:none; cursor:pointer; font-weight:600; font-size:13px;" onclick="converterTextoParaWord('${disciplina.id}', ${numero})">
                    🔄 Converter Texto em Word (Arial) e Baixar
                </button>
            </div>
            ` : ''}

            <!-- UPLOAD REAL DE ARQUIVOS -->
            <div class="campo box-anexar-atividade">
                <label>📎 ${isAdmin ? 'Fazer Upload de Arquivo (PDF, Imagem, Código, etc.)' : 'Arquivos da Atividade'}</label>
                <div class="lista-anexos" id="lista-anexos-${chave}">
                    ${listaAnexosHTML}
                </div>
                ${isAdmin ? `
                <div class="form-novo-anexo bloco-adm-restrito" style="display:flex; flex-direction:column; gap:8px; margin-top:10px;">
                    <input type="text" id="titulo-anexo-${chave}" placeholder="Título do arquivo (ex: Código fonte, Relatório PDF)">
                    <input type="file" id="arquivo-input-${chave}" style="padding: 6px; background: white;">
                    <button type="button" class="btn btn-adicionar-anexo" onclick="fazerUploadArquivo('${disciplina.id}', ${numero})">
                        📤 Enviar e Salvar Arquivo
                    </button>
                </div>
                ` : ''}
            </div>

            <div class="mensagem-salvo" id="mensagem-${chave}" style="color: #38a169; font-weight: 600; font-size: 13px; margin-top: 10px; display: none;">
                ⚡ Alteração salva automaticamente!
            </div>
        </article>
    `;
}

/* =====================================================
   SALVAMENTO AUTOMÁTICO EM TEMPO REAL
===================================================== */
function salvarAutomaticamente(materiaId, numero) {
    if (!verificarAdmin()) return;

    const chave = `${materiaId}-semana-${numero}`;
    const inputTitulo = document.getElementById(`titulo-licao-${chave}`);
    const textareaTexto = document.getElementById(`texto-atividade-${chave}`);

    if (!dadosGlobais[chave]) {
        dadosGlobais[chave] = { tituloLicao: "", textoAtividade: "", anexos: [] };
    }

    if (inputTitulo) dadosGlobais[chave].tituloLicao = inputTitulo.value;
    if (textareaTexto) dadosGlobais[chave].textoAtividade = textareaTexto.value;

    try {
        localStorage.setItem("portfolio_emilly_4bim_v5", JSON.stringify(dadosGlobais));
        
        const msg = document.getElementById(`mensagem-${chave}`);
        if (msg) {
            msg.style.display = "block";
            clearTimeout(msg.timer);
            msg.timer = setTimeout(() => {
                msg.style.display = "none";
            }, 1500);
        }
    } catch (erro) {
        console.error("Erro ao salvar:", erro);
    }
}

/* =====================================================
   FUNÇÃO DE UPLOAD REAL DE ARQUIVO (LOCAL)
===================================================== */
function fazerUploadArquivo(materiaId, numero) {
    if (!verificarAdmin()) {
        alert("Acesso restrito a Administradores.");
        return;
    }

    const chave = `${materiaId}-semana-${numero}`;
    const inputTitulo = document.getElementById(`titulo-anexo-${chave}`);
    const inputFile = document.getElementById(`arquivo-input-${chave}`);

    const titulo = inputTitulo ? inputTitulo.value.trim() : "";
    const arquivo = inputFile.files[0];

    if (!arquivo) {
        alert("Por favor, selecione um arquivo no seu dispositivo.");
        return;
    }

    const leitor = new FileReader();
    leitor.onload = function(e) {
        const conteudoBase64 = e.target.result;

        if (!dadosGlobais[chave]) {
            dadosGlobais[chave] = { tituloLicao: "", textoAtividade: "", anexos: [] };
        }

        dadosGlobais[chave].anexos.push({
            titulo: titulo || arquivo.name,
            url: conteudoBase64,
            nomeArquivo: arquivo.name
        });

        try {
            localStorage.setItem("portfolio_emilly_4bim_v5", JSON.stringify(dadosGlobais));
            criarDisciplinas();
            alert("✅ Arquivo enviado e salvo com sucesso!");
        } catch (err) {
            alert("❌ Erro: O arquivo pode ser muito grande para o armazenamento local do navegador. Tente um arquivo menor ou compactado.");
        }
    };

    leitor.readAsDataURL(arquivo);
}

/* =====================================================
   CONVERTER TEXTO PARA WORD (FONTE ARIAL)
===================================================== */
function converterTextoParaWord(materiaId, numero) {
    if (!verificarAdmin()) {
        alert("Acesso restrito a Administradores.");
        return;
    }

    const chave = `${materiaId}-semana-${numero}`;
    const textarea = document.getElementById(`texto-atividade-${chave}`);
    const texto = textarea ? textarea.value.trim() : "";

    if (!texto) {
        alert("Por favor, digite ou cole o texto da atividade antes de converter.");
        return;
    }

    const tituloInput = document.getElementById(`titulo-licao-${chave}`);
    const nomeAtividade = (tituloInput && tituloInput.value.trim()) ? tituloInput.value.trim() : `Atividade_Semana_${numero}`;

    const conteudoHTML = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta charset="utf-8">
            <title>${escaparHTML(nomeAtividade)}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 12pt;
                    color: #000000;
                    line-height: 1.5;
                    margin: 20px;
                }
                h1 {
                    font-family: Arial, sans-serif;
                    font-size: 16pt;
                    color: #c05621;
                }
                p {
                    font-family: Arial, sans-serif;
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <h1>${escaparHTML(nomeAtividade)}</h1>
            <p>${escaparHTML(texto).replace(/\n/g, "<br>")}</p>
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff' + conteudoHTML], { type: "application/msword;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nomeAtividade.replace(/[^a-zA-Z0-9_-]/g, "_")}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    alert("✅ Documento Word em fonte Arial gerado e baixado com sucesso!");
}

function removerAnexo(materiaId, numero, index) {
    if (!verificarAdmin()) {
        alert("Acesso restrito a Administradores.");
        return;
    }

    const chave = `${materiaId}-semana-${numero}`;
    if (dadosGlobais[chave] && dadosGlobais[chave].anexos) {
        dadosGlobais[chave].anexos.splice(index, 1);
        localStorage.setItem("portfolio_emilly_4bim_v5", JSON.stringify(dadosGlobais));
        criarDisciplinas();
        alert("🗑️ Arquivo removido com sucesso!");
    }
}

function salvarTudo() {
    alert("⚡ O salvamento das informações é automático!");
}

function limparTudo() {
    if (!verificarAdmin()) {
        alert("Acesso restrito a Administradores.");
        return;
    }

    const confirmar = confirm("Tem certeza que deseja apagar todas as informações salvas?");
    if (!confirmar) return;
    localStorage.removeItem("portfolio_emilly_4bim_v5");
    location.reload();
}

function abrirMenu() {
    const menu = document.getElementById("menu");
    if (menu) menu.classList.toggle("ativo");
}

window.addEventListener("scroll", function () {
    const botao = document.getElementById("btnTopo");
    if (botao) {
        botao.style.display = window.scrollY > 400 ? "block" : "none";
    }
});

function voltarTopo() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function () {
    carregarDadosIniciais();
});