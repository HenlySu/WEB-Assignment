import { Card, Col, Row } from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard';
import { useAtom } from 'jotai'
import { favouritesAtom } from '../store.js'

export default function Favourites() {
   const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)

   if (favouritesList) {
      return (
         <>
            <Row className="gy-4">
               {favouritesList.length > 0 ?
                  <>
                     {favouritesList?.map(objID => (
                        <Col lg={3} key={objID}><ArtworkCard objectID={objID} /></Col>
                     ))}
                  </>
                  :
                  <Card>
                     <Card.Body>
                        <Card.Text>
                           <Card.Title>
                              <strong>Nothing Found</strong>
                           </Card.Title>
                           <p>Try adding some new artwork to the list.</p>
                        </Card.Text>
                     </Card.Body>
                  </Card>
               }
            </Row>
         </>
        )
    } else {
        return null;
    }
}