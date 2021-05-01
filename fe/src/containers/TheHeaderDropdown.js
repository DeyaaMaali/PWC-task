import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  // CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import api from "../api";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { logoutUser } from "../store/actions/user";

const TheHeaderDropdown = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          {/* <CImg
            src={"avatars/6.jpg"}
            className="c-avatar-img"
            alt={props.user.name}
          /> */}
          {props.user.name}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          onClick={async () => {
            try {
              await api.logout();
              dispatch(logoutUser());
              history.push({
                pathname: "/login",
              });
            } catch (error) {}
          }}
        >
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TheHeaderDropdown);
