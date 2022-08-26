
import EventList from '../Components/Events/EventList';

import {getFeaturedEvents} from '../Helper/api_util';

function HomePage(props){
    const {featuredEvents}=props;
    console.log(featuredEvents)

    return(
        <EventList items={featuredEvents}/>
    )
}

export async function getStaticProps(){
console.log('i am running')
    const featuredEvents= await getFeaturedEvents();
return {
    props:{
        featuredEvents:featuredEvents
    }
}
}
// module.exports = HomePage;
export default HomePage;