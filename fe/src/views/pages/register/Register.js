import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeUser } from "../../../store/actions/user";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import api from "../../../api";
import { Redirect } from "react-router";

const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [showErrorBox, setshowErrorBox] = useState("none");

  if (user) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      id="userName"
                      type="text"
                      placeholder="Name"
                      autoComplete="name"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      id="email"
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      id="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs="12">
                      <CAlert color="danger" style={{ display: showErrorBox }}>
                        Email Already Exist, try another.
                      </CAlert>
                    </CCol>
                  </CRow>
                  <CButton
                    color="success"
                    block
                    onClick={async () => {
                      const email = document.getElementById("email").value;
                      const password = document.getElementById("password")
                        .value;
                      const userName = document.getElementById("userName")
                        .value;
                      try {
                        var res = await api.register({
                          email,
                          password,
                          name: userName,
                        });
                      } catch (error) {}
                      if (!res.data.success && res.data.status == 303) {
                        setshowErrorBox("block");
                      } else {
                        dispatch(storeUser(email, password));
                      }
                    }}
                  >
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
