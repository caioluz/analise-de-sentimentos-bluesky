import axios from "axios"
import prismaClient from "../prisma";
import { Mutex } from 'async-mutex';


const mutex = new Mutex();

class CreatePostRegistrationService{
    isRunning = false; 

    async execute(){

        if (this.isRunning) {
            console.log("O serviço já está em execução. Abortando nova chamada.");
            return; 
        }

        this.isRunning = true; 

        const BASE_URL = 'https://public.api.bsky.app'; 


        const fetchPosts = async () => {
            let cursor: string | undefined;
            let postsBluesky: Array<any> | undefined = [];
            let dateSince: Date = new Date("2024-09-06T03:00:00.000Z");
            let dateLimit: Date = new Date("2024-09-11T03:00:00.000Z");
            let dateUntilIntermed: Date = new Date(dateSince.getTime());
            let language = "pt";
            let query: string = '"Twitter"||"X"';
            let intervalosMin = 10;

            dateUntilIntermed.setMinutes(dateUntilIntermed.getMinutes() + intervalosMin);
            let dateUntil: Date = new Date(dateUntilIntermed.getTime() - 1);


            let attempts = 0;
            const maxAttempts = 5; 
            
            while(dateSince.getTime() < dateLimit.getTime()){
                const release = await mutex.acquire(); 
                try {

                    console.log("Passou no loop: " + dateSince.toLocaleDateString() + " " + dateSince.toLocaleTimeString() + " e " + dateUntil.toLocaleDateString() + " " + dateUntil.toLocaleTimeString())
                    
                    
                    const response = await axios.get(`${BASE_URL}/xrpc/app.bsky.feed.searchPosts`, {
                        params:{
                            q: query,
                            limit: 100,
                            since: dateSince,
                            until: dateUntil,
                            lang: language
                        }
                    });

                    cursor = response.data.cursor

                    if(cursor){ 
                        console.log("Havia cursor entre:" + dateSince.toISOString() + " e " + dateUntil.toISOString() );
                    }

                    postsBluesky = postsBluesky?.concat(response.data.posts);
                    
                    

                    dateSince.setMinutes(dateSince.getMinutes() + intervalosMin);
                    dateUntil.setMinutes(dateUntil.getMinutes() + intervalosMin);

                } catch (err) {
                    attempts++;
                    console.error(`Erro na tentativa ${attempts}:`);

                    if (attempts >= maxAttempts) {
                        console.error("Número máximo de tentativas atingido. Abortando...");
                        break;
                    }

                    const waitTime = Math.pow(2, attempts) * 1000; 
                    console.log(`Esperando ${waitTime / 1000} segundos antes de tentar novamente...`);
                    await new Promise((resolve) => setTimeout(resolve, waitTime));
                }finally{
                    release(); 
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }

            }

            try{
                if (postsBluesky?.length > 0) {
                    
                    await prismaClient.posts.createMany({
                        data: postsBluesky.map((post) => ({
                            ...post,
                            termo: query,
                        })),
                    });
        
                    console.log(postsBluesky?.length + " posts inseridos com sucesso.");
                }
            }catch(err){
                console.log("Falhou ao salvar no banco:", err)
            }

            return postsBluesky;
        };

        const response = await fetchPosts();

        return response
  
    }
}

export {CreatePostRegistrationService}