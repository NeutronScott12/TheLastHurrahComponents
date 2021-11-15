import React from 'react'
import { BinaryStashCommentComponent } from './library/src'

function App() {
    const title = 'first title'
    const website_url = window.location.href
    const application_id = '9e74cad4-e56e-492a-b05d-ea65b6b6610d'
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
