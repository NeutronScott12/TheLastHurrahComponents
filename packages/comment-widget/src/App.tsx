import React from 'react'
import { BinaryStashCommentComponent } from './library/src'

function App() {
    const title = 'first title'
    const website_url = 'http://localhost:3000'
    const application_id = '17e34e6a-36bc-4e47-a75f-cfc8f053bdb5'
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
