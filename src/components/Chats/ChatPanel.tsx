import { useState, useRef, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Stack,
  Chip,
  TextField,
  Collapse,
  Avatar,
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
  ExpandMore as ExpandMoreIcon,
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
      category: "Group",
      items: [
        {
          id: 2,
          name: "Join group",
          icon: <PersonAddIcon fontSize="small" />,
        },
        {
          id: 1,
          name: "New group",
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
      filterTitle: "Groups",
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

  interface userListType {
    id: number;
    category: string;
    profilePic: string;
    name: string;
    isGroup: boolean;
    lastMessage: string;
    lastMessageDate: number;
    unreadCount: number;
    active: boolean;
  }

  const [userList] = useState<userListType[] | [] | null>([
    {
      id: 1,
      category: "Favorites",
      profilePic: "",
      name: "Nikhil Gholap",
      isGroup: false,
      lastMessage: "I'll share the updated code shortly.",
      lastMessageDate: 1793942100000,
      unreadCount: 3,
      active: true,
    },
    {
      id: 2,
      category: "",
      profilePic: "",
      name: "Developers",
      isGroup: true,
      lastMessage: "Rahul: Has the latest build been deployed?",
      lastMessageDate: 1793941200000,
      unreadCount: 12,
      active: true,
    },
    {
      id: 3,
      category: "Work",
      profilePic: "",
      name: "Rahul Sharma",
      isGroup: false,
      lastMessage: "Please check the API response.",
      lastMessageDate: 1793938800000,
      unreadCount: 0,
      active: false,
    },
    {
      id: 4,
      category: "Favorites",
      profilePic: "",
      name: "Project Discussion",
      isGroup: true,
      lastMessage: "Snehal: Meeting scheduled for 3 PM.",
      lastMessageDate: 1793937900000,
      unreadCount: 5,
      active: false,
    },
    {
      id: 5,
      category: "Personal",
      profilePic: "",
      name: "Amit Patil",
      isGroup: false,
      lastMessage: "Thanks for your help!",
      lastMessageDate: 1793933400000,
      unreadCount: 0,
      active: true,
    },
    {
      id: 6,
      category: "",
      profilePic: "",
      name: "Frontend Team",
      isGroup: true,
      lastMessage: "Nikhil: The UI changes are ready.",
      lastMessageDate: 1793884500000,
      unreadCount: 8,
      active: true,
    },
    {
      id: 7,
      category: "Work",
      profilePic: "",
      name: "Snehal Joshi",
      isGroup: false,
      lastMessage: "Can you review this component?",
      lastMessageDate: 1793880000000,
      unreadCount: 1,
      active: false,
    },
    {
      id: 8,
      category: "Personal",
      profilePic: "",
      name: "Pratik Deshmukh",
      isGroup: false,
      lastMessage: "Let's catch up tomorrow.",
      lastMessageDate: 1793875500000,
      unreadCount: 0,
      active: false,
    },
    {
      id: 9,
      category: "Favorites",
      profilePic: "",
      name: "EPCPROMAN Team",
      isGroup: true,
      lastMessage: "Manav: Changes have been pushed to dev.",
      lastMessageDate: 1793873400000,
      unreadCount: 15,
      active: false,
    },
    {
      id: 10,
      category: "",
      profilePic: "",
      name: "Database Team",
      isGroup: true,
      lastMessage: "Amit: Database backup completed.",
      lastMessageDate: 1793868900000,
      unreadCount: 2,
      active: true,
    },
    {
      id: 11,
      category: "Work",
      profilePic: "",
      name: "Anjali Kulkarni",
      isGroup: false,
      lastMessage: "I've updated the documentation.",
      lastMessageDate: 1793860800000,
      unreadCount: 0,
      active: false,
    },
    {
      id: 12,
      category: "Personal",
      profilePic: "",
      name: "Sanket More",
      isGroup: false,
      lastMessage: "Okay, see you soon.",
      lastMessageDate: 1793804400000,
      unreadCount: 0,
      active: true,
    },
    {
      id: 13,
      category: "",
      profilePic: "",
      name: "Backend Developers",
      isGroup: true,
      lastMessage: "Rahul: Authentication API is completed.",
      lastMessageDate: 1793798400000,
      unreadCount: 6,
      active: false,
    },
    {
      id: 14,
      category: "Favorites",
      profilePic: "",
      name: "Vikas Pawar",
      isGroup: false,
      lastMessage: "Please send me the SQL query.",
      lastMessageDate: 1793790300000,
      unreadCount: 0,
      active: true,
    },
    {
      id: 15,
      category: "Work",
      profilePic: "",
      name: "UI/UX Discussion",
      isGroup: true,
      lastMessage: "Anjali: I've shared the new design.",
      lastMessageDate: 1793782200000,
      unreadCount: 4,
      active: false,
    },
    {
      id: 16,
      category: "",
      profilePic: "",
      name: "Rohit Jadhav",
      isGroup: false,
      lastMessage: "Got it, I'll check.",
      lastMessageDate: 1793713500000,
      unreadCount: 0,
      active: true,
    },
    {
      id: 17,
      category: "Personal",
      profilePic: "",
      name: "Akash Shinde",
      isGroup: false,
      lastMessage: "Did you reach home?",
      lastMessageDate: 1793709000000,
      unreadCount: 2,
      active: true,
    },
    {
      id: 18,
      category: "Work",
      profilePic: "",
      name: "React Development",
      isGroup: true,
      lastMessage: "Manav: React hooks discussion tomorrow.",
      lastMessageDate: 1793700900000,
      unreadCount: 9,
      active: false,
    },
    {
      id: 19,
      category: "",
      profilePic: "",
      name: "Testing Team",
      isGroup: true,
      lastMessage: "QA: Regression testing is completed.",
      lastMessageDate: 1793620800000,
      unreadCount: 0,
      active: false,
    },
    {
      id: 20,
      category: "Favorites",
      profilePic: "",
      name: "Manoj Chavan",
      isGroup: false,
      lastMessage: "I'll call you in the evening.",
      lastMessageDate: 1793512200000,
      unreadCount: 1,
      active: false,
    },
  ]);

  const [showSearchBar, setShowSearchBar] = useState(false);

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

  const profColors = ["#bfe2ff", "#bfc1ff", "#ffbfe2", "#ffddbf", "#deffbf"];

  const listHelpers = {
    createAbbrFromString: (name: string) => {
      if (name.split(" ").length == 1) {
        return `${name.split(" ")[0].charAt(0)}`;
      }
      return `${name.split(" ")[0].charAt(0)}${name.split(" ")[1].charAt(0)}`;
    },
  };

  const groupUsers = useMemo(
    function () {
      return userList?.reduce(
        (store, user) => {
          if (store[user.category]) {
            store[user.category].push(user);
          } else if (user.category == "") {
            if (store.Chats) {
              store.Chats.push(user);
            } else {
              store.Chats = [user];
            }
          } else {
            store[user.category] = [user];
          }
          return store;
        },
        {} as Record<string, userListType[]>,
      );
    },
    [userList],
  );

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
                backgroundColor: showSearchBar
                  ? "icon.backgroundColor.hover"
                  : "",
                "&:hover": {
                  backgroundColor: "icon.backgroundColor.hover",
                },
              }}
              onClick={() => setShowSearchBar((prev) => !prev)}
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
          gap: showSearchBar ? "10px" : "0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "fit-content",
          }}
        >
          <Collapse in={showSearchBar} timeout={150} unmountOnExit>
            <TextField
              size="small"
              label="Filter by person, chat or group name"
              fullWidth
              variant="filled"
              sx={{
                fontSize: "10px",
                "& .MuiInputBase-input": {
                  fontSize: "12px",
                  color: "#333",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "12px",
                },
              }}
            />
          </Collapse>
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
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
              left: "-6px",
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgb(147, 147, 147)",
              border: "0.2px solid rgb(0 0 0 / 11%)",
              backdropFilter: "blur(2px)",
              padding: "3px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "rgb(255, 255, 255)",
                color: "rgb(147, 147, 147)",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
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
              right: "-6px",
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgb(147, 147, 147)",
              border: "0.2px solid rgb(0 0 0 / 11%)",
              backdropFilter: "blur(2px)",
              padding: "3px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "rgb(255, 255, 255)",
                color: "rgb(147, 147, 147)",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
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
      <Stack
        useFlexGap
        sx={{
          gap: 0,
          width: "100%",
          height: "calc(100% - 97px)",
          overflowY: "auto",
          scrollbarWidth: "thin",
        }}
      >
        {groupUsers &&
          Object.entries(groupUsers).map(([prop, list], categoryIndex) => {
            return (
              <Box
                key={categoryIndex}
                sx={{
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    cursor: "pointer",
                    padding: "2px",
                    gap: "2px",
                    alignItems: "center",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      lineHeight: 0,
                    }}
                  >
                    <ExpandMoreIcon
                      sx={{
                        fontSize: "16px",
                        color: "chat.text.semi",
                      }}
                    />
                  </Box>
                  <Typography
                    component="p"
                    sx={{
                      fontSize: "12px",
                      color: "chat.text.semi",
                    }}
                  >
                    {prop}
                  </Typography>
                </Box>
                {list.map((user, userIndex) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        padding: "10px",
                        width: "100%",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          backgroundColor: "aliceblue",
                        },
                        "&:active": {
                          backgroundColor: "#dff0ff",
                        },
                      }}
                    >
                      <Avatar
                        alt={user.name}
                        src="/static/images/avatar/1.jpg"
                        sx={{
                          backgroundColor:
                            profColors[
                              Math.floor(userIndex % profColors.length)
                            ],
                          color: "#454545",
                          fontWeight: "bold",
                          fontSize: "15px",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        {listHelpers.createAbbrFromString(user.name)}
                      </Avatar>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                          maxWidth: "calc(100% - 103px)",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "15px",
                              color: "chat.text.color",
                            }}
                          >
                            {user.name}
                          </Typography>
                          {user.active && (
                            <Box
                              component="span"
                              sx={{
                                height: "6px",
                                width: "6px",
                                borderRadius: "50%",
                                display: "block",
                                backgroundColor: "#33b933",
                              }}
                            ></Box>
                          )}
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "11px",
                            color: "chat.text.low",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                          }}
                        >
                          {user.lastMessage}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                          alignItems: "flex-end",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "10px",
                            color: "chat.text.low",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {new Date(user.lastMessageDate).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            },
                          )}
                        </Typography>
                        {user.unreadCount !== 0 && (
                          <Box
                            className="rounded-full w-3 h-3"
                            component="span"
                            sx={{
                              backgroundColor:
                                "clickableChip.backgroundColor.main",
                              color: "#fff",
                              width: "18px",
                              height: "18px",
                              fontSize: "10px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {user.unreadCount}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
      </Stack>
    </Box>
  );
};

export default ChatPanel;
