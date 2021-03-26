function Offer(props) {
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div>{props.el.oneWay ? "One-way" : ""}</div>
      <div>
        Departure: {props.el.itineraries[0].segments[0].departure.iataCode} at
        {props.el.itineraries[0].segments[0].departure.at}
      </div>
      <div>
        Arrival: {props.el.itineraries[0].segments[0].departure.iataCode} at
        {props.el.itineraries[0].segments[0].arrival.at}
      </div>
      <div>
        <button>Reserve</button>
        </div>
    </div>
  );
}

export default Offer;