import React from 'react'
import { BinaryStashCommentComponent } from './library/src'

function App() {
    const title = 'first title'
    const website_url = window.location.href
    const application_id = '20483ed8-72dc-4668-8d31-c7b46f18f358'
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
