import React from 'react'
import { BinaryStashCommentComponent } from './library/src'

function App() {
    const title = 'first title'
    const website_url = window.location.href
    const application_id = 'fd557834-9ef3-4823-b9e0-60b387b9cdfb'
    const application_name = 'First Application'

    return (
        <div className="App">
            <BinaryStashCommentComponent
                title={title}
                website_url={website_url}
                application_id={application_id}
                application_name={application_name}
            />
        </div>
    )
}

export default App
