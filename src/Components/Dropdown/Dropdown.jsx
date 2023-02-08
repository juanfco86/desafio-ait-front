import Dropdown from 'react-bootstrap/Dropdown';

function dropdown() {
    return (
        <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Categories
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="/search/dogs">Dogs</Dropdown.Item>
            <Dropdown.Item href="/search/cats">Cats</Dropdown.Item>
            <Dropdown.Item href="/search/computers">Computers</Dropdown.Item>
            <Dropdown.Item href="/search/starwars">Star Wars</Dropdown.Item>
            <Dropdown.Item href="/search/sports">Sports</Dropdown.Item>
            <Dropdown.Item href="/search/smoke">Smoke</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
    );
}

export default dropdown;
    