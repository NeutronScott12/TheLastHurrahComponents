import React from 'react'
import { BinaryStashCommentComponent } from './library/src'

function App() {
    const title = 'first title'
    const website_url = 'http://localhost:3000'
    const application_id = 'd62ee711-6ae9-45bb-a11e-fff183296830'
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
