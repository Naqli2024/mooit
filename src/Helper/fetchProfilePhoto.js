import PersonIcon from "@mui/icons-material/Person";

export const profilePhoto = (data) => {
  if (data?.profile?.fileName) {
    return (
      <img
        src={`http://localhost:4000/uploads/profilePhoto/${data.profile.fileName}`}
        alt="Profile"
        className="profile-image"
      />
    );
  } else {
    return <PersonIcon />;
  }
};
