import { FastifyRequest, FastifyReply } from "fastify";
import { CreatePostRegistrationService } from "../services/CreatePostRegistrationService";


class CreatePostRegistrationController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const postService = new CreatePostRegistrationService()

        const resp = await postService.execute()

        reply.send(resp)
    }
}

export {CreatePostRegistrationController}