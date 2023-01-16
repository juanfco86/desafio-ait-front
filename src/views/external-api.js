import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ExternalApi = () => {
    const [message, setMessage] = useState('');
    const [postToEdit, setpostToEdit] = useState("");
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const [loading, setloading] = useState(false);
    const [img, setimg] = useState("");
    const [userLoged, setuserLoged] = useState("");
    const { getAccessTokenSilently, user } = useAuth0();
    

    useEffect(() => {
        if (user) {
            console.log(user);
            checkUser();
        }
    }, [user]);

    const checkUser = async () => {
        // PETICION AL BACKEND
        const token = await getAccessTokenSilently();
        const response = await fetch(`${serverUrl}/api/user/checkuser/${user.email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const responseData = await response.json()
        console.log(responseData.user);
        // CONDICIONAL - EL BACK NOS DEVUELVE TRUE O FALSE
        if (!!responseData.user) {
            console.log('El usuario existe en la bbdd');
            console.log(responseData.user[0]);
            setuserLoged(responseData.user[0])
        } else {
            // SI NO EXISTE, CREAR USER CON POST
            console.log('El usuario no existe en la bbdd');
            // TENEMOS QUE CREAR ESTE USUARIO
            const $user = {
                email: user.email,
                userData: {
                    username: user.nickname,
                    first_name: user.given_name,
                    last_name: user.family_name,
                    profilePicture: user.picture 
                }
            }

            const request = await fetch(`${serverUrl}/api/user/createuser`, {
                method: "POST",
                body: JSON.stringify($user),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await request.json()
            console.log(data.post);
            setuserLoged(data.post)
            // setMessage(data.mensaje);
        }

        
    }

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
            const response = await fetch(`${serverUrl}/api/user/pruebaprivada`, {
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
            email: e.target.email.value,
            username: e.target.username.value
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
        setloading(true);
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "prueba")
        data.append("api_key", "729993788368966")

        const res = await fetch("https://api.cloudinary.com/v1_1/dly3mgbyb/image/upload", {
            method: "POST",
            body: data,
        })
        const file = await res.json()
        console.log(file);
        setloading(false)
        setimg(file.secure_url)
    }

    return (
        <div className="container">
            {userLoged ? userLoged.email : ""}
            {userLoged ? <img src={userLoged.userData.profilePicture} /> : ""}
            <div>
                <h3>Crear post</h3>
                <form onSubmit={createpost}>
                    <label>
                        <p>email</p>
                        <input type="title" name='email' />
                    </label>
                    <label>
                        <p>username</p>
                        <input type="content" name='username' />
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
                <div>
                    <input type="file" onChange={uploadImg} name="file" placeholder='sube una imagen' />
                    {loading ? <p>Cargando imagenes...</p> : <img src={img} style={{ width: "300px" }} />}
                </div>

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