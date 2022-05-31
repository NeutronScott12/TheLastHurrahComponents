import React from 'react'
import { BinaryStashCommentComponent } from './library/src'

function App() {
    const title = 'first title'
    const website_url = window.location.href
    const application_id = '19b32b1b-1e94-45bf-addf-ae4b1872f692'
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
