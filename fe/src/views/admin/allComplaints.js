import React from "react";
import api from "../../api";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CCol,
  CAlert,
} from "@coreui/react";
import Select from "react-select";
import { connect } from "react-redux";

import { logoutUser } from "../../store/actions/user";

let messageTimeout = null;

class allComplaints extends React.Component {
  state = {
    loaded: false,
    alertShow: false,
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
      var fetchComplaints = await api.getComplaints(params);
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
      complaints: fetchComplaints.data.complaints,
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
    var fetchComplaints = await api.getComplaints(params);

    this.setState({
      complaints: this.state.complaints.concat(fetchComplaints.data.complaints),
      lastPage: !fetchComplaints.data.haveMore,
      pageNumber: this.state.pageNumber + 1,
    });
  };

  changeSelectField = async (id, selectedOption) => {
    let response = await api.updateComplaintStatus(id, selectedOption.value);

    if (response.data.success === true) {
      this.setState({
        alertShow: true,
        updatedComplaintId: response.data.updatedComplaint._id,
        complaints: this.state.complaints.map((comp) => {
          if (comp._id == response.data.updatedComplaint._id)
            return response.data.updatedComplaint;

          return comp;
        }),
      });

      window.scrollTo(0, 0);

      messageTimeout = setTimeout(() => {
        this.setState({ alertShow: false });
      }, 5000);
    }
  };

  componentWillUnmount() {
    clearTimeout(messageTimeout);
  }

  render() {
    if (!this.state.loaded) return <div />;

    const itemsData = this.state.complaints.map((item) => {
      return {
        id: item._id,
        status: item.status,
        desc: item.desc,
        type: item.type,
        by: item.user.name,
        title: item.title,
      };
    });

    const options = [
      { value: "pending", label: "Pending" },
      { value: "dismissed", label: "Dismissed" },
      { value: "resolved", label: "Resolved" },
    ];

    return (
      <>
        <CAlert color="info" closeButton show={this.state.alertShow}>
          Complaint id {this.state.updatedComplaintId} Status Updated
          Successfully!
        </CAlert>
        <CCard>
          <CCardHeader className="d-flex flex-column flex-lg-row justify-content-between pb-0">
            <CCol lg="2" className="pt-1 h5 align-self-center">
              Complaints details
            </CCol>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={itemsData}
              fields={["id", "title", "desc", "type", "by", "status"]}
              size="lg"
              itemsPerPage={this.state.pageSize - 1}
              pagination
              onPageChange={this.fetchNextPage}
              scopedSlots={{
                status: (item) => (
                  <td>
                    <Select
                      name="status"
                      onChange={(selectedOption) =>
                        this.changeSelectField(item.id, selectedOption)
                      }
                      value={options.filter((itm) => itm.value == item.status)}
                      options={options}
                      isSearchable
                    />
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

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(allComplaints);
