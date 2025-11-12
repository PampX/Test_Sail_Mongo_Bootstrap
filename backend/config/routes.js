/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    'POST /todo': 'TodoController.create',
    'GET /todo': 'TodoController.find',
    'GET /todo/:id': 'TodoController.findOne',
    'PATCH /todo/:id': 'TodoController.update',
    'DELETE /todo/:id': 'TodoController.destroy',
    'PATCH /todo/:id/toggle': 'TodoController.toggle',
};