import "./Loader.css";

const loadingSkeleton = () => {
  return (
    <div className="tableWrapper" data-testid="table-wrapper">
      <table className="table">
        <tbody>
          {Array(3).fill(undefined).map((_, index) => (
            <tr key={index}>
               <td className="loading" data-testid="loading-bar">
                  <div className="bar"></div>
                </td>
                <td className="loading"  data-testid="loading-bar">
                  <div className="bar"></div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

  export default loadingSkeleton