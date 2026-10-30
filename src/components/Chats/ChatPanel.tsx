import React, { useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import {
  MoreHoriz as MoreHorizIcon,
  Search as SearchIcon,
  Chat as ChatIcon,
  Add as AddIcon,
  FolderOpen as FolderOpenIcon,
  Save as SaveIcon,
  Print as PrintIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  PersonAdd as PersonAddIcon,
  GroupAdd as GroupAddIcon,
  LibraryAdd as LibraryAddIcon,
} from "@mui/icons-material";
import { BiSolidEdit } from "react-icons/bi";
import {
  Menubar,
  MenuRoot,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuSeparator,
} from "../MUIComponents/Menubar/Menubar";

const ChatPanel = () => {
  const [chatMoreOptions] = useState([
    {
      id: 1,
      category: "Message",
      items: [
        {
          id: 1,
          name: "New message",
          icon: (
            <BiSolidEdit
              style={{
                fontSize: "20px",
              }}
            />
          ),
        },
      ],
    },
    {
      id: 2,
      category: "Team",
      items: [
        {
          id: 2,
          name: "Join team",
          icon: <PersonAddIcon fontSize="small" />,
        },
        {
          id: 1,
          name: "New team",
          icon: <GroupAddIcon fontSize="small" />,
        },
      ],
    },
    {
      id: 3,
      category: "Section",
      items: [
        {
          id: 1,
          name: "New section",
          icon: <LibraryAddIcon fontSize="small" />,
        },
      ],
    },
  ]);

  return (
    <Box
      sx={{
        flex: "1 1 20%",
        backgroundColor: "#fff",
        border: "1px solid var(--border)",
        boxShadow: "0px 5px 18px rgba(10, 35, 70, 0.06)",
        height: "100%",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 0.5,
          padding: "8px 10px",
          width: "100%",
          height: "fit-content",
          borderBottom: "0.1px solid rgba(0,0,0,0.1)",
        }}
        component="div"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <ChatIcon
            sx={{
              color: "icon.color.main"
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: "icon.color.main",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              fontSize: "1.1rem"
            }}
          >
            Chat
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <Tooltip title="Search users">
            <IconButton
              aria-label="search"
              sx={{
                color: "icon.color.main",
                "&:hover": {
                  backgroundColor: "icon.backgroundColor.hover",
                },
              }}
            >
              <SearchIcon fontSize="small"/>
            </IconButton>
          </Tooltip>
          <Tooltip title="New message">
            <IconButton
              aria-label="new message"
              sx={{
                color: "icon.color.main",
                "&:hover": {
                  backgroundColor: "icon.backgroundColor.hover",
                },

                // "&:active": {
                //     backgroundColor: "green",
                // },
              }}
              
            >
              <BiSolidEdit fontSize="Large" />
            </IconButton>
          </Tooltip>
          <Menubar>
            <MenuRoot>
              <MenuTrigger>
                <Tooltip title="More">
                  <IconButton
                    aria-label="more"
                    sx={{
                      color: "icon.color.main",
                      "&:hover": {
                        backgroundColor: "icon.backgroundColor.hover",
                      },
                    }}
                  >
                    <MoreHorizIcon fontSize="small"/>
                  </IconButton>
                </Tooltip>
              </MenuTrigger>
              <MenuPortal>
                <MenuPositioner sideOffset={4} alignOffset={-2}>
                  <MenuPopup>
                    {chatMoreOptions.map((item, i) => {
                      if (i !== 0) {
                        return (
                          <>
                            <MenuSeparator key={item.id} />
                            {item.items.map((childItem) => (
                              <MenuItem
                                icon={childItem.icon}
                                key={childItem.id}
                              >
                                {childItem.name}
                              </MenuItem>
                            ))}
                          </>
                        );
                      }
                      return (
                        <>
                          {item.items.map((childItem) => (
                            <MenuItem icon={childItem.icon} key={childItem.id}>
                              {childItem.name}
                            </MenuItem>
                          ))}
                        </>
                      );
                    })}
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </MenuRoot>
          </Menubar>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPanel;
