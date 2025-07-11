import { useState } from "react";
import { useLocation } from "react-router-dom";
import RatingReviewDisplay from "../components/RatingReviewDisplay";
import SubmitRatingReview from "../components/SubmitRatingReview";


const RatingReviewPage = () => {
  const { state } = useLocation();
  const movieId = state?.movieId;

  /*if (!movieId) {
    return <div className="text-red-500 text-center text-3xl mt-30 h-100">No movie reviews yet.</div>;
  }*/

  const [refresh, setRefresh] = useState(false)

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
        <SubmitRatingReview movieId={movieId} onSuccess={handleSuccess}/>
        <RatingReviewDisplay key={refresh} movieId={movieId} />
    </div>
  );
};

export default RatingReviewPage;
