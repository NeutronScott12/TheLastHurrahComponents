import React from 'react'
import { BinaryStashCommentComponent } from './library/src'

function App() {
    const title = 'first title'
    const website_url = window.location.href
    const application_id = 'b7b835f9-a03d-4718-a363-cf5f6cc4e1df'
    const application_name = 'First Application'

    return (
        <BinaryStashCommentComponent
            dark_theme={true}
            title={title}
            website_url={website_url}
            application_id={application_id}
            application_name={application_name}
            innerComponent={false}
        />
    )
}

export default App
