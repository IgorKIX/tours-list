import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  /**
   * Remove the tour with the given id from the tours array
   * @param {string} id The id of the tour to remove
   */
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  /**
   * Fetch the data from the server
   */
  const fetchTours = async () => {
    setLoading(true);

    // Check if the resposnse is successful
    try {
      const response = await fetch(url);
      if (isResponseStatusSuccessful(response.status)) {
        const tours = await response.json();
        setLoading(false);
        setTours(tours);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  const isResponseStatusSuccessful = (responseStatus) => {
    return responseStatus >= 200 && responseStatus <= 299;
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={fetchTours}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
