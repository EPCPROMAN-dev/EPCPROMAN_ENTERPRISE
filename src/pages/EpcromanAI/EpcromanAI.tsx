// import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { mutateUserState } from "../../features/user/userSlice";

export default function EPCPROMANAI() {
  const user = useAppSelector((state) => state.user); //subscribing to user state
  const project = useAppSelector((state) => state.project); //subscribing to project state
  const org = useAppSelector((state) => state.org); //subscribing to organization state
  const dispatcher = useAppDispatch();
  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#12345b",
        }}
      >
        EPCPROMAN-AI
      </Typography>

      <Typography
        sx={{
          mt: 1,
          color: "#718096",
        }}
      >
        This is the main workspace.
      </Typography>
      <div>
        <div>
          project State Value = id: {project.id}, project: {project.name}
        </div>
        <div>
          organization State Value = id: {org.id}, org: {org.name}
        </div>
        <div>
          User State Value = id: {user.id}, user: {user.name}
        </div>
        <div>
          <input
            style={{
              border: "1px solid #000",
            }}
            type="text"
            value={user.name}
            placeholder="put some input to watch the state change"
            onChange={(e) =>
              dispatcher(
                mutateUserState({
                  id: e.target.value.length.toString(),
                  name: e.target.value,
                }),
              )
            }
          />
        </div>
      </div>
    </Box>
  );
}
