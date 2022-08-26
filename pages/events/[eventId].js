import { useRouter } from "next/router";
import { getAllEvents } from "../../Helper/api_util";
import { getEventById } from "../../Helper/api_util";
import { getFeaturedEvents } from "../../Helper/api_util";
import Event_Content from "../../Components/event-detail/event-content";
import Event_Logistic from "../../Components/event-detail/event-logistics";
import Event_Summary from "../../Components/event-detail/event-summary";
import { Fragment } from "react";
import ErrorAlert from "../../Components/uI/error-alert";
function EventDetail(props) {


  const event = props.event;
  console.log(event)

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Loading...</p>
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
export async function getStaticProps(context){
  const {params}=context;
const Id=params.eventId;
const singleEvent = await getEventById(Id);

  return {
    props:{
      event:singleEvent,
    }
  }
}
export async function getStaticPaths(){
  const allEvents = await getFeaturedEvents();

  const pathwithparams=allEvents.map(sevent=>({params:{eventId:sevent.id}}))

  return {
    paths:pathwithparams,
    fallback:'blocking',
  }
}
//for dynamic pages we need to add getServerSideProps() to run it for the 
export default EventDetail;
