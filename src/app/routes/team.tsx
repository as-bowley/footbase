// import TeamInfo from "@/components/team/TeamInfo";
// import TeamSearchbar from "@/components/team/TeamSearchbar";
// import Fixtures from "@/components/team/Fixtures";
// import Squad from "@/components/team/Squad";
// import Standings from "@/components/team/Standings";
// import SeasonStats from "@/components/team/SeasonStats";
// import { useEffect, useState } from "react";
// import favIcon from "@img/favfilled.png";
// import unfavIcon from "@img/unfav.png";

const Team = () => {
  // const [isTeamFavourited, setIsTeamFavourited] = useState(false);

  // useEffect(() => {
  //   checkTeamIsFavourited(teamdetails.id);
  // }, [teamdetails.id]);

  return (
    <div className="team">
      <div className="team__searchbar__container">
        {/*<TeamSearchbar*/}
        {/*  placeholder="Search team here..."*/}
        {/*  searchData={teamSearchData}*/}
        {/*  searchChange={searchChange}*/}
        {/*  teamSearchValue={teamSearchValue}*/}
        {/*  searchTeam={fetchTeam}*/}
        {/*  setTeamSearchValue={setTeamSearchValue}*/}
        {/*  style={style}*/}
        {/*/>*/}
      </div>
      <div className="team__favebutton">
        <h2>Teams</h2>
        {/*{isTeamFavourited ? (*/}
        {/*  <button*/}
        {/*    whileTap={{ scale: 0.95 }}*/}
        {/*    // onClick={removeFromFavourites}*/}
        {/*    style={style}*/}
        {/*  >*/}
        {/*    <img src={unfavIcon} alt="" /> <p>Unfavourite</p>*/}
        {/*  </button>*/}
        {/*) : (*/}
        {/*  <button*/}
        {/*    style={style}*/}
        {/*    whileTap={{ scale: 0.95 }}*/}
        {/*    // onClick={() => {*/}
        {/*    //   addTeamToFavourites(*/}
        {/*    //     teamdetails.name,*/}
        {/*    //     teamdetails.id,*/}
        {/*    //     teamdetails.logo*/}
        {/*    //   );*/}
        {/*    // }}*/}
        {/*  >*/}
        {/*    <img src={favIcon} alt="" />*/}
        {/*    <p>Favourite</p>*/}
        {/*  </button>*/}
        {/*)}*/}
      </div>
      <div className="teaminfo__container">
        {/*<TeamInfo*/}
        {/*  name={teamdetails?.name}*/}
        {/*  logo={teamdetails?.logo}*/}
        {/*  country={teamdetails?.country}*/}
        {/*  founded={teamdetails?.founded}*/}
        {/*  stadium={venue?.name}*/}
        {/*  capacity={venue?.capacity}*/}
        {/*  address={venue?.address}*/}
        {/*  league={teamstatistics?.league?.name}*/}
        {/*  leagueLogo={teamstatistics?.league?.logo}*/}
        {/*  form={teamstatistics?.form}*/}
        {/*  style={style}*/}
        {/*/>*/}
      </div>
      <div className="fixtures__container">
        {/*<Fixtures fixtures={fixtures} style={style} />*/}
      </div>
      <div className="squad__container">
        {/*<Squad squad={squad} style={style} darkMode={darkMode} />*/}
      </div>
      <div className="standings__container">
        {/*<Standings standings={standings} team={team} style={style} />*/}
      </div>
      <div className="seasonstats__container">
        {/*<SeasonStats statistics={teamstatistics} style={style} />*/}
      </div>
    </div>
  );
};

export default Team;
