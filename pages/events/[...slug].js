import {useRouter} from "next/router";
import { useState,useEffect } from "react";
import { getFilteredEvents } from "../../Helper/api_util";
import EventList from "../../Components/Events/EventList";
import { Fragment } from "react";
import ResultsTitle from "../../Components/Events/results-title";
import Button from "../../Components/uI/Button";
import ErrorAlert from "../../Components/uI/error-alert";
import useSWR from "swr";


function FilteredEvents(props) {
 const [loadedEvents, setloadedEvents] = useState([]);
 const router =useRouter();
 //for storing the all events.
 //hook for getting the params value
 console.log(router)
const filterData=router.query.slug;
console.log(filterData);
// console.log(filteredData)
 const {data,error}=useSWR('https://nextjs-prerendering-d3de3-default-rtdb.firebaseio.com/events.json');
 useEffect(() => {
  if(data){
   const events = [];
   for (const key in data) {
     events.push({
       id: key,
       ...data[key],
      });
    }
    setloadedEvents(events);}
    
  }, [data]);
  
  if (!loadedEvents) {
    return <p className="center">Loading....</p>;
  }
 
 const filterMonth = filterData[0];
 const filterYear = filterData[1];

 const numYear = +filterYear;
 const numMonth = +filterMonth;
 if ( 
  isNaN(numYear) ||
  isNaN(numMonth) ||
  numYear > 2030 ||
  numYear < 2021 ||
  numMonth < 1 ||
  numMonth > 12 ||
  error
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



  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    console.log(event)
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    console.log(filteredEvents)

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


// function FilteredEvents(props) {
//   const [loadedEvents, setLoadedEvents] = useState();
//   const router = useRouter();

//   const filterData = router.query.slug;
//   console.log(filterData)

//   const { data, error } = useSWR(
//     'https://nextjs-prerendering-d3de3-default-rtdb.firebaseio.com/events.json'
//   );

//   useEffect(() => {
//     if (data) {
//       const events = [];

//       for (const key in data) {
//         events.push({
//           id: key,
//           ...data[key],
//         });
//       }

//       setLoadedEvents(events);
//     }
//   }, [data]);

//   if (!loadedEvents) {
//     return <p className='center'>Loading...</p>;
//   }
//   console.log('hey i ran here')
//   const filteredYear = filterData[1];
//   const filteredMonth = filterData[0];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12 ||
//     error
//   ) {
//     return (
//       <Fragment>
//         <ErrorAlert>
//           <p>Invalid filter. Please adjust your values!</p>
//         </ErrorAlert>
//         <div className='center'>
//           <Button link='/events'>Show All Events</Button>
//         </div>
//       </Fragment>
//     );
//   }

//   const filteredEvents = loadedEvents.filter((event) => {
//     const eventDate = new Date(event.date);
//     return (
//       eventDate.getFullYear() === numYear &&
//       eventDate.getMonth() === numMonth - 1
//     );
//   });
// console.log(filteredEvents)
//   if (!filteredEvents || filteredEvents.length === 0) {
//     return (
//       <Fragment>
//         <ErrorAlert>
//           <p>No events found for the chosen filter!</p>
//         </ErrorAlert>
//         <div className='center'>
//           <Button link='/events'>Show All Events</Button>
//         </div>
//       </Fragment>
//     );
//   }

//   const date = new Date(numYear, numMonth - 1);

//   return (
//     <Fragment>
//       <ResultsTitle date={date} />
//       <EventList items={filteredEvents} />
//     </Fragment>
//   );
// }


// export async function getServerSideProps(context){
// const {params} = context;
// const filteredData = params.slug;
// console.log(filteredData)
// if (!filteredData) {
//   return <p className="center">Loading....</p>;
// }

// const filterYear = filteredData[1];
// const filterMonth = filteredData[0];

// const numYear = +filterYear;
// const numMonth = +filterMonth;

// if (
//   isNaN(numYear) ||
//   isNaN(numMonth) ||
//   numYear > 2030 ||
//   numYear < 2021 ||
//   numMonth < 1 ||
//   numMonth > 12
// ) {
//   return {
//     props:{hasError:true}
//   }
// }
// const filteredEvents=await getFilteredEvents({
//   year:numYear,
//   month:numMonth
// });
// return{
//   props:{
//     events:filteredEvents,
//     date:{
//       year:numYear,
//       month:numMonth,
//     }
//   }
// }
// }
export default FilteredEvents;