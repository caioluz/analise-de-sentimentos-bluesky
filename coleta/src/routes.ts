import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from "fastify";
import { CreatePostRegistrationController } from "./controllers/CreatePostRegistrationController";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){
   
    fastify.get("/searchPost", async(request: FastifyRequest, reply: FastifyReply) => {
        return new CreatePostRegistrationController().handle(request,reply)
    })
}