import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import video from "../assets/video.mp4";
import whiteLogo from "../assets/whiteLogo.png";
import axios from "axios";
import { client } from "../client";

const Login = () => {
  const [response, setResponse] = useState(null);

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      setResponse(credentialResponse);
    },

    onError: () => {
      console.log("Login Failed");
    },
  });

  useEffect(() => {
    if (response) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          const user = res.data;
          localStorage.setItem("user", JSON.stringify(user));

          const { name, id, picture } = user;

          console.log(name, id, picture);

          const doc = {
            _id: id,
            _type: "user",
            userName: name,
            image: picture,
          };
          console.log(doc);
          client.createIfNotExists(doc).then(() => {
            navigate("/");
          });
        })
        .catch((err) => console.log(err));
    }
  }, [response]);

  return (
    <div className="flex justify-start flex-col h-screen items-center">
      <div className="relative w-full h-full">
        <video
          src={video}
          type="video/mp4"
          loop
          muted
          controls={false}
          autoPlay
          className="w-full h-full object-cover"
        />{" "}
        <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay">
          <div className="p-5 ">
            <img src={whiteLogo} alt="logo" width="130px" />
          </div>
          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={() => login()}
            >
              <FcGoogle className="mr-4" /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
