/**
 * @jest-environment jsdom
 */

import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import EventCard from "@/components/event/eventCard"

describe("Event Card Test", () => {
    it("should render correctly with data", async () => {
        const event = {
            eventId: "00001",
            eventName: "Test Event",
            eventImgUrl: "https://via.placeholder.com/300.png/09f/fff",
            eventCategory: "Party",
            eventType: [
                "Nightlife",
                "Outdoors"
            ],
            eventVenue: "Sample Venue",
            eventStreet: "Sample Street",
            eventCity: "Sample City",
            eventProvince: "Sample Province",
            eventCountry: "Sample Country",
            eventDetails: "Sample Details Lorem ipsum dolor sit amet ...",
            //Can use momentjs to format dates to DD MMM YYYY
            startDate: "09 Sep 2021",
            startTime: "02:05 PM",
            endDate: "10 Sep 2021",
            endTime: "11:00 PM",
            likes: 1
        }
        render(<EventCard event={event} />)
        // screen.debug()
        const openModal = screen.getByTestId("openModal")
        // Show Modal with full event details
        userEvent.click(openModal)
        screen.debug()
    })
})