import { Button, Container, Nav, Navbar, NavDropdown, NavLink, Form } from "react-bootstrap";
import Link from 'next/link';
import { useAtom } from 'jotai'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { searchHistoryAtom } from '@/store'

export default function MainNav() {

   const [searchField, setSearchField] = useState("");
   const [isExpanded, setIsExpanded] = useState(false);
   const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
   const router = useRouter()

   function formSubmit(e){
      e.preventDefault();
      setIsExpanded(false)

     if (searchField != "") {
         setSearchHistory(current => [...current, searchField]);
      router.push(`/artwork?title=true&q=${searchField}`);
      setSearchField("");
    }
  }

   function toggleExpand() {
      setIsExpanded(!isExpanded)
   }

   function closeExpand() {
       setIsExpanded(false)
   }

   return (
      <>
         <Navbar className="fixed-top navbar navbar-expand-lg navbar-dark bg-primary" expand='lg' expanded={isExpanded}>
            <Container>
               <Navbar.Brand>Henly Su</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleExpand} />
               <Navbar.Collapse id="basic-navbar-nav">

                  <Nav className="me-auto">
                     <NavLink legacybehavior="true" passhref="true" href="/" onClick={closeExpand}>Home</NavLink>
                     <NavLink legacybehavior="true" passhref="true" href="/search" active={router.pathname === "/search"} onClick={closeExpand}>Advanced Search</NavLink>
                  </Nav>

                  <Form className="d-flex" onSubmit={formSubmit}>
                     <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" value={searchField} onChange={(e) => setSearchField(e.target.value)} />
                     <Button type="submit" variant="success">
                        Search
                     </Button>
                  </Form>

                  <Nav>
                     <NavDropdown title="User Name" id="basic-nav-dropdown">
                        <Link href="/favourites" onClick={closeExpand} legacyBehavior  passHref><NavDropdown.Item >Favourites</NavDropdown.Item></Link>
                        <Link href="/history" onClick={closeExpand} legacyBehavior passHref active={router.pathname === "/history"} ><NavDropdown.Item >Search History</NavDropdown.Item></Link>
                     </NavDropdown>
                  </Nav>

               </Navbar.Collapse>
            </Container>
         </Navbar>
         <br />
         <br /> 
      </>
   );
}