import React from "react"
import renderer from "react-test-renderer"
import Index from "../pages/index"

it("renders Index page unchanged", () => {
    const tree = renderer.create(<Index />).toJSON()
    expect(tree).toMatchSnapshot()
})