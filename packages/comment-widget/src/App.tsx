import React from 'react'
import { BinaryStashCommentComponent } from './library/src'

function App() {
    const title = 'first title'
    const website_url = window.location.href
    const application_id = 'd63a7c11-8f9e-43ae-8c2e-ba8e6e4c2fcf'
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
