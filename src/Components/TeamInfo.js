import uniqid from "uniqid";

const Teaminfo = ({
  name,
  logo,
  country,
  founded,
  stadium,
  capacity,
  address,
  league,
  leagueLogo,
  form,
}) => {
  const formBoxes = () => {
    const formArray = form.split("");
    const checkResult = (result) => {
      switch (result) {
        case "L":
          return "red";
        case "D":
          return "grey";
        case "W":
          return "green";
        default:
          break;
      }
    };
    return formArray.map((formItem) => (
      <span className={`formbox ${checkResult(formItem)}`} key={uniqid()}>
        {formItem}
      </span>
    ));
  };
  return (
    <div className="team__info">
      <div className="team__info__logo">
        <img src={logo} width="90px" alt="club badge" />
      </div>
      <div className="team__info__info">
        <h3>{name}</h3>
        <ul>
          <li>
            Country: <strong>{country}</strong>
          </li>
          <li>
            Year founded: <strong>{founded}</strong>
          </li>
          <li>
            Stadium: <strong>{stadium}</strong>
          </li>
          <li>
            Capacity: <strong>{capacity.toLocaleString()}</strong>
          </li>
          <li>
            Address: <strong>{address}</strong>
          </li>
          <li>Form: {formBoxes()}</li>
        </ul>
      </div>
      <div className="team__info__league">
        <h4>{league}</h4>
        <img src={leagueLogo} alt="league logo" width="90px" />
      </div>
    </div>
  );
};

export default Teaminfo;
