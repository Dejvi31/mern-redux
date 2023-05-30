import React from "react";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";

const MyNotes = () => {
  return (
    <MainScreen title="Welcome back Dejvi">
      <Link to="createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      <Accordion defaultActiveKey={["0"]}>
        <Accordion.Item eventkey="0">
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Button as={Card.Text} variant="link">
                  Title
                </Accordion.Button>
              </span>
              <div>
                <Button>Edit</Button>
                <Button variant="danger" className="mx-2">
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse>
              <Card.Body>
                <h4>
                  <Badge bg="success" text="light">
                    Category - Gym
                  </Badge>
                </h4>

                <blockquote className="blockquote mb-0">
                  <p>Content</p>
                  <footer className="blockquote-footer">
                    Created on - date
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion.Item>
      </Accordion>
    </MainScreen>
  );
};

export default MyNotes;
