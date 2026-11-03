import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Stack,
  Chip,
} from "@mui/material";
import {
  MoreHoriz as MoreHorizIcon,
  Search as SearchIcon,
  Chat as ChatIcon,
  PersonAdd as PersonAddIcon,
  GroupAdd as GroupAddIcon,
  LibraryAdd as LibraryAddIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
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
  const filterOptionElementRef = useRef<HTMLDivElement | null>(null);
  const filterOptionLeftBtnElementRef = useRef<HTMLButtonElement | null>(null);
  const filterOptionRightBtnElementRef = useRef<HTMLButtonElement | null>(null);

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

  const [filterOptions, setFilterOptions] = useState([
    {
      id: 1,
      filterTitle: "Unread",
    },
    {
      id: 2,
      filterTitle: "Chats",
      active: true,
    },
    {
      id: 3,
      filterTitle: "Teams",
    },
    {
      id: 4,
      filterTitle: "Unread",
    },
    {
      id: 5,
      filterTitle: "Chats",
      active: true,
    },
    {
      id: 6,
      filterTitle: "Teams",
    },
    {
      id: 7,
      filterTitle: "Unread",
    },
    {
      id: 8,
      filterTitle: "Chats",
      active: true,
    },
    {
      id: 9,
      filterTitle: "Teams",
    },
  ]);

  const filterHelpers = {
    leftFilterOptionsIcon: () => {
      if (filterOptionElementRef.current == null) return;

      filterOptionElementRef.current.scrollBy({
        left: -60,
        behavior: "smooth",
      });

      filterHelpers.examineFilterOptionVisibility();
    },
    rightFilterOptionsIcon: () => {
      if (filterOptionElementRef.current == null) return;

      filterOptionElementRef.current.scrollBy({
        left: 60,
        behavior: "smooth",
      });

      filterHelpers.examineFilterOptionVisibility();
    },
    examineFilterOptionVisibility: () => {
      //for right button
      if (
        filterOptionElementRef.current == null ||
        filterOptionRightBtnElementRef.current == null
      )
        return;

      if (
        filterOptionElementRef.current?.scrollLeft +
          filterOptionElementRef.current.clientWidth >=
        filterOptionElementRef.current.scrollWidth - 2
      ) {
        filterOptionRightBtnElementRef.current.style.visibility = "hidden";
      } else {
        filterOptionRightBtnElementRef.current.style.visibility = "visible";
      }

      //for left button
      if (
        filterOptionElementRef.current == null ||
        filterOptionLeftBtnElementRef.current == null
      )
        return;

      if (!filterOptionElementRef.current?.scrollLeft) {
        filterOptionLeftBtnElementRef.current.style.visibility = "hidden";
      } else {
        filterOptionLeftBtnElementRef.current.style.visibility = "visible";
      }
    },
    activateFilter: (id: Number, active: boolean | undefined) => {
      setFilterOptions((prev) => {
        return prev.map((opt) => {
          if (opt.id == id) {
            if (active == undefined) active = false;
            return { ...opt, active: !active };
          }
          return opt;
        });
      });
    },
  };

  useEffect(filterHelpers.examineFilterOptionVisibility, []);

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
        flexDirection: "column",
        width: "20%",
        maxWidth: "20%",
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
              color: "icon.color.main",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: "icon.color.main",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              fontSize: "1.1rem",
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
              <SearchIcon fontSize="small" />
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
                    <MoreHorizIcon fontSize="small" />
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
      <Box
        sx={{
          borderBottom: "1px solid var(--border)",
          padding: "8px 10px",
          width: "100%",
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          useFlexGap
          sx={{
            flexWrap: "nowrap",
            gap: "10px",
            maxWidth: "100%",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
          onScroll={filterHelpers.examineFilterOptionVisibility}
          ref={filterOptionElementRef}
        >
          {filterOptions.map((option) => (
            <Chip
              key={option.id}
              label={option.filterTitle}
              variant={option.active ? "filled" : "outlined"}
              size="small"
              onClick={() =>
                filterHelpers.activateFilter(option.id, option.active)
              }
              sx={{
                backgroundColor: option.active
                  ? "clickableChip.backgroundColor.main"
                  : "unset",
                color: option.active ? "clickableChip.color.main" : "unset",
                "&:hover": (() => {
                  if (option.active) {
                    return {
                      backgroundColor: "clickableChip.backgroundColor.main",
                      color: "clickableChip.color.main",
                    };
                  }
                  return "";
                })(),
              }}
            />
          ))}
        </Stack>
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "3px",
            backgroundColor: "rgb(255, 255, 255)",
            color: "rgb(147, 147, 147)",
            border: "0.2px solid rgb(0 0 0 / 11%)",
            backdropFilter: "blur(2px)",
            padding: "3px",
            "boxShadow": "0 5px 15px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgb(147, 147, 147)",
              "boxShadow": "0 5px 15px rgba(0, 0, 0, 0.3)",
            },
          }}
          onClick={filterHelpers.leftFilterOptionsIcon}
          ref={filterOptionLeftBtnElementRef}
        >
          <ChevronLeftIcon
            sx={{
              fontSize: "14px",
            }}
          />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "3px",
            backgroundColor: "rgb(255, 255, 255)",
            color: "rgb(147, 147, 147)",
            border: "0.2px solid rgb(0 0 0 / 11%)",
            backdropFilter: "blur(2px)",
            padding: "3px",
            "boxShadow": "0 5px 15px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgb(147, 147, 147)",
              "boxShadow": "0 5px 15px rgba(0, 0, 0, 0.3)",
            },
          }}
          onClick={filterHelpers.rightFilterOptionsIcon}
          ref={filterOptionRightBtnElementRef}
        >
          <ChevronRightIcon
            sx={{
              fontSize: "14px",
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatPanel;
