import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummydata";
import EventList from "../../Components/Events/EventList";
import { Fragment } from "react";
import ResultsTitle from "../../Components/Events/results-title";
import Button from "../../Components/uI/Button";
import ErrorAlert from "../../Components/uI/error-alert";


function FilteredEvents() {
  const router = useRouter();
  const filteredData = router.query.slug;
  console.log(filteredData);
  if (!filteredData) {
    return <p className="center">Loading....</p>;
  }

  const filterYear = filteredData[1];
  const filterMonth = filteredData[0];

  const numYear = +filterYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <Fragment>
    <ErrorAlert>
    <p>Invalid Filter. Please adjust your values</p>
    </ErrorAlert>
    <div className="center">
    <Button link='/events'>Show All Events</Button>
    </div>
    </Fragment>
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  if (!filteredEvents || filteredEvents.length === 0) {
    return <Fragment>
    <ErrorAlert>
    <p>No Events found with choosen filter</p>
    </ErrorAlert>
    <div className='center'>
   <Button link='/events'>Show All Events</Button> 
    </div>
    </Fragment> 
  }

  const date= new Date(numYear, numMonth - 1);

  return <Fragment>
  <ResultsTitle date={date}/>
  <EventList items={filteredEvents}/>
  </Fragment>
}
module.exports = FilteredEvents;
