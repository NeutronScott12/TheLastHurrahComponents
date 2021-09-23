import React from 'react'
import { BinaryStashAuthenticator } from './library/src'

function App() {
	const application_id = '17e34e6a-36bc-4e47-a75f-cfc8f053bdb5'
	const application_name = 'First Application'

	const callback = (response: any) => {
		console.log('RESPONSE', response)
	}

	return (
		<div className="App">
			<h2>React App</h2>
			<BinaryStashAuthenticator
				logInCallback={callback}
				application_id={application_id}
				application_name={application_name}
			/>
		</div>
	)
}

export default App
