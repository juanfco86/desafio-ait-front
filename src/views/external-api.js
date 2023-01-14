import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ExternalApi = () => {
    const [message, setMessage] = useState('');
    const [postToEdit, setpostToEdit] = useState("");
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const { getAccessTokenSilently, user } = useAuth0();

    // console.log(user);

    const callApi = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/user/prueba`);

            const responseData = await response.json();

            setMessage(responseData.mensaje);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const callSecureApi = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(
                `${serverUrl}/api/user/pruebaprivada`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const responseData = await response.json();
            setMessage(responseData.mensaje);
        } catch (error) {
            console.error(error);
        }
    };

    const createpost = async (e) => {
        // Prevenir el reload
        e.preventDefault();

        const token = await getAccessTokenSilently();

        // Recoger datos del form
        const newPost = {
            title: e.target.title.value,
            content: e.target.content.value
        }
        // Validar datos ()


        // Peticion al servidor
        const request = await fetch(`${serverUrl}/api/user/create`, {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const data = await request.json()
        console.log(data);
        setMessage(data.mensaje);
    }

    const getPost = async (e) => {
        let idPost = e.target.value;
        console.log(idPost.length);
        if (idPost.length === 24) {
            const response = await fetch(`${serverUrl}/api/user/buscar/${idPost}`);
            const data = await response.json();
            setMessage(data.mensaje);
            setpostToEdit(data.post[0]);
        } else { setMessage("El id no es correcto") }
    }
    const editepost = async (e) => {
        // Prevenir el reload
        e.preventDefault();

        const token = await getAccessTokenSilently();

        // Recoger DATOS
        const idPost = e.target.id.value;
        const editedPost = {
            title: e.target.title.value,
            content: e.target.content.value,
            dateLastEdit: Date.now()
        }
        // Validar datos ()

        // Peticion al servidor
        const response = await fetch(`${serverUrl}/api/user/editpost/${idPost}`, {
            method: "PUT",
            body: JSON.stringify(editedPost),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json();
        console.log(data);
        setMessage(data.mensaje);
    }

    const ListarPost = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/user/listar`);

            const data = await response.json();

            console.log(data.post);
            setMessage(data.mensaje);
        } catch (error) {
            setMessage(error.message);
        }

    }

    const deletePost = async (e) => {
        e.preventDefault();
        const idPost = e.target.id.value;
        console.log(idPost);
        try {
            const response = await fetch(`${serverUrl}/api/user/deletepost/${idPost}`, {
                method: "DELETE"
            });

            const data = await response.json();

            console.log(data);
            setMessage(data.mensaje);
        } catch (error) {
            setMessage(error.message);
        }
    }

    const uploadImg = async (e) => {

        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "prueba")
        data.append("api_key", "729993788368966")

        const res = await fetch("https://api.cloudinary.com/v1_1/dly3mgbyb/image/upload", {
            method: "POST",
            body: data,
        })
        const url = await res
        console.log(url);
    }

    return (
        <div className="container">
            <div>
                <h3>Crear post</h3>
                <form onSubmit={createpost}>
                    <label>
                        <p>Titulo</p>
                        <input type="title" name='title' />
                    </label>
                    <label>
                        <p>Content</p>
                        <input type="content" name='content' />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <hr />
            <div>
                <h3>Editar post</h3>
                <form onSubmit={editepost}>
                    <label>
                        <p>id</p>
                        <input onChange={getPost} type="id" name='id' />
                    </label>
                    <label>
                        <p>Titulo</p>
                        <input type="title" name='title' placeholder={postToEdit.title} />
                    </label>
                    <label>
                        <p>Content</p>
                        <input type="content" name='content' placeholder={postToEdit.content} />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <hr />
            <div>
                <h3>Upload img with cloudinary</h3>
                <input type="file" onChange={uploadImg} name="file" placeholder='sube una imagen' />
            </div>
            <hr />
            <div
                className="btn-group mt-5"
                role="group"
                aria-label="External API Requests Examples"
            >
                <button type="button" className="btn btn-primary" onClick={callApi}>
                    Get Public Message
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={callSecureApi}
                >
                    Get Protected Message
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={ListarPost}
                >
                    Listar Posts
                </button>
                <hr />
                <form onSubmit={deletePost}>
                    <label>
                        <h3>Id del post que quieras borrar</h3>
                        <input type="id" name='id' />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            {message && (
                <div className="mt-5">
                    <h6 className="muted">Result</h6>
                    <code className="col-12 text-light bg-dark p-4">{message}</code>
                </div>
            )}
        </div>
    );
};

export default ExternalApi;