import React from "react";
import { connect } from "react-redux";

import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from "@coreui/react";

import { sidebarToggle } from "../store/actions";

// sidebar nav config
import navigation from "./_nav";

class TheSidebar extends React.Component {
  render() {
    return (
      <CSidebar
        show={this.props.nav}
        onShowChange={(val) => this.props.sidebarToggle(val)}
      >
        <CSidebarBrand className="d-md-down-none" to="/">
          <CImg
            src={"/assets/logo.png"}
            className="c-sidebar-brand-full"
            alt="alpha logo"
            height={"100px"}
          />
          <CImg
            src={"/assets/logo.png"}
            className="c-sidebar-brand-minimized"
            alt="alpha logo"
            height={"100px"}
          />
        </CSidebarBrand>
        <CSidebarNav>
          <CCreateElement
            items={navigation.filter(
              (elem) =>
                elem.permission == this.props.user.role ||
                elem.permission === "All"
            )}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        </CSidebarNav>
        <CSidebarMinimizer className="c-d-md-down-none" />
      </CSidebar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    nav: state.nav.sidebarShow,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sidebarToggle: (val) => dispatch(sidebarToggle(val)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(TheSidebar));
