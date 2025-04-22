import { useQuery} from "@tanstack/react-query";
import api from "../api";

function Quote() {
  const {data, isLoading, refetch} = useQuery({queryKey: ['Quotes'], queryFn:()=>{
    return api.get("random-quotes/?format=json").then((res)=> res.data)
  }})
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gray bg-gradient">
      <div className="container text-center">
        <h1 className="text-dark mb-4 ">Quote of the Day</h1>
        <div className="card text-center shadow-lg p-4 bg-dark text-white rounded">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p className="fs-4 fw-bold">
                {isLoading && <span className="text-info">Loading...</span>}
                {!isLoading && data?.results.length === 0 && <span className="text-danger">No Quotes Found</span>}
                {!isLoading && data?.results.length > 0 && data?.results[0].text}
              </p>
              <footer className="blockquote-footer mt-3">
                {data?.results[0].author} 
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="mt-4">
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={() => {refetch()}}
            >
            Get New
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quote;
