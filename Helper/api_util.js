export async function getAllEvents() {
  //   const data =await fetch('https://nextjs-prerendering-d3de3-default-rtdb.firebaseio.com/events.json');

  //   fetch('https://nextjs-prerendering-d3de3-default-rtdb.firebaseio.com/events.json').then(
  //     res => res.json()
  //   ).then(Events =>{
  //     console.log(Events);
  //       for (let key in Events){
  //           events.push({
  //               id:key,
  //               ...Events[key]
  //           })
  //       }

  //       return events;
  //     }).catch(err=>console.log(err))
  const response = await fetch(
    "https://nextjs-prerendering-d3de3-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}
export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  console.log(allEvents);
  return allEvents.filter((event) => event.isFeatured);
}
export async function getEventById(id){
    const allEvents = await getAllEvents();
    console.log(allEvents);
    return allEvents.find((event) => event.id === id);
}
export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const allEvents = await getAllEvents();
  
    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }