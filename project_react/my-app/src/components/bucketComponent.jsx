import {Link} from "react-router-dom";

const BucketComponent = ()=> {

    return(
        <div className="bucketButton">
            <Link className="bucketLink" to={`/bucket`}>Bucket</Link>
        </div>
    )
}
export default BucketComponent;