import React from "react";
import api from "../../../api";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CCol,
  CBadge,
} from "@coreui/react";
import { connect } from "react-redux";

import { logoutUser } from "../../../store/actions/user";

const getBadge = (status) => {
  switch (status) {
    case "pending":
      return "primary";
    case "dismissed":
      return "danger";
    case "resolved":
      return "success";
    default:
      return "primary";
  }
};

class userComplaints extends React.Component {
  state = {
    loaded: false,
    pageSize: 25,
    pageNumber: 0,
    totalCounts: 0,
    lastPage: false,
    complaints: [],
  };

  async componentDidMount() {
    let params = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
    };
    try {
      var fetchComplaints = await api.getUserComplaints(params);
    } catch (error) {
      if (error.response.status == 401) {
        this.props.logoutUser();

        return this.props.history.push({
          pathname: "/login",
        });
      }
    }

    this.setState({
      loaded: true,
      complaints: fetchComplaints.data.userComplaints,
      totalCounts: fetchComplaints.data.totalCounts,
      lastPage: !fetchComplaints.data.haveMore,
      pageNumber: this.state.pageNumber + 1,
    });
  }

  fetchNextPage = async (currentPageNumber) => {
    if (this.state.lastPage || currentPageNumber <= this.state.pageNumber) {
      return;
    }

    let params = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
    };
    var fetchComplaints = await api.getUserComplaints(params);

    this.setState({
      complaints: this.state.complaints.concat(
        fetchComplaints.data.userComplaints
      ),
      lastPage: !fetchComplaints.data.haveMore,
      pageNumber: this.state.pageNumber + 1,
    });
  };

  render() {
    if (!this.state.loaded) return <div />;

    const itemsData = this.state.complaints.map((item) => {
      return {
        id: item._id,
        status: item.status,
        desc: item.desc,
        type: item.type,
        title: item.title,
      };
    });

    return (
      <>
        <CCard>
          <CCardHeader className="d-flex flex-column flex-lg-row justify-content-between pb-0">
            <CCol lg="2" className="pt-1 h5 align-self-center">
              Complaints details
            </CCol>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={itemsData}
              fields={["id", "title", "desc", "type", "status"]}
              size="lg"
              itemsPerPage={this.state.pageSize - 1}
              pagination
              onPageChange={this.fetchNextPage}
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge
                      color={getBadge(item.status)}
                      className="mfs-auto h6 mb-0 p-1"
                    >
                      {item.status}
                    </CBadge>
                  </td>
                ),
              }}
            />
          </CCardBody>
        </CCard>
      </>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(userComplaints);
