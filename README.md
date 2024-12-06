# Análise de Sentimentos em dados do Bluesky sobre o bloqueio do X no Brasil

Repositório contendo conjunto de dados utilizados para realizar análise de sentimentos sobre os dados em questão. O projeto em questão faz parte de um estudo realizado para o meu trabalho de conclusão de curso na Pontifícia Universidade Católica de Minas Gerais 

Neste estudo, uma coleta de dados do bluesky foi coletada do período de 31 de agosto de 2024 até 14 de setembro de 2024.  Esses dados se referem a postagens realizadas nos primeiros dias do bloqueio da plataforma X no Brasil. 

### Objetivos

##### Geral
O objetivo geral do trabalho é realizar um estudo sobre o sentimento dos usuários da plataforma Bluesky perante ao bloqueio do X no Brasil. Para alcançar esse objetivo, a pesquisa utilizará ferramentas de processamento de linguagem natural para identificar e classificar as emoções manifestadas nas postagens, fornecendo uma visão sobre como a comunidade digital percebe esse evento.


##### Específicos
A fim de alcançar o objetivo geral, os objetivos específicos compreendidos nesse projeto são:

• Realizar 15 dias de coleta de posts sobre dados relevantes que compreendem opiniões sobre o tema na rede social Bluesky;
• Selecionar palavras-chave para temas relevantes a serem analisados;
referência ao tema da pandemia de Covid-19 no ano de 2020;
• Realizar a classificação e análise dos sentimentos utilizando a API Google Cloud Natural Language; 
• Análise estatística dos resultados, permitindo identificar tendências e padrões nas percepções dos usuários.


### Estrutura do repositório

```
|- coleta
    |-prisma
        |- schema.prisma 
    |-src
        |- controllers
            |- CreatePostRegistration.ts 
        |- prisma
            |- index.ts 
        |- services
            |- CreatePostRegistrationService.ts 
        |- routes.ts
        |- server.ts

    |-.gitignore
    |-package-lock.json
    |-package.json
    |-tsconfig.json
|- dados
    |- analise_sentimento_bluesky.csv
    |- analise_sentimento_stf.csv
    |- analise_sentimento_twitter.csv
    |- bluesky_posts_filtrados.csv
    |- postagens_bluesky_todo_período.csv
    |- stf_posts_filtrados.csv
    |- twitter_x_posts_filtrados.csv
|
|- notebooks
    |- analise_sentimento_posts.ipynb
    |- extracao_organizacao_dados_bluesky.ipynb
    |- nuvem_palavras_postagens_bluesky.ipynb
    |- separacao_dados_palavras_chave.ipynb

```

#### Coleta
Contém os arquivos utilizados para realizar os requests na API do Bluesky e salvá-los no MongoDB.

#### Dados

Contém os arquivos csv com as postagens coletadas e seus metadados. Além disso, também contém os dados analisados pela API Google Cloud Natural Language, contendo score e magnitude do sentimento.

#### Notebooks

Nesse diretório é possível encontrar os notebooks utilizados para formatação dos dados, criação da nuvem de palavras, separação dos dados por palavras-chave de acordo com o tema e, por fim, análise de sentimento.


### Resultados

Os dados indicam um predomínio de sentimentos negativos no tópico "X", com 60,1%, destacando uma forte reação ao bloqueio da plataforma, enquanto os tópicos "Bluesky" e "STF" apresentaram maior proporção de sentimentos neutros (36,9% e 52,9%, respectivamente). No entanto, "Bluesky" teve uma leve predominância de sentimentos positivos, sugerindo uma recepção inicial favorável. Os gráficos diários mostram redução gradual de engajamento após picos iniciais, com destaque para a categoria "STF", marcada por eventos relacionados ao bloqueio da plataforma e atos contra o ministro Alexandre de Moraes. A análise qualitativa revelou limitações da ferramenta de análise de sentimentos, como dificuldades na contextualização das postagens e influência de elementos visuais não capturados pela análise textual, ressaltando a necessidade de ajustes metodológicos e uma abordagem multimodal para maior precisão.



## Licença
Este projeto está sob a licença MIT. Veja [LICENSE](/LICENSE) para ler o texto completo.