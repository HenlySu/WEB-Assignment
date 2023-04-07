import { useAtom } from 'jotai'
import { searchHistoryAtom } from '../store.js'
import { useRouter } from 'next/router';
import { Card, ListGroup,Button } from 'react-bootstrap'
import styles from '@/styles/History.module.css'

import { removeFromHistory } from '@/lib/userData.js';

export default function History() {
   const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
   const router = useRouter();
   let history = [];

   searchHistory.forEach(h => {
      let params = new URLSearchParams(h);
      let entries = params.entries();
      history.push(Object.fromEntries(entries));
   });

   function historyClicked(e, index) {
      router.push(`//artwork?${searchHistory[index]}`);
   }

   async function removeHistoryClicked(e, index) {
      e.stopPropagation();
      setSearchHistory(await removeFromHistory(searchHistory[index]));
   }
   
   return (
      <>
         {history.length == 0 &&
            <Card>
               <Card.Body>
                  <Card.Title><strong>Nothing Found</strong></Card.Title>
                  <Card.Text>
                     Try searching for some artwork
                  </Card.Text>
               </Card.Body>
            </Card>
         }
         {history.length > 0 &&
            <ListGroup>
               {history.map((historyItem, index) => {
                  return (
                     <>
                        <ListGroup.Item className={styles.historyListItem} key={index} onClick={e => historyClicked(e, index)}> {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                           <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                        </ListGroup.Item>
                     </>
                  )})}
            </ListGroup>
         }
      </>
   )
}