/**
 * @jest-environment jsdom
 */

import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Venues from "../pages/venues"

describe("Venue Page", () => {
    it("should render correctly", () => {
        render(<Venues />)
        screen.debug()
    })
})