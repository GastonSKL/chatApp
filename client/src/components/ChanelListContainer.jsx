import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import Cookies from "universal-cookie";
import HospitalIcon from "../assets/hospital.png";
import LogOutIcon from "../assets/logout.png";

const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt="Hospital" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogOutIcon} alt="LogOut" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Medical Page</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChanelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleCntainer,
}) => {
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };

  const { client } = useChatContext();

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleCntainer={setToggleCntainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="team"
              setToggleCntainer={setToggleCntainer}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setCreateType={setCreateType}
              setToggleCntainer={setToggleCntainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="messagin"
              setToggleCntainer={setToggleCntainer}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
            />
          )}
        />
      </div>
    </>
  );
};

const ChanelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleCntainer, setToggleCntainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChanelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>
      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleCntainer ? "0%" : "-89%",
          backgroundColor: "#005fff",
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() =>
            setToggleCntainer((prevToggleContainer) => !prevToggleContainer)
          }
        ></div>
        <ChanelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleCntainer={setToggleCntainer}
        />
      </div>
    </>
  );
};

export default ChanelListContainer;
