import { useRouter } from "next/router";
import { Container, Nav, Navbar, NavLink, Form } from "react-bootstrap";

export default function MainNav() {
   const router = useRouter()

   function formSubmit(e) {
      e.preventDefault()
      router.push("/artwork?title=true&q=" + document.querySelector("#searchField").value)
   }

   return (
      <>
         <Navbar className="fixed-top navbar navbar-expand-lg navbar-dark bg-primary">
         <Container>
            <Navbar.Brand>Henly Su</Navbar.Brand>

            <Nav className="me-auto">
               <NavLink legacybehavior="true" passhref="true" href="/">Home</NavLink>
               <NavLink legacybehavior="true" passhref="true" href="/search">Advanced Search</NavLink>
            </Nav>

            <Form className="d-flex" onSubmit={formSubmit}>
               <input className="form-control me-sm-2" id="searchField" type="text" name="searchField" />
               <input className="btn btn-secondary my-2 my-sm-0" type="submit" value="Submit" variant="primary" />
            </Form>
         </Container>
         </Navbar>
         <br />
         <br /> 
      </>
   );
}