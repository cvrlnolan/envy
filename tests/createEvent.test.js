/**
 * @jest-environment jsdom
 */

import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CreateEvent from "../pages/event/create"

describe("Create Event Page", () => {
    it("should render as requested", () => {
        // Include the storageBucket environment variable directly into the firebaseClientInit.js file
        // before running the test
        render(<CreateEvent />)
        // screen.debug()
        const textboxes = screen.getAllByRole("textbox")
        const dropdowns = screen.getAllByRole("listbox")
        const startDate = screen.getByPlaceholderText("Start Date")
        const startTime = screen.getByPlaceholderText("Start Time")
        const endDate = screen.getByPlaceholderText("End Date")
        const endTime = screen.getByPlaceholderText("End Time")
        textboxes.map((textbox) => {
            expect(textbox).toBeInTheDocument()
        })
        dropdowns.map((dropdown) => {
            expect(dropdown).toBeInTheDocument()
        })
        expect(startDate).toBeInTheDocument()
        expect(startTime).toBeInTheDocument()
        expect(endDate).toBeInTheDocument()
        expect(endTime).toBeInTheDocument()
    })

    it("should interact as requested", async () => {
        render(<CreateEvent />)
        const title = screen.getByPlaceholderText("Title")
        const venue = screen.getByPlaceholderText("Venue")
        const street = screen.getByPlaceholderText("Street Address")
        const city = screen.getByPlaceholderText("City")
        const description = screen.getByTestId("Description")
        const email = screen.getByPlaceholderText("Email")

        userEvent.type(title, "Prototype Entry")
        userEvent.type(venue, "Prototype Entry")
        userEvent.type(street, "Prototype Entry")
        userEvent.type(city, "Prototype Entry")
        userEvent.type(email, "Prototype Entry")
        userEvent.type(description, "Prototype Entry")

    })
})