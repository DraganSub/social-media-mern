import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar/Navbar";
import FriendsListWidget from "scenes/widgets/FriendsListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget"
import UserWidget from "scenes/widgets/UserWidget";


export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector(state => state.token);
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobile ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendsListWidget userId={userId} />
        </Box>
        <Box flexBasis={isNonMobile ? "42%" : undefined}
          mt={isNonMobile ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>

  )
}
