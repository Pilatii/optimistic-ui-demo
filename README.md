# Optimistic UI (UI Otimista)

Este projeto tem como objetivo demonstrar como funciona o conceito de Optimistic UI (UI Otimista) dentro de uma aplicação.

A ideia central é permitir que a interface responda imediatamente às ações do usuário, antes da confirmação do servidor, criando a sensação de fluidez e velocidade, mesmo quando a API é lenta ou instável.

O aplicativo simula um pequeno sistema de tarefas com suporte a Drag and Drop entre colunas. Ao mover uma tarefa para outra categoria, a interface atualiza o estado instantaneamente. Enquanto isso, uma requisição é disparada em background para registrar a operação. Caso o servidor confirme, nada muda. Se ocorrer uma falha, a interface reverte automaticamente o estado para a posição anterior, preservando consistência e garantindo um comportamento previsível.

Interfaces tradicionais dependem de respostas do servidor para cada ação. Isso gera pequenos atrasos que, somados, criam a sensação de lentidão.
O modelo otimista inverte essa lógica: a UI assume que a operação terá sucesso e continua fluindo. Essa abordagem melhora a percepção de desempenho e torna a interação mais natural.

Também é possível observar como um rollback deve ser tratado visualmente, de forma a sinalizar que algo deu errado sem quebrar o fluxo da aplicação. Além disso, essa abordagem ajuda a separar responsabilidades: a UI cuida da experiência, enquanto a API foca na persistência. Mesmo que o servidor tenha alta latência ou variação de desempenho, a navegação continua suave e previsível.

### Como usar este projeto

```
npm install
npm run dev
```

### Tecnologias utilizadas

* React + Vite
* TailwindCSS
* Drag & Drop nativo (HTML5)
* Mock de API com atraso e falhas simuladas
* Optimistic UI com rollback
