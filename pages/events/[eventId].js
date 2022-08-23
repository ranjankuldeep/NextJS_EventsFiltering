import { useRouter } from "next/router";
import { getEventById } from "../../dummydata";
import Event_Content from "../../Components/event-detail/event-content";
import Event_Logistic from "../../Components/event-detail/event-logistics";
import Event_Summary from "../../Components/event-detail/event-summary";
import { Fragment } from "react";
import ErrorAlert from "../../Components/uI/error-alert";
function EventDetail() {
  const Router = useRouter();
  const eventId = Router.query.eventId;
  const event = getEventById(eventId);
  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>NO EVENT FOUND</p>
        </ErrorAlert>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Event_Summary title={event.title} />
      <Event_Logistic
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <Event_Content>{event.description}</Event_Content>
    </Fragment>
  );
}
module.exports = EventDetail;
