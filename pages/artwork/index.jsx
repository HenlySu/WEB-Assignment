import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Card, Col, Pagination, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ArtworkCard from '@/components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json'

export default function Artwork() {

   const [artworkList, setArtworkList] = useState();
   const router = useRouter();
   const [page, setPage] = useState(1);

   let query = router.asPath.split('?')[1];
   const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${query}`);

   function nextPage() {
      if (page < artworkList.length) {
         setPage(p => p + 1)
      }
   }

   function previousPage() {
      if (page > 1) {
         setPage(p => p - 1);
      }
   }

   useEffect(() => {
      if (data) {
         const PER_PAGE = 12;
         const results = [];
         let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

         for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
               const chunk = filteredResults.slice(i, i + PER_PAGE);
               results.push(chunk);
         }
         setArtworkList(results);
         setPage(1);
      }
   }, [data])

   if (artworkList) {
      return (
         <>
            <Row className="gy-4">
               {artworkList.length > 0 ?
                  <>
                     {artworkList[page - 1]?.map(objID => (
                        <Col lg={3} key={objID}>
                           <ArtworkCard objectID={objID} />
                        </Col>
                     ))}
                  </>
                  :
                  <>
                     <Card>
                        <Card.Body>
                           <Card.Text>
                              <h4>Nothing Found</h4>
                              <p>Sorry, but nothing matched your search terms. Please try again with some different keywords!</p>
                           </Card.Text>
                        </Card.Body>
                     </Card>
                  </>
               }
            </Row>
            
            {artworkList.length > 0 && <Row>
               <Col >
               <br />
               <Pagination>
                  <Pagination.Prev onClick={previousPage} />
                  <Pagination.Item>{page}</Pagination.Item>
                  <Pagination.Next onClick={nextPage} />
               </Pagination>
               </Col>
            </Row>
            }
         </>
      )
   } else {
      return null;
   }
}
