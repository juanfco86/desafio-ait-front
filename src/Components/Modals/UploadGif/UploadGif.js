import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { uploadCloudinary } from "../../../Api/uploadCloudinary";

import { IoIosArrowBack } from "react-icons/io";
import { fetchAddGif } from "../../../Api/postApi";

export const UploadGif = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const dispatch = useDispatch();
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const { getAccessTokenSilently, user } = useAuth0();

  function handleShow(v) {
    setFullscreen(v);
    setShow(true);
  }

  const uploadNewGif = async (e) => {
    e.preventDefault();
    const file_img = e.target.img.files;
    try {
      const src_img = await uploadCloudinary(file_img);
      if (src_img) {
        const new_gif = {
          userEmail: user.email,
          name: e.target.name.value,
          thumbnail: src_img,
          genre: e.target.genre.value,
        };
        console.log(new_gif);
        fetchAddGif(serverUrl, new_gif, getAccessTokenSilently, dispatch);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onClick={() => handleShow("sm-down")}
        className="btn border-none btn-primary"
        variant="btn-link"
      >
        Upload gif
      </Button>

      <Modal
        className="p-0"
        show={show}
        fullscreen={fullscreen}
        onHide={() => setShow(false)}
      >
        <Modal.Header>
          <Modal.Title>
            <IoIosArrowBack
              onClick={() => setShow(false)}
              className="cursor-pointer"
            />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="m-4 row">
            <h1 className="text-center">Upload a new gif</h1>
          </div>
          <div className="mx-2">
            <form onSubmit={uploadNewGif} className="needs-validation">
              <div className="row g-3">
                <div className="form-floating mb-3">
                  <input type="text" name="name" className="form-control" />
                  <label htmlFor="floatingInput">Gif Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="text" name="genre" className="form-control" />
                  <label htmlFor="floatingInput">Gif Genre</label>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="formFile"
                    name="myImage"
                    className="form-label"
                  >
                    Gif Image
                  </label>
                  <input
                    className="form-control"
                    name="img"
                    type="file"
                    id="formFile"
                  />
                </div>
              </div>
              <button
                className="mt-4 w-100 btn btn-primary btn-lg"
                type="submit"
                onClick={() => setShow(false)}
              >
                Save
              </button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
