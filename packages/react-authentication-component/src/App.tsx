import { AuthenticationContainer } from './library/src/AuthenticationContainer'

function App() {
    return (
        <div className="App">
            <AuthenticationContainer
                application_id=""
                logInCallback={() => console.log('working')}
            />
        </div>
    )
}

export default App
