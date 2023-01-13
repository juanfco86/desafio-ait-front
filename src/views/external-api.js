import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ExternalApi = () => {
    const [message, setMessage] = useState('');
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

        // Recoger datos del form
        const newPost = {
            title: e.target.title.value,
            content: e.target.content.value
        }

        // Peticion al servidor
        const request = await fetch(`${serverUrl}/api/user/create`, {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await request.json()
        console.log(data);
        setMessage(data.mensaje);
    }

    const ListarPost = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/user/listar`);

            const responseData = await response.json();

            console.log(responseData.post);
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

            const responseData = await response.json();

            console.log(responseData);
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div className="container">
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
            <h1>External API</h1>
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
                <form onSubmit={deletePost}>
                    <label>
                        <p>ID</p>
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