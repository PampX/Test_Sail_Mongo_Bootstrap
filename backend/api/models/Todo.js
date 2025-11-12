/**
 * Todo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',

  attributes: {
    // PK compatible Mongo
    id: { type: 'string', columnName: '_id' },

    title: { type: 'string', required: true },
    description: { type: 'string' },           // optionnel = pas de required, pas de allowNull
    done: { type: 'boolean', defaultsTo: false },
    priority: { type: 'number', defaultsTo: 1 }, // 1..5

    // Date optionnelle : pas de allowNull avec type 'ref'
    dueAt: { type: 'ref', columnType: 'datetime' },
  },
};

