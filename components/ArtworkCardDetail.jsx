import {Card} from 'react-bootstrap';
import Error from "next/error";
import useSWR from 'swr';

export default function ArtworkCardDetail(props){
   const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);

   if(error){
      return(
         <Error statusCode={404} />
      )
   }
   else if(data){
      return (
         <Card>
            {data.primaryImage ? <Card.Img variant="top"  src={data.primaryImage} />:''}
            <Card.Body>
               <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
               <Card.Text> <strong>Date: </strong>{data.objectDate ? data.objectDate:"N/A"} <br/>
               <strong>Classification: </strong>{data.classification? data.classification:"N/A"}<br/>
               <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}<br/> <br/>
               <strong>Artist: </strong>{data.artistDisplayName ? data.artistDisplayName +" ( ":"N/A"}
               {data.artistDisplayName?  <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>: ""}
               {data.artistDisplayName?" )":""}
               <br/>
               <strong>Credit Line: </strong>{data.creditLine? data.creditLine:"N/A"}<br/>
               <strong>dimensions: </strong>{data.dimensions ? data.dimensions : "N/A"}<br/> <br/>
               </Card.Text>
            </Card.Body>
         </Card>
      );
   }
   else{
      return null;
   }
}