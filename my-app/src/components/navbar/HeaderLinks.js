import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/sake"
          // target="_blank"
          size='lg'
          style={{fontSize: "18px", fontWeight: 400, padding: "1rem", marginRight: "1rem", marginLeft: "1rem"}}
          color="transparent"
          className={classes.navLink}
        >
          Sake
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href='/company'
          // target="_blank"
          size='lg'
          style={{fontSize: "18px", fontWeight: 400, padding: "1rem", marginRight: "1rem", marginLeft: "1rem"}}
          color="transparent"
          className={classes.navLink}
        >
          Companies
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href='/review'
          // target="_blank"
          size='lg'
          style={{fontSize: "18px", fontWeight: 400, padding: "1rem", marginRight: "1rem", marginLeft: "1rem"}}
          color="transparent"
          className={classes.navLink}
        >
          Reviews
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/reviewer"
          // target="_blank"
          size='lg'
          style={{fontSize: "18px", fontWeight: 400, padding: "1rem", marginRight: "1rem", marginLeft: "1rem"}}
          color="transparent"
          className={classes.navLink}
        >
          Reviewers
        </Button>
      </ListItem>
    </List>
  );
}
// export const Nav = styled.nav`
//     background: #483D8B;
//     height: 55px;
//     display: flex;

//     justify-content: space-between;
//     padding: 0.2rem;
//     z-index: 12;
// `;

// export const NavLink = styled(Link)`
//     color: #C0C0C0;
//     font-size: 24px;
//     display: flex;
//     align-items: center;
//     text-decoration: none;
//     padding: 0 1rem;
//     height: 100%;
//     cursor: pointer;
//     &.active {
//         color: #FFFFFF;
//         font-weight: bold;
//     }
// `;

// export const Bars = styled(FaBars)`
//     display: none;
//     color: #483D8B;
//     @media screen and (max-width: 768px) {
//         display: block;
//         position: absolute;
//         top: 0;
//         right: 0;
//         transform: translate(-100%, 75%);
//         font-size: 1.8rem;
//         cursor: pointer;
//     }
// `;

// export const NavMenu = styled.div`
//     display: flex;
//     align-items: center;
//     margin-right: -24px;
//     @media screen and (max-width: 768px) {
//         display: none;
//     }
// `;
