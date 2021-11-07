import React from 'react'
import { BinaryStashCommentComponent } from './library/src'

function App() {
    const title = 'first title'
    const website_url = window.location.href
    const application_id = 'a1fa42f2-d607-480d-af2b-fa90c68a0876'
    const application_name = 'First Application'

    return (
        <BinaryStashCommentComponent
            dark_theme={true}
            title={title}
            website_url={website_url}
            application_id={application_id}
            application_name={application_name}
        />
    )
}

export default App
