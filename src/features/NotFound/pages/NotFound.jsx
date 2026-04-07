import { Link } from "react-router-dom"
import { Alert } from "react-bootstrap";

const NotFound = () => {
    return (
        <Alert className="mt-3" variant="danger">
            <Alert.Heading>Page not Found</Alert.Heading>
            <p>
                Looks like you've followed a broken link or entered a URL that doesn't exist on this website
            </p>
            <hr />
            <p className="mb-0">
                <Link to="/">Back to our page</Link>
            </p>
        </Alert>

    )
}

export default NotFound;