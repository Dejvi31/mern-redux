import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { deleteUserAction, updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import "./ProfileScreen.css";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an image");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "noteepa");
      data.append("cloud_name", "dejvi");
      fetch("https://api.cloudinary.com/v1_1/dejvi/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select An Image");
    }
  };

  const handleDeleteUser = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      dispatch(deleteUserAction(userInfo._id))
        .then(() => {
          // After successful deletion, clear user info and navigate to the home page
          dispatch({ type: "USER_LOGOUT" }); // Clear user info
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword)
      dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <div className="custom-file">
                  <Form.Control
                    onChange={(e) => postDetails(e.target.files[0])}
                    type="file"
                    id="image-file"
                    label="Choose File"
                    custom="true"
                  />
                  <Form.Label
                    htmlFor="image-file"
                    className="custom-file-label"
                  >
                    Choose a PNG format
                  </Form.Label>
                </div>
              </Form.Group>
              <Button type="submit" variant="success">
                Update
              </Button>
              <Button
                onClick={handleDeleteUser}
                variant="danger"
                className="mx-2"
              >
                Delete Account
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
