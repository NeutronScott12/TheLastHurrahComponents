import React from 'react'
import { CommentContainer } from './library/src/modules/comments'

function App() {
    const application_id = '17e34e6a-36bc-4e47-a75f-cfc8f053bdb5'
    const website = ''
    const title = 'first thread'

    return (
        <div className="App">
            <h2>Comment Widget</h2>
            <CommentContainer
                application_id={application_id}
                website_url={website}
                title={title}
            />
        </div>
    )
}

export default App
