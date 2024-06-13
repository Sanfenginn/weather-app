import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function NavBarBottom({ onTabSelect }) {
  const [value, setValue] = useState(0);

  return (
    <Box
      className="w-full border-2 border-red-500 fixed bottom-0 left-0 "
      sx={{}}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          onTabSelect(newValue); // 通知父组件当前选中的标签
        }}
        sx={{ height: "4rem" }}
      >
        <BottomNavigationAction label="Current City" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Others" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default NavBarBottom;
