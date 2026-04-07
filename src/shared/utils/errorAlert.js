import { Link } from "react-router-dom"
import { Alert } from "react-bootstrap";


const ErrorAlert = ({ error }) => {
    return (
        <Alert className="mt-3" variant="danger">
            <Alert.Heading>Sorry we could not connect</Alert.Heading>
            <p>
                We could not fetch the data from this resource. Please try again later or get in contact with our support team
            </p>
            <hr />
            <p>
                {error}
            </p>
            <p className="mb-0">
                <Link to="/">Back to home page</Link>
            </p>
        </Alert>

    );
}

export default ErrorAlert;