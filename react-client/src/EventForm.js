import { useContext, useState } from "react";
import { EventListContext } from "./EventListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function EventForm({ setShowEventForm, event }) {
  const { state, handlerMap } = useContext(EventListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  function eventDateToInput(date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = {
      date: e.target.date.value,
      homeTeam: e.target.homeTeam.value,
      awayTeam: e.target.awayTeam.value,
      homeTeamGoals: parseInt(e.target.homeGoals.value),
      awayTeamGoals: parseInt(e.target.awayGoals.value),
    };

    // Check if event with same date already exists
    const existingEvent = (handlerMap.eventList || []).find(
      (existingEvent) => existingEvent.date === formData.date
    );

    if (existingEvent && (!event.id || existingEvent.id !== event.id)) {
      setShowAlert("Událost se stejným datem již existuje.");
      return;
    }

    try {
      if (event.id) {
        formData.id = event.id;
        await handlerMap.handleUpdate(formData);
      } else {
        await handlerMap.handleCreate(formData);
      }
      setShowEventForm(false);
    } catch (e) {
      console.error(e);
      setShowAlert(e.message);
    }
  }

  return (
    <Modal
      show={true}
      onHide={() => setShowEventForm(false)}
      centered // Umožní vycentrování modálního okna
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>{`${event.id ? "Upravit" : "Vytvořit"} událost`}</Modal.Title>
          <CloseButton onClick={() => setShowEventForm(false)} />
        </Modal.Header>
        <Modal.Body>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Nepodařilo se vytvořit událost</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending ? (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          ) : null}

          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Datum konání</Form.Label>
            <Form.Control
              type="date"
              name="date"
              required
              defaultValue={event.date ? eventDateToInput(event.date) : undefined}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicHomeTeam">
            <Form.Label>Home Team</Form.Label>
            <Form.Control
              type="text"
              name="homeTeam"
              required
              defaultValue={event.homeTeam}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicHomeGoals">
            <Form.Label>Home Team Goals</Form.Label>
            <Form.Control
              type="number"
              name="homeGoals"
              required
              defaultValue={event.homeGoals}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAwayTeam">
            <Form.Label>Away Team</Form.Label>
            <Form.Control
              type="text"
              name="awayTeam"
              required
              defaultValue={event.awayTeam}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAwayGoals">
            <Form.Label>Away Team Goals</Form.Label>
            <Form.Control
              type="number"
              name="awayGoals"
              required
              defaultValue={event.awayGoals}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEventForm(false)}
            disabled={isPending}
          >
            Zavřít
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {event.id ? "Upravit" : "Vytvořit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function pendingStyle() {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100px", // Minimální výška pruhu, aby se zabránilo narušení rozložení
  };
}

export default EventForm;
