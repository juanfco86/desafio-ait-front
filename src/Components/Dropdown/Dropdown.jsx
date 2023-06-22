import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'

function DropdownMenu() {
    // const history = useHistory()
    const navigate = useNavigate()
    const section = (event, path) => {
        event.preventDefault()
        navigate(path)
    }

    return (
        <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Categories
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => section(e, "/search/dogs")}>Dogs</Dropdown.Item>
            <Dropdown.Item onClick={(e) => section(e, "/search/cats")}>Cats</Dropdown.Item>
            <Dropdown.Item onClick={(e) => section(e, "/search/computers")}>Computers</Dropdown.Item>
            <Dropdown.Item onClick={(e) => section(e, "/search/starwars")}>Star Wars</Dropdown.Item>
            <Dropdown.Item onClick={(e) => section(e, "/search/sports")}>Sports</Dropdown.Item>
            <Dropdown.Item onClick={(e) => section(e, "/search/smoke")}>Smoke</Dropdown.Item>
            <Dropdown.Item onClick={(e) => section(e, "/search/run")}>Carrera</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownMenu;
    