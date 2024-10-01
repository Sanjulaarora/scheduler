import { getUserAvailability } from "@/actions/availability";
import { defaultAvailability } from "./data";
import AvailabilityForm from "./_components/availability-form";

const AvailabilityPage = async() => {
    const availability = await getUserAvailability();
   // console.log(availability); //provides console log in the terminal

    return <AvailabilityForm initialData = { availability || defaultAvailability} />
};

export default AvailabilityPage;