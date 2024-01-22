import "./Loader.css";

const loadingSkeleton = () => {
  return (
    <div className="tableWrapper" data-testid="table-wrapper">
      <table className="table">
        <tbody>
          {Array(3).fill(undefined).map((_, index) => (
            <tr key={index}>
               <td className="loading bar" data-testid="loading-bar">
                </td>
                <td className="loading bar"  data-testid="loading-bar">
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

  export default loadingSkeleton