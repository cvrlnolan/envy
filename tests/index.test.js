/**
 * @jest-environment jsdom
 */

import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Index from "../pages/index"

describe("Index Page", () => {
    it("should render page", async () => {
        render(<Index />)
        const button = screen.queryByText(/Create Event/)
        expect(button).toBeNull()
        screen.debug()
    })
})