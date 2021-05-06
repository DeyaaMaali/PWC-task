import React from "react";
import {
  CForm,
  CButton,
  CFormGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CLabel,
  CInput,
  CAlert,
  CTextarea,
} from "@coreui/react";
import Select from "react-select";

import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";
import { logoutUser } from "../../../store/actions/user";
import { filterObjectBy } from "../../../helpers/filterObjectBy";
import api from "../../../api";

const typeOptions = [
  { value: "Wait–Times", label: "Wait–Times" },
  { value: "Delivery", label: "Delivery" },
  { value: "Quality of Service", label: "Quality of Service" },
  { value: "Other", label: "Other" },
];

const allowedFieldsToBeSubmitted = ["desc", "type", "title"];

let messageTimeout = null;

class complaintCreate extends React.Component {
  state = {
    alertShow: false,
  };

  changeInputField = (event) => {
    const updatedState = { ...this.state };
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  };

  changeSelectField = (selectedOption, fieldName) => {
    this.setState({ [fieldName]: selectedOption.value });
  };

  submitNewComplaint = async () => {
    const complaintBody = filterObjectBy(
      { ...this.state },
      allowedFieldsToBeSubmitted
    );

    try {
      const response = await api.createComplaint(complaintBody);

      if (response.data.success === true) {
        this.setState({
          alertShow: true,
        });

        window.scrollTo(0, 0);

        messageTimeout = setTimeout(() => {
          this.setState({ alertShow: false });
        }, 5000);
      }
    } catch (error) {
      if (error.response.status == 401) {
        this.props.logoutUser();

        return this.props.history.push({
          pathname: "/login",
        });
      }
    }
  };

  componentWillUnmount() {
    clearTimeout(messageTimeout);
  }

  render() {
    return (
      <>
        <CAlert color="info" closeButton show={this.state.alertShow}>
          Complaint Sent Successfully!
        </CAlert>
        <CCard>
          <CCardHeader>Create New Complaint</CCardHeader>
          <CCardBody>
            <CForm
              onSubmit={(event) => {
                event.preventDefault();
                this.submitNewComplaint();
              }}
              className="form-horizontal"
            >
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="text-input">Title</CLabel>
                </CCol>
                <CCol xs="12" md="10">
                  <CInput
                    name="title"
                    placeholder="title"
                    onChange={this.changeInputField}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="text-input">Your Complaint</CLabel>
                </CCol>
                <CCol xs="12" md="10">
                  <CTextarea
                    name="desc"
                    id="desc"
                    rows="9"
                    placeholder="Write Your Complaint Here .."
                    onChange={this.changeInputField}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="selectLg">Type of Complaint</CLabel>
                </CCol>
                <CCol xs="12" md="10">
                  <Select
                    name="type-complaint"
                    onChange={(selectedOption) =>
                      this.changeSelectField(selectedOption, "type")
                    }
                    options={typeOptions}
                    isSearchable
                  />
                </CCol>
              </CFormGroup>
              <CButton className="mr-1" type="submit" size="lg" color="primary">
                <CIcon name="cil-scrubber" /> Submit
              </CButton>
              <CButton type="reset" size="lg" color="danger">
                <CIcon name="cil-ban" /> Reset
              </CButton>
            </CForm>
          </CCardBody>
          <CCardFooter></CCardFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(complaintCreate);
