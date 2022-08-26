
import EventList from '../Components/Events/EventList';

import {getFeaturedEvents} from '../Helper/api_util';

function HomePage(props){
    const {featuredEvents}=props;


    return(
        <EventList items={featuredEvents}/>
    )
}

// We are creating static pages for the homepage

export async function getStaticProps(){

    const featuredEvents= await getFeaturedEvents();
return {
    props:{
        featuredEvents:featuredEvents,
      
    }
}
}
// module.exports = HomePage;
//This way of exporting making app to crash.

export default HomePage;