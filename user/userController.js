import userService from './userService.js';

class userController {
    async createUser(req, res, next) {
        /* #swagger.tags = ['Auth']
                           #swagger.description = 'This routes is used for creating an user Details'  */

        /*	#swagger.parameters['data'] = {
                                in: 'body',
                                description: 'User  Details',
                                required: true,
                                schema: { $ref: "#/definitions/userDetails" }
        }*/
        return await userService.createUser(req, res, next);
    }
    async loginUser(req,res,next){
        /* #swagger.tags = ['Auth']
                           #swagger.description = 'This routes is used for creating an user Details'  */

        /*	#swagger.parameters['data'] = {
                                in: 'body',
                                description: 'User login Details',
                                required: true,
                                schema: { $ref: "#/definitions/userLoginDetails" }
        }*/
        return await userService.loginUser(req, res, next);
    }
    async getUser(req, res, next) {
        /* #swagger.tags = ['User']
                           #swagger.description = 'This routes is used for creating an user Details'  */

        /*	#swagger.parameters['Id'] = {
                                in: 'query',
                                description: 'User Id get detailes ',
                                required: true,
        }*/
        return await userService.getUser(req, res, next);
    }
    async updateUser(req, res, next) {
        /* #swagger.tags = ['User']
                           #swagger.description = 'This routes is used for update an user Details'  */
        /*	#swagger.parameters['Id'] = {
                                in: 'query',
                                description: 'User Id get detailes ',
                                required: true,
        }*/
        /*	#swagger.parameters['data'] = {
                                in: 'body',
                                description: 'User update Details',
                                required: true,
                                schema: { $ref: "#/definitions/userDetails" }
        }*/
        return await userService.updateUser(req, res, next);
    }
    async deleteUser(req, res, next) {
        /* #swagger.tags = ['User']
                           #swagger.description = 'This routes is used for update an user Details'  */

        /*	#swagger.parameters['Id'] = {
                                in: 'query',
                                description: 'User Id for delete Details',
                                required: true
        }*/
        return await userService.deleteUser(req, res, next);
    }
}
export default  new userController()
