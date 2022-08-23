import { getFeaturedEvents } from "../dummydata";
import EventList from '../Components/Events/EventList';
function HomePage(){
    const featuredEvents=getFeaturedEvents();
    return(
        <EventList items={featuredEvents}/>
    )
}
module.exports=HomePage;