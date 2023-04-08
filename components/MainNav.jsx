import { addToHistory } from '@/lib/userData';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Link from "next/link"
import { readToken, removeToken } from '@/lib/authenticate';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router'
import { useAtom } from 'jotai';
import { useState } from 'react'

export default function MainNav() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const [isExpanded, setisExpanded] = useState(false);
    let token = readToken();
    const router = useRouter();

    function logout() {
        setisExpanded(expand => expand = false);
        removeToken();
        router.push('/login');
    }

    async function submitForm(e) {
        e.preventDefault();
        
        setisExpanded(expand => expand = false);
        setSearchHistory(await addToHistory(`title=true&q=${e.target.search.value}`));

        router.push(`/artwork?title=true&q=${e.target.search.value}`)
    }

    function toggleNav(e) {
        setisExpanded(expand => expand = !expand);
    }

    function handleNavClick() {
        setisExpanded(false);
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Henly Su</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNav} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior >
                                <Nav.Link href="/" onClick={handleNavClick}>Home</Nav.Link>
                            </Link>
                            {token ? (
                                <Link href="/search" passHref legacyBehavior >
                                    <Nav.Link href="/search" onClick={handleNavClick}>Advanced Search</Nav.Link>
                                </Link>
                            ) : ''}
                        </Nav>
                        &nbsp;
                        {token ? (
                            <Form className="d-flex" onSubmit={submitForm}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    name="search"
                                />
                                <Button variant="outline-light" type="submit">Search</Button>
                            </Form>
                        ) : ''}&nbsp;
                        {token ? (
                            <Nav>
                                <NavDropdown active={router.pathname === "/history"} title={token.userName} id="basic-nav-dropdown">
                                    <Link href="/favourites" passHref legacyBehavior >
                                        <NavDropdown.Item href="/favourites" onClick={handleNavClick}>Favourites</NavDropdown.Item>
                                    </Link>
                                    <Link href="/history" passHref legacyBehavior >
                                        <NavDropdown.Item href="/history" onClick={handleNavClick}>Search History</NavDropdown.Item>
                                    </Link>
                                    <Link href="/" passHref legacyBehavior >
                                        <NavDropdown.Item href="/" onClick={logout}>Logout</NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            </Nav>
                        )
                        :
                            (<Nav>
                                <Link href="/register" passHref legacyBehavior >
                                    <Nav.Link href="/register" onClick={handleNavClick}>Register</Nav.Link>
                                </Link>
                                <Link href="/login" passHref legacyBehavior >
                                    <Nav.Link href="/login" onClick={handleNavClick}>Log in</Nav.Link>
                                </Link>
                            </Nav>)}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}