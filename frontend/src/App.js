import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Badge } from "react-bootstrap";
import dayjs from "dayjs";
import { listTodos, createTodo, toggleTodo, deleteTodo } from "./api";
import { API_URL } from './config';
console.log("➡️ API_URL utilisé :", API_URL);


export default function App() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", priority: 1, dueAt: "" });

  async function refresh() {
    const data = await listTodos();
    setTodos(data.items || []);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    await createTodo(form);
    setForm({ title: "", description: "", priority: 1, dueAt: "" });
    refresh();
  }

  async function handleToggle(id) {
    await toggleTodo(id);
    refresh();
  }

  async function handleDelete(id) {
    await deleteTodo(id);
    refresh();
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">📝 Primal ToDo</h2>

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3 align-items-end">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Ex: Préparer la démo"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Détails ou notes sur la tâche"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Priorité</Form.Label>
                  <Form.Select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })}
                  >
                    {[1, 2, 3, 4, 5].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Date limite</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={form.dueAt}
                    onChange={(e) => setForm({ ...form, dueAt: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button type="submit" variant="success" className="w-100">
                  Ajouter
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Row>
        {todos.map((t) => (
          <Col md={6} lg={4} key={t.id} className="mb-3">
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Form.Check
                      type="checkbox"
                      checked={!!t.done}
                      onChange={() => handleToggle(t.id)}
                      label={
                        <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
                          {t.title}
                        </span>
                      }
                    />
                    <div className="text-muted small">
                      {t.description || "Aucune description"}
                    </div>
                    {t.dueAt && (
                      <Badge bg="secondary" className="mt-1">
                        {dayjs(t.dueAt).format("DD MMM HH:mm")}
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDelete(t.id)}
                  >
                    ❌
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
