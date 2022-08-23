const { default: EventList } = require("../../Components/Events/EventList");
import { getAllEvents } from "../../dummydata";
import EventSearch from "../../Components/Events/EventSearch";
import { Fragment } from "react";
import { useRouter } from "next/router";
function AllEvents(){
    const router=useRouter();
    function onSearch(year,month){
        const fullPath=`/events/${year}/${month}`;
        router.push(fullPath);
    }
    const events=getAllEvents();

    return (
        <Fragment>
        <EventSearch onSearch={onSearch}/>
        <EventList items={events}/>
        </Fragment>
    )
}
module.exports=AllEvents;