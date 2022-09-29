import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Form, Link } from "@remix-run/react";
import { css } from "@emotion/react";

const pages = [] as any;
const settings = [{ name: "Logout", url: "/logout" }];

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            padding: 16px 0;
          `}
        >
          <Link to={"/my-list"}>
            <Typography
              textAlign="center"
              css={css`
                margin-right: 32px;
              `}
            >
              Learn Japanese
            </Typography>
          </Link>

          <Form action="/logout" method="post">
            <Button
              variant="text"
              type="submit"
              css={css`
                color: white;
                padding: 0;
              `}
            >
              Logout
            </Button>
          </Form>
        </div>
      </Container>
    </AppBar>
  );
};
export default Nav;

