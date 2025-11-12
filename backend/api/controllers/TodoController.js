/**
 * TodoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // GET /todo?done=true&search=xyz&sort=dueAt:asc&limit=20&skip=0
  find: async function (req, res) {
    try {
      const where = {};
      if (typeof req.query.done !== 'undefined') where.done = req.query.done === 'true';
      if (req.query.search) {
        where.or = [
          { title: { contains: req.query.search } },
          { description: { contains: req.query.search } },
        ];
      }
      const limit = Number(req.query.limit || 50);
      const skip = Number(req.query.skip || 0);


      // tri simple: field:direction (ex: dueAt:asc)
      let sort = 'createdAt DESC';
      if (req.query.sort) {
        const [f, d] = req.query.sort.split(':');
        sort = `${f} ${d && d.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'}`;
      }


      const [items, total] = await Promise.all([
        Todo.find({ where }).sort(sort).limit(limit).skip(skip),
        Todo.count({ where })
      ]);
      return res.json({ items, total });
    } catch (e) { return res.serverError(e); }
  },


  // GET /todo/:id
  findOne: async function (req, res) {
    try {
      const todo = await Todo.findOne({ id: req.params.id });
      if (!todo) return res.notFound();
      return res.json(todo);
    } catch (e) { return res.serverError(e); }
  },


  // PATCH /todo/:id
  update: async function (req, res) {
    try {
      const { title, description, priority, dueAt, done } = req.body;
      const updated = await Todo.updateOne({ id: req.params.id })
        .set({ title, description, priority, dueAt, done });
      if (!updated) return res.notFound();
      return res.json(updated);
    } catch (e) { return res.serverError(e); }
  },


  // DELETE /todo/:id
  destroy: async function (req, res) {
    try {
      const deleted = await Todo.destroyOne({ id: req.params.id });
      if (!deleted) return res.notFound();
      return res.json({ ok: true });
    } catch (e) { return res.serverError(e); }
  },


  // PATCH /todo/:id/toggle
  toggle: async function (req, res) {
    try {
      const todo = await Todo.findOne({ id: req.params.id });
      if (!todo) return res.notFound();
      const updated = await Todo.updateOne({ id: req.params.id }).set({ done: !todo.done });
      return res.json(updated);
    } catch (e) { return res.serverError(e); }
  }
};

