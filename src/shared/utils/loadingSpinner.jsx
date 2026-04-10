import { Spinner, Row } from 'react-bootstrap';

const LoadingSpinner = () => {
    return (
        <div>

            <Spinner style={{
                position: 'absolute', left: '45%', top: '50%', width: '110px', height: '110px', zIndex: '2'
            }} animation="border" variant="info" role="">
            </Spinner>

            <p style={{
                position: 'absolute', left: '46%', top: '54%', width: '100px', height: '100px', zIndex: '2', fontWeight: '600'
            }} className="text-info">Loading ...</p>

        </div>
    );
}

export default LoadingSpinner
