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
  style,
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
    return formArray.map((formItem, i) => {
      if (i < 4) {
        return (
          <span className={`formbox ${checkResult(formItem)}`} key={uniqid()}>
            {formItem}
          </span>
        );
      }
      return null;
    });
  };
  return (
    <div className="team__info">
      <div className="team__info__info" style={style}>
        <h1>{name}</h1>
        <div className="team__info__details__container">
          <div className="team__info__logo">
            <img src={logo} width="90px" alt="club badge" />
          </div>
          <div className="team__info__details">
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
        </div>
      </div>

      <div className="team__info__league" style={style}>
        <h4>{league}</h4>
        <img src={leagueLogo} alt="league logo" width="90px" />
      </div>
    </div>
  );
};

export default Teaminfo;
