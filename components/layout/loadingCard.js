import React from "react"
import { Card, Placeholder } from "semantic-ui-react"

const LoadingCard = () => {
    return (
        <>
            <Card link>
                <Placeholder>
                    <Placeholder.Image square />
                    <Card.Content>
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line length="very short" />
                                <Placeholder.Line length="medium" />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line length="short" />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    </Card.Content>
                </Placeholder>
            </Card>
        </>
    )
}

export default LoadingCard