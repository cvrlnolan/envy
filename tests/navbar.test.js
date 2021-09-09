/**
 * @jest-environment jsdom
 */

import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Navbar from "@/components/layout/navbar"

describe("Navbar Component", () => {
    it("should render links, toggle button & dropdown list", async () => {
        render(
            <Navbar>
                Children components
            </Navbar>
        )
        // screen.debug()
        const list = screen.getByRole("listbox")
        const button = screen.getByRole("button")
        const links = screen.getAllByRole("link")
        expect(list).toBeInTheDocument()
        expect(button).toBeInTheDocument()
        userEvent.click(button)
        links.map((link) => {
            expect(link).toBeInTheDocument()
        })
    })
})